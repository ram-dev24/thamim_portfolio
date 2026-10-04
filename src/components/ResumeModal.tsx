import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Printer, X, Download, Mail, Phone, CheckCircle2, Shield } from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { data, isPrintView, setIsPrintView } = usePortfolio();

  if (!isPrintView) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/80 backdrop-blur-xs flex justify-center p-2 sm:p-6 print:p-0 print:bg-white">
      
      {/* Container */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col print:shadow-none print:rounded-none">
        
        {/* Modal Top Bar (Hidden when printing) */}
        <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FC39]"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
              Executive Curriculum Vitae · Print Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#D4FC39] text-neutral-950 text-xs font-extrabold flex items-center gap-2 hover:bg-[#bded1b] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setIsPrintView(false)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="p-8 sm:p-12 text-neutral-900 font-sans space-y-8 print:p-6 print:space-y-6">
          
          {/* Resume Header */}
          <div className="border-b-2 border-neutral-950 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
                  {data.profile.name}
                </h1>
                <div className="text-base sm:text-lg font-bold text-neutral-800 uppercase tracking-wider mt-1">
                  {data.profile.role} · {data.profile.company}
                </div>
                <div className="text-xs font-semibold text-neutral-600 uppercase tracking-widest mt-0.5">
                  14+ Years of Revenue Cycle Management Leadership
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-xs space-y-1 text-neutral-700 sm:text-right font-medium">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-900" />
                  <span>{data.profile.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-900" />
                  <span>{data.profile.email}</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  Languages: {data.profile.languages.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-justify">
              {data.profile.bio}
            </p>
          </div>

          {/* Key Strategic Achievements Grid */}
          <div>
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-3">
              Strategic RCM Achievements &amp; Measurable Impact
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="text-xl font-black text-neutral-950">
                  {data.metrics.yearsExperience}
                </div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase">
                  Years RCM Experience
                </div>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="text-xl font-black text-emerald-700">
                  -{data.metrics.denialReduction}
                </div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase">
                  Denial Rate Cut
                </div>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="text-xl font-black text-blue-700">
                  -{data.metrics.manualWorkloadReduction}
                </div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase">
                  Workload Cut via RPA
                </div>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="text-xl font-black text-neutral-950">
                  {data.metrics.teamSizeManaged}
                </div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase">
                  Specialists Managed
                </div>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-4">
              Professional Experience
            </h2>

            <div className="space-y-5">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-neutral-950">
                        {exp.role}
                      </span>
                      <span className="text-xs font-bold text-neutral-600">
                        · {exp.company}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 italic">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1 text-xs text-neutral-700 pl-4 list-disc">
                    {exp.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Projects Highlight */}
          <div>
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-3">
              Key Strategic Initiatives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-950">
                    <span>{proj.title}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{proj.duration}</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-800 font-bold">
                    {proj.metrics}
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-tight">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise & Skills */}
          <div>
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
              Core Expertise &amp; Technical Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5 text-xs text-neutral-800">
              {data.hardSkills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Declaration */}
          <div className="pt-4 border-t border-neutral-200 text-[10px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              I hereby declare that the information provided above is true and authentic to the best of my knowledge.
            </div>
            <div className="font-bold text-neutral-800">
              Thamim Ansar K · Director of Medonize
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
