import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { 
    data, 
    isEditMode, 
    setEditorModalOpen, 
    setActiveEditorTab, 
    deleteExperience
  } = usePortfolio();

  const [expandedExpId, setExpandedExpId] = useState<string | null>('exp-medonize');

  return (
    <section id="experiences" className="py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden border-b border-neutral-200">
      
      {/* Decorative Technical Star & Dotted Grid */}
      <div className="absolute top-10 right-10 text-neutral-300 pointer-events-none select-none">
        <svg className="w-14 h-14 opacity-30 text-[#D4FC39]" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,0 60,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 40,35" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4FC39] text-neutral-950 text-xs font-black uppercase tracking-widest mb-3">
              EXPERIENCES &amp; JOURNEY
            </div>
            <h2 
              className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight max-w-2xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              A Journey Through 14+ Years of Healthcare Operations &amp; RCM Leadership.
            </h2>
          </div>

          {isEditMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveEditorTab('experiences');
                  setEditorModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 text-[#D4FC39] text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Manage Career</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Left side has Stylized Vertical "JOURNEY" + Career cards, Right side has Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Vertical Watermark Banner (matching image.png) */}
          <div className="hidden xl:flex lg:col-span-1 flex-col items-center justify-start select-none pt-4 sticky top-28">
            <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-400 mb-6">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div 
              className="text-5xl font-black tracking-widest text-stroke-outline-dark uppercase transform -rotate-90 origin-center whitespace-nowrap translate-y-36"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              JOURNEY
            </div>
          </div>

          {/* Center Column: Career Positions (Left column in the design) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-neutral-800" />
                <span>Executive &amp; Operational Roles ({data.experiences.length})</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">14+ Years Total</span>
            </div>

            <div className="space-y-4">
              {data.experiences.map((exp, index) => {
                const isExpanded = expandedExpId === exp.id;
                
                // Color treatment mirroring the sample design: First card dark, second soft lime, others clean white
                let cardStyle = "bg-white text-neutral-900 border-neutral-200";
                let badgeStyle = "bg-neutral-100 text-neutral-800";
                
                if (index === 0) {
                  cardStyle = "bg-neutral-950 text-white border-neutral-900 shadow-lg";
                  badgeStyle = "bg-neutral-800 text-[#D4FC39]";
                } else if (index === 1) {
                  cardStyle = "bg-[#D4FC39]/20 text-neutral-950 border-[#D4FC39] shadow-sm";
                  badgeStyle = "bg-[#D4FC39] text-neutral-950";
                }

                return (
                  <div
                    key={exp.id}
                    className={`rounded-2xl border p-6 transition-all duration-300 relative group ${cardStyle}`}
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${badgeStyle}`}>
                          {exp.duration}
                        </span>
                        {exp.isCurrent && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Active
                          </span>
                        )}
                      </div>

                      <div className={`text-xs font-mono font-bold tracking-wider uppercase ${index === 0 ? 'text-[#D4FC39]' : 'text-neutral-500'}`}>
                        {exp.company}
                      </div>
                    </div>

                    {/* Role Title */}
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${index === 0 ? 'text-white' : 'text-neutral-950'}`}>
                        {exp.role}
                      </h3>
                      
                      {isEditMode && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setActiveEditorTab('experiences');
                              setEditorModalOpen(true);
                            }}
                            className="p-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 text-xs"
                            title="Edit this role"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${exp.role} at ${exp.company}?`)) {
                                deleteExperience(exp.id);
                              }
                            }}
                            className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs"
                            title="Delete role"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${index === 0 ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {exp.summary}
                    </p>

                    {/* Expand/Collapse Toggle for Bullet Points */}
                    <div className="mt-4 pt-3 border-t border-current/10">
                      <button
                        onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                        className={`text-xs font-bold underline flex items-center gap-1.5 ${
                          index === 0 ? 'text-[#D4FC39] hover:text-white' : 'text-neutral-900 hover:text-neutral-600'
                        }`}
                      >
                        <span>{isExpanded ? 'Hide Key Responsibilities & Achievements' : `View ${exp.highlights.length} Core Responsibilities & Impact`}</span>
                      </button>

                      {isExpanded && (
                        <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                          {exp.highlights.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 
                                className={`w-4 h-4 shrink-0 mt-0.5 ${index === 0 ? 'text-[#D4FC39]' : 'text-neutral-900'}`} 
                              />
                              <span className={index === 0 ? 'text-neutral-200' : 'text-neutral-700'}>
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Executive Governance, Linguistic Fluency & Verified Leadership */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-neutral-800" />
                <span>Executive Governance &amp; Competencies</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Executive Operational Standards Card */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                    Operations Standard
                  </span>
                  <span className="text-[#15803d] font-bold">14+ Years Leadership</span>
                </div>

                <h3 className="text-lg font-black text-neutral-950 tracking-tight">
                  Healthcare Revenue Governance
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Steering multidisciplinary revenue cycle operations, orchestrating enterprise claim resolution, and implementing strict quality audits across high-volume healthcare networks.
                </p>

                <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs text-neutral-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>30+ Full-Time Specialist Oversight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Industry Benchmark DSO Compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>HIPAA Security &amp; Protocol Audits</span>
                  </div>
                </div>
              </div>

              {/* Language & Communication Box from resume */}
              <div className="p-6 rounded-2xl bg-neutral-950 text-white border border-neutral-800">
                <div className="text-xs font-mono text-[#D4FC39] font-bold uppercase tracking-wider mb-2">
                  Linguistic Fluency
                </div>
                <div className="text-base font-extrabold text-white mb-2">
                  Professional Languages
                </div>
                <div className="flex items-center gap-3">
                  {data.profile.languages.map((lang, lIdx) => (
                    <div 
                      key={lIdx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-mono text-neutral-200 border border-neutral-700"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D4FC39]"></span>
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-400 mt-3 leading-relaxed">
                  Proficient in US healthcare payer negotiations, client conference governance, and regional team leadership.
                </p>
              </div>

              {/* Verified Declaration Box from resume */}
              <div className="p-5 rounded-2xl bg-neutral-100 border border-neutral-200/90 text-neutral-600 text-xs leading-relaxed">
                <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Executive Authenticity</span>
                </div>
                14+ years of documented track record in US healthcare revenue cycle operations, claim appeals, RPA workflows, and team scaling.
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
