export interface CandidateSubmission {
  id: string;
  name: string;
  email: string;
  fileName: string;
  fileSize: number;
  targetRole: string;
  timestamp: string;
  status: 'dispatched' | 'confirmed';
  n8nStatus?: number;
}

export interface TargetRoleInfo {
  id: string;
  title: string;
  category: string;
  summary: string;
  criticalKeywords: string[];
  commonPitfalls: string[];
  benchmarks: {
    label: string;
    target: string;
    importance: 'High' | 'Critical' | 'Medium';
  }[];
}

export interface N8nConnectionState {
  status: 'idle' | 'checking' | 'connected' | 'error';
  httpStatus?: number;
  timestamp?: string;
  latencyMs?: number;
  message?: string;
}
