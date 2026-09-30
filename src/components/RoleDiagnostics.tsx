import React, { useState } from 'react';
import { TARGET_ROLES } from '../data/rolesData.ts';
import { TargetRoleInfo } from '../types.ts';
import { CheckCircle2, AlertTriangle, Target, ArrowRight } from 'lucide-react';

interface RoleDiagnosticsProps {
  onSelectRoleForSubmission: (roleId: string) => void;
}

export const RoleDiagnostics: React.FC<RoleDiagnosticsProps> = ({ onSelectRoleForSubmission }) => {
  const [selectedRole, setSelectedRole] = useState<TargetRoleInfo>(TARGET_ROLES[0]);

  return (
    <section id="benchmarks" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Discipline Heuristics
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            ATS Evaluation Criteria by Specialization
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Review the exact technical keywords, common formatting pitfalls, and quantitative benchmarks checked by the automated n8n workflow for your discipline.
          </p>
        </div>

        {/* Interactive Segmented Selector Tabs (Permitted Interactive Controls) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-xl max-w-fit mb-8">
          {TARGET_ROLES.map((role) => {
            const isActive = selectedRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {role.title.split(' ')[0]} {role.title.split(' ')[1] || ''}
              </button>
            );
          })}
        </div>

        {/* Active Role Content Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                {selectedRole.category} Track
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-1">
                {selectedRole.title}
              </h3>
            </div>

            <button
              onClick={() => onSelectRoleForSubmission(selectedRole.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs cursor-pointer whitespace-nowrap self-start md:self-auto"
            >
              <span>Audit Resume for this Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-slate-600 text-sm py-4 leading-relaxed">
            {selectedRole.summary}
          </p>

          {/* 3 Detailed Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
            
            {/* Column 1: Critical Keywords */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Target className="w-4 h-4 text-indigo-600" />
                Critical Keywords Scanned
              </div>
              <ul className="space-y-2.5">
                {selectedRole.criticalKeywords.map((kw, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{kw}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Quantitative Benchmarks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Performance Benchmarks
              </div>
              <div className="space-y-3">
                {selectedRole.benchmarks.map((bm, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">{bm.label}</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{bm.importance}</span>
                    </div>
                    <p className="text-xs text-slate-600">{bm.target}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Red Flags & Pitfalls */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Frequent Red Flags Detected
              </div>
              <ul className="space-y-2.5">
                {selectedRole.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-rose-50/50 p-2.5 rounded-lg border border-rose-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
