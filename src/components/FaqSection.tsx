import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'How does the n8n Cloud workflow process and score my resume?',
      answer:
        'When your resume is received at https://pudirishitha2007.app.n8n.cloud/form/931df08d-e0e5-4019-845a-a7273cb21973, n8n triggers an automated sequence. The workflow parses document text, isolates key sections (Work Experience, Skills, Education), matches extracted terminology against ATS role dictionaries, and compiles a comprehensive evaluation sent directly to your email.',
    },
    {
      question: 'Which file formats and size constraints are supported?',
      answer:
        'The ingestion form accepts standard PDF (.pdf), Microsoft Word (.docx, .doc), and plain text (.txt) files up to 15MB. For best ATS parseability, clean standard PDFs with selectable text (not scanned images) or standard DOCX files are strongly recommended.',
    },
    {
      question: 'How quickly will I receive my diagnostic report?',
      answer:
        'Because the workflow executes on high-performance n8n cloud instances, analysis typically runs within 60 to 90 seconds. You will receive an automated email at the address provided during submission. Please make sure to check your inbox (and spam/promotions folder if unexpected).',
    },
    {
      question: 'Can I test or use the original n8n form directly?',
      answer:
        'Yes. You can click "Open Original n8n Form in New Tab" in the n8n Cloud Hub section at any time to submit directly via the standard n8n cloud hosted form interface. Both pathways hit the exact same underlying automation trigger.',
    },
    {
      question: 'Is my resume document kept confidential?',
      answer:
        'All transmissions are encrypted in transit using TLS 1.3. Uploaded documents are read into volatile memory solely to execute the diagnostic evaluation and are not retained or commercialized for secondary AI training.',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Everything you need to know about the n8n-powered resume evaluation process.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
