import React from 'react';
import { ArrowDown, CheckCircle2, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  return (
    <section id="top" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live n8n Cloud Workflow Active
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1] text-balance">
              AI Resume Diagnostics via Automated n8n Cloud Pipeline
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Elevate your profile before human recruiters see it. Submit your CV directly into our verified n8n automation engine to evaluate ATS keyword match, structural parseability, and quantifiable impact metrics delivered straight to your email.
            </p>

            {/* Zero-Pill Unboxed Trust Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ATS Machine Parse Check
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <Cpu className="w-4 h-4 text-indigo-600" />
                n8n Cloud Webhook Engine
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                Encrypted Transmission
              </span>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onScrollToSection('submit')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span>Upload & Analyze Resume</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => onScrollToSection('n8n-gateway')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Inspect n8n Endpoint</span>
              </button>
            </div>

            {/* Quantitative Proof Metrics */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-mono-nums">98.4%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">ATS Parse Accuracy</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-mono-nums">&lt; 60s</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Automated Runtime</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-mono-nums">45+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Heuristic Criteria</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group">
              <img
                src="/src/assets/images/hero_resume_analyzer_1790759977092.jpg"
                alt="Executive workspace with laptop running resume analysis metrics"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>n8n Execution Form Webhook</span>
                  <span className="font-mono text-emerald-400">STATUS: HTTP 200 OK</span>
                </div>
                <p className="text-sm font-medium text-slate-100">
                  Targeted scoring for engineering, product, and leadership positions.
                </p>
                <div className="text-xs text-slate-400 font-mono">
                  Payload Endpoint: pudirishitha2007.app.n8n.cloud
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
