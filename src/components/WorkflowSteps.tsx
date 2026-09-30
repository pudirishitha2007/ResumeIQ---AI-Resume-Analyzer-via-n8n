import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WorkflowStepsProps {
  onScrollToSection: (id: string) => void;
}

export const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ onScrollToSection }) => {
  const steps = [
    {
      num: '01',
      title: 'Document Intake & Format Normalization',
      lead: 'Standardized parsing across PDF, DOCX, and TXT structures.',
      details:
        'When you submit via the portal, the n8n form webhook ingests your document into volatile execution memory. Standard ATS document parsers convert multi-column layouts into machine-readable text streams without compromising confidential details.',
    },
    {
      num: '02',
      title: 'Automated n8n Processing Pipeline',
      lead: 'Rule-based heuristics and semantic keyword correlation.',
      details:
        'The n8n workflow executes sequential nodes: mapping role-specific technical skills, measuring quantifiable achievement density (XYZ formula), identifying ATS layout obstacles (unsupported tables, raster graphics), and scoring overall candidate fit.',
    },
    {
      num: '03',
      title: 'Diagnostic Report Delivery to Your Inbox',
      lead: 'Actionable feedback delivered within minutes.',
      details:
        'Rather than a superficial badge, the n8n automation generates an in-depth breakdown containing your estimated ATS score, missing keywords, and specific sentence rewrite suggestions sent directly to the email address provided.',
    },
  ];

  return (
    <section id="workflow" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Automated Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            How the n8n Analysis Engine Operates
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            A transparent overview of how your resume transitions from raw upload to automated diagnostic report inside the n8n cloud environment.
          </p>
        </div>

        {/* Content Grid: Steps + Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Numbered Editorial Steps */}
          <div className="lg:col-span-7 space-y-10">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-6 group">
                <span className="text-3xl sm:text-4xl font-bold text-slate-300 font-mono group-hover:text-indigo-600 transition-colors shrink-0">
                  {step.num}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-700">
                    {step.lead}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={() => onScrollToSection('submit')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Submit Your Document Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Case Illustration */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
              <img
                src="/src/assets/images/resume_review_consultant_1790759992351.jpg"
                alt="Talent advisor reviewing resume metrics"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover object-center"
              />
              <div className="p-6 space-y-3 bg-white">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Inspection Criteria</span>
                  <span className="font-mono text-indigo-600 font-medium">n8n Execution Node</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Industry-Grade Talent Evaluation Heuristics
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Screening algorithms scan for structural integrity before any human recruiter reads your profile. Our n8n workflow replicates tier-1 applicant tracking filters.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Keyword Frequency</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Layout Compliancy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Metric Density</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Role Alignment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
