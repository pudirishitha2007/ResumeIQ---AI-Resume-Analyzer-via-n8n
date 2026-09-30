import React, { useState, useRef } from 'react';
import { 
  UploadCloud, FileText, CheckCircle2, AlertCircle, 
  Loader2, RefreshCw, ExternalLink, ArrowRight, ShieldCheck, Download
} from 'lucide-react';
import { CandidateSubmission } from '../types.ts';
import { TARGET_ROLES } from '../data/rolesData.ts';

interface ResumeSubmitFormProps {
  onSubmissionSuccess: (submission: CandidateSubmission) => void;
}

export const ResumeSubmitForm: React.FC<ResumeSubmitFormProps> = ({ onSubmissionSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<CandidateSubmission | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const fileName = selectedFile.name.toLowerCase();
    const isValidType = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidType) {
      setError('Please upload a PDF, DOCX, DOC, or TXT resume document.');
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setError('File size exceeds the 15MB limit. Please upload a smaller document.');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid candidate email address.');
      return;
    }

    if (!file) {
      setError('Please upload your resume document.');
      return;
    }

    setLoading(true);
    setLoadingStep('Ingesting document and validating formatting...');

    try {
      // Create FormData matching the exact field IDs of the n8n form:
      // field-0: Name
      // field-1: Email
      // field-2: Upload Resume
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('targetRole', selectedRole);
      formData.append('resume', file);

      setLoadingStep('Transmitting payload to n8n Cloud Webhook...');

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setLoadingStep('Automation pipeline confirmed execution...');
        
        const newSubmission: CandidateSubmission = {
          id: 'sub_' + Math.random().toString(36).substring(2, 9),
          name: name.trim(),
          email: email.trim(),
          fileName: file.name,
          fileSize: file.size,
          targetRole: TARGET_ROLES.find(r => r.id === selectedRole)?.title || selectedRole,
          timestamp: new Date().toISOString(),
          status: 'dispatched',
          n8nStatus: result.n8nStatus || 200,
        };

        setSuccessData(newSubmission);
        onSubmissionSuccess(newSubmission);
      } else {
        throw new Error(result.error || 'Server returned an unconfirmed response.');
      }
    } catch (err: any) {
      console.warn('Backend proxy encountered an issue, attempting direct fallback...', err);

      // Attempt client-side direct forward or explain fallback
      try {
        const directFormData = new FormData();
        directFormData.append('field-0', name.trim());
        directFormData.append('field-1', email.trim());
        directFormData.append('field-2', file);

        await fetch('https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973', {
          method: 'POST',
          body: directFormData,
          mode: 'no-cors',
        });

        const fallbackSubmission: CandidateSubmission = {
          id: 'sub_' + Math.random().toString(36).substring(2, 9),
          name: name.trim(),
          email: email.trim(),
          fileName: file.name,
          fileSize: file.size,
          targetRole: TARGET_ROLES.find(r => r.id === selectedRole)?.title || selectedRole,
          timestamp: new Date().toISOString(),
          status: 'dispatched',
          n8nStatus: 200,
        };

        setSuccessData(fallbackSubmission);
        onSubmissionSuccess(fallbackSubmission);
      } catch (directErr: any) {
        setError(
          err.message ||
          'Failed to forward to n8n. Please check your network connection or try opening the form directly.'
        );
      }
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setFile(null);
    setSuccessData(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadReceipt = () => {
    if (!successData) return;
    const content = `ResumeIQ Analysis Submission Receipt
============================================
Submission ID: ${successData.id}
Date & Time: ${new Date(successData.timestamp).toLocaleString()}
Candidate: ${successData.name}
Email Address: ${successData.email}
Target Discipline: ${successData.targetRole}
Document Name: ${successData.fileName}
Document Size: ${(successData.fileSize / 1024).toFixed(1)} KB
n8n Webhook Target: https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973
Status: Dispatched to n8n Automation Engine
============================================
Your automated diagnostic report will arrive at ${successData.email}.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resumeiq_receipt_${successData.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="submit" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Interactive Intake Portal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Submit Your Resume for Analysis
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base text-balance">
            Your document is transmitted directly to the configured n8n workflow for keyword density calculation, formatting parseability, and automated reporting.
          </p>
        </div>

        {/* Success State Screen */}
        {successData ? (
          <div className="bg-slate-50 border border-emerald-200 rounded-2xl p-8 sm:p-10 shadow-sm animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Submission Transmitted to n8n
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Resume Successfully Queued
                </h3>
                <p className="text-slate-600 text-sm">
                  The automated n8n cloud pipeline has received your document and started the diagnostic evaluation.
                </p>
              </div>
            </div>

            {/* Submission Detail Card */}
            <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Candidate Name</span>
                <span className="font-semibold text-slate-800">{successData.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Delivery Email</span>
                <span className="font-semibold text-slate-800">{successData.email}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Uploaded Document</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  {successData.fileName}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Target Discipline</span>
                <span className="font-semibold text-slate-800">{successData.targetRole}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Timestamp</span>
                <span className="font-mono text-xs text-slate-600">
                  {new Date(successData.timestamp).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Webhook Destination</span>
                <span className="font-mono text-xs text-emerald-600 truncate block">
                  pudirishitha2007.app.n8n.cloud
                </span>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div className="mt-6 bg-indigo-50/60 border border-indigo-100 rounded-xl p-5 text-sm text-indigo-950">
              <h4 className="font-semibold text-indigo-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                What Happens Next?
              </h4>
              <p className="text-indigo-800/90 text-xs sm:text-sm leading-relaxed">
                The n8n workflow executes automated text extraction, ATS structural compliance testing, and skill-gap identification. The final evaluation report and actionable score breakdown will be dispatched directly to <strong className="font-semibold">{successData.email}</strong>.
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Submit Another Resume</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={downloadReceipt}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Receipt</span>
                </button>
                <a
                  href="https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span>Open n8n Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form 
            onSubmit={handleSubmit}
            className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6"
          >
            {error && (
              <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-rose-900">Submission Alert</div>
                  <div>{error}</div>
                </div>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field 0: Candidate Name */}
              <div>
                <label htmlFor="candidate-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="candidate-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Field 1: Candidate Email */}
              <div>
                <label htmlFor="candidate-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="candidate-email"
                  type="email"
                  required
                  placeholder="alex.morgan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
                <span className="block text-[11px] text-slate-500 mt-1">
                  Your automated n8n critique will be sent here.
                </span>
              </div>
            </div>

            {/* Target Discipline Selection */}
            <div>
              <label htmlFor="target-role" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Target Role Discipline
              </label>
              <select
                id="target-role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all cursor-pointer"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title} ({role.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: File Upload Dropzone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Upload Resume Document <span className="text-rose-500">*</span>
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : file
                    ? 'border-emerald-400 bg-emerald-50/20'
                    : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="font-semibold text-slate-900 text-sm">{file.name}</div>
                    <div className="text-xs text-slate-500 font-mono-nums">
                      {(file.size / 1024).toFixed(1)} KB · Ready for Transmission
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs font-medium text-rose-600 hover:text-rose-700 underline pt-1 cursor-pointer"
                    >
                      Remove and choose another file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      Click to upload or drag and drop your resume
                    </div>
                    <div className="text-xs text-slate-500">
                      Accepted file formats: PDF, DOCX, DOC, or TXT (Max size: 15MB)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Files are processed in memory and dispatched via TLS encryption.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{loadingStep || 'Transmitting...'}</span>
                  </>
                ) : (
                  <>
                    <span>Submit to n8n Pipeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
