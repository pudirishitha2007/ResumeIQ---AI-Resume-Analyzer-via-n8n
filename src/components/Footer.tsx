import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              ResumeIQ
            </span>
            <p className="text-slate-500 max-w-sm text-xs leading-relaxed">
              Automated applicant tracking system diagnostics and resume optimization powered by n8n cloud automation workflows.
            </p>
            <div className="text-slate-400 text-[11px] pt-1">
              Connected Webhook: <code className="font-mono text-slate-600">pudirishitha2007.app.n8n.cloud</code>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('submit')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Analyze Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('workflow')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Pipeline Walkthrough
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('benchmarks')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Role Benchmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('n8n-gateway')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  n8n Cloud Webhook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Workflow Resources
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Raw n8n Form Endpoint</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://n8n.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>n8n Workflow Automation Platform</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            &copy; {currentYear} ResumeIQ. Built for n8n Cloud Automation Integration.
          </div>
          <div className="flex items-center gap-4">
            <span>Confidential Ingestion</span>
            <span>·</span>
            <span>TLS Encrypted Transit</span>
            <span>·</span>
            <span>Zero Persistent Retention</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
