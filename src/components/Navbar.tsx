import React from 'react';

interface NavbarProps {
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onScrollToSection('top'); }}
          className="text-xl font-bold tracking-tight text-slate-900 font-display"
        >
          ResumeIQ
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onScrollToSection('submit')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Analyze Resume
          </button>
          <button
            onClick={() => onScrollToSection('workflow')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Pipeline
          </button>
          <button
            onClick={() => onScrollToSection('benchmarks')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            ATS Benchmarks
          </button>
          <button
            onClick={() => onScrollToSection('n8n-gateway')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            n8n Cloud Hub
          </button>
          <button
            onClick={() => onScrollToSection('faq')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onScrollToSection('submit')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            Submit Resume
          </button>
        </div>
      </div>
    </header>
  );
};
