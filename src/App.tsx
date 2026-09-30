/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ResumeSubmitForm } from './components/ResumeSubmitForm.tsx';
import { WorkflowSteps } from './components/WorkflowSteps.tsx';
import { RoleDiagnostics } from './components/RoleDiagnostics.tsx';
import { N8nGateway } from './components/N8nGateway.tsx';
import { SubmissionHistory } from './components/SubmissionHistory.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CandidateSubmission } from './types.ts';

export default function App() {
  const [submissions, setSubmissions] = useState<CandidateSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('resumeiq_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('resumeiq_submissions', JSON.stringify(submissions));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [submissions]);

  const handleScrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmissionSuccess = (newSubmission: CandidateSubmission) => {
    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const handleClearHistory = () => {
    setSubmissions([]);
    try {
      localStorage.removeItem('resumeiq_submissions');
    } catch {
      // ignore
    }
  };

  const handleSelectRoleForSubmission = (roleId: string) => {
    // Scroll to submit form and update select value if present
    handleScrollToSection('submit');
    const selectElem = document.getElementById('target-role') as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = roleId;
      selectElem.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Bar following contract */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onScrollToSection={handleScrollToSection} />
        <ResumeSubmitForm onSubmissionSuccess={handleSubmissionSuccess} />
        <WorkflowSteps onScrollToSection={handleScrollToSection} />
        <RoleDiagnostics onSelectRoleForSubmission={handleSelectRoleForSubmission} />
        <N8nGateway />
        <SubmissionHistory 
          submissions={submissions} 
          onClearHistory={handleClearHistory} 
        />
        <FaqSection />
      </main>

      {/* Quiet Professional Footer */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}
