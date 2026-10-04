import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowUpRight, 
  Cpu, 
  ShieldAlert, 
  FileCheck2, 
  Users2, 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trash2 
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, isEditMode, setEditorModalOpen, setActiveEditorTab, deleteProject } = usePortfolio();

  const getCategoryIcon = (category: string) => {
    if (category.includes('Automation')) return <Cpu className="w-5 h-5 text-neutral-900" />;
    if (category.includes('Denial') || category.includes('Revenue')) return <ShieldAlert className="w-5 h-5 text-neutral-900" />;
    if (category.includes('Quality')) return <FileCheck2 className="w-5 h-5 text-neutral-900" />;
    return <Users2 className="w-5 h-5 text-neutral-900" />;
  };

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#F5F8E9]/60 relative overflow-hidden border-b border-neutral-200">
      
      {/* Subtle grid pattern matching sample */}
      <div className="absolute inset-0 tech-grid-light opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-950 text-[#D4FC39] text-xs font-black uppercase tracking-widest mb-3">
              PROJECTS &amp; STRATEGIC INITIATIVES
            </div>
            <h2 
              className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight max-w-2xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              A Curated Collection of Strategic RCM Initiatives &amp; Measurable Case Studies.
            </h2>
          </div>

          {isEditMode && (
            <button
              onClick={() => {
                setActiveEditorTab('projects');
                setEditorModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 text-[#D4FC39] text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Manage Projects</span>
            </button>
          )}
        </div>

        {/* 4 Cards Grid - Styled like 01 X-Dash, 02 TrioX, 03 CashX in image.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.projects.map((proj) => (
            <div
              key={proj.id}
              className="group bg-white rounded-3xl p-6 border-2 border-neutral-200 hover:border-neutral-950 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Top: Card Number & Category icon */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D4FC39] flex items-center justify-center">
                    {getCategoryIcon(proj.category)}
                  </div>
                  <span className="text-2xl font-black text-neutral-950 font-mono tracking-tighter">
                    {proj.number}
                  </span>
                </div>

                {/* Duration / Tag pill */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {proj.duration}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#D4FC39]/40 text-neutral-900">
                    {proj.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-black text-neutral-950 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors mb-2">
                  {proj.title}
                </h3>

                {/* Metric Callout Highlight Banner */}
                <div className="p-2.5 rounded-xl bg-neutral-950 text-white text-xs font-mono font-bold mb-3 flex items-center justify-between">
                  <span className="text-[#D4FC39]">{proj.metrics}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#D4FC39] group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Key Bullet Points */}
                <ul className="space-y-1.5 text-xs text-neutral-700 border-t border-neutral-100 pt-3">
                  {proj.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag Pills Footer */}
              <div className="pt-4 mt-4 border-t border-neutral-100 flex flex-wrap gap-1">
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {isEditMode && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={() => {
                      setActiveEditorTab('projects');
                      setEditorModalOpen(true);
                    }}
                    className="p-1 rounded bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                    title="Edit project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete initiative "${proj.title}"?`)) {
                        deleteProject(proj.id);
                      }
                    }}
                    className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Executive Metrics Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h4 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight">
              Looking to deploy these proven RCM optimization blueprints in your practice?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Thamim Ansar K provides strategic audits, automated AR pipeline design, and high-performance team coaching.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-neutral-950 text-[#D4FC39] font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Request Operational Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

    </section>
  );
};
