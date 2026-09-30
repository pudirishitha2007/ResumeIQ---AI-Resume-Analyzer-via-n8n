import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Setup multer for in-memory file buffering
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

app.use(express.json());

// Proxy endpoint to securely forward resume submissions to the user's n8n workflow
app.post('/api/submit-resume', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, targetRole } = req.body;
    const file = req.file;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Candidate name is required' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Candidate email address is required' });
    }

    if (!file) {
      return res.status(400).json({ error: 'Resume document file is required' });
    }

    const n8nUrl = 'https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973';

    // Construct FormData matching n8n's expected parameters:
    // field-0: Name
    // field-1: Email
    // field-2: Upload Resume (File)
    const formData = new FormData();
    formData.append('field-0', name.trim());
    formData.append('field-1', email.trim());

    const fileBlob = new Blob([new Uint8Array(file.buffer)], {
      type: file.mimetype || 'application/octet-stream',
    });
    formData.append('field-2', fileBlob, file.originalname);

    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      body: formData,
    });

    const responseText = await responseTextOrEmpty(n8nResponse);
    let parsedData: any = null;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Text response
    }

    if (n8nResponse.ok) {
      return res.status(200).json({
        success: true,
        message: 'Resume successfully submitted to the n8n analysis pipeline.',
        n8nStatus: n8nResponse.status,
        data: parsedData || { status: 200 },
        submittedAt: new Date().toISOString(),
        candidate: {
          name: name.trim(),
          email: email.trim(),
          fileName: file.originalname,
          fileSize: file.size,
          targetRole: targetRole || 'General Professional',
        },
      });
    } else {
      return res.status(n8nResponse.status).json({
        success: false,
        error: `n8n workflow returned HTTP ${n8nResponse.status}`,
        details: responseText,
      });
    }
  } catch (error: any) {
    console.error('Error in /api/submit-resume:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to dispatch resume to n8n cloud',
    });
  }
});

// Helper to safely extract response text
async function responseTextOrEmpty(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '';
  }
}

// Health check / n8n status endpoint
app.get('/api/n8n-status', async (_req, res) => {
  const n8nUrl = 'https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973';
  try {
    const check = await fetch(n8nUrl, { method: 'GET' });
    return res.json({
      status: check.ok ? 'connected' : 'reachable_status_' + check.status,
      httpStatus: check.status,
      formUrl: n8nUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.json({
      status: 'offline_or_unreachable',
      error: err.message,
      formUrl: n8nUrl,
      timestamp: new Date().toISOString(),
    });
  }
});

// Server configuration & static/dev mounting
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ResumeIQ Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
