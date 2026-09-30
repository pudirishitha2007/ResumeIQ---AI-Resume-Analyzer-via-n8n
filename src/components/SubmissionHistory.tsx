import React from 'react';
import { CandidateSubmission } from '../types.ts';
import { History, Trash2, FileText, CheckCircle2 } from 'lucide-react';

interface SubmissionHistoryProps {
  submissions: CandidateSubmission[];
  onClearHistory: () => void;
}

export const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({
  submissions,
  onClearHistory,
}) => {
  if (submissions.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Recent Submissions Ledger
            </h3>
            <span className="text-xs text-slate-500 font-mono-nums">
              ({submissions.length} {submissions.length === 1 ? 'record' : 'records'})
            </span>
          </div>

          <button
            onClick={onClearHistory}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Ledger</span>
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Delivery Email</th>
                <th className="py-3 px-4">Target Track</th>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">n8n Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-750">
              {submissions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono">
                    {item.email}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {item.targetRole}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-slate-800">
                      <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate max-w-[180px]">{item.fileName}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono-nums text-slate-500">
                    {new Date(item.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Dispatched
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-400 mt-2 text-right">
          Records are stored client-side in browser storage.
        </p>

      </div>
    </section>
  );
};
