import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ChevronsRight, Edit3, ArrowUpRight, Check, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { data, isEditMode, setEditorModalOpen, setActiveEditorTab, updateService } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'Operations' | 'Strategy'>('all');

  const filteredServices = activeCategory === 'all'
    ? data.services
    : data.services.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0D0E11] text-white relative overflow-hidden border-y border-neutral-800">
      
      {/* Background Technical Grid matching image.png */}
      <div className="absolute inset-0 tech-grid-dark opacity-75 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row with Chevrons and Section Tag */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          
          <div className="flex items-start gap-4">
            {/* Neon Green Chevron Indicator matching image.png */}
            <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#D4FC39]">
              <ChevronsRight className="w-8 h-8 rotate-90 sm:rotate-0" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4FC39] text-neutral-950 text-xs font-black uppercase tracking-widest mb-3">
                SERVICES &amp; EXPERTISE
              </div>
              <h2 
                className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                I engineer clean, scalable revenue operations that fuse healthcare domain precision and intelligent automation.
              </h2>
            </div>
          </div>

          {/* Category Filter & Edit Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCategory === 'all' ? 'bg-[#D4FC39] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Capabilities
              </button>
              <button
                onClick={() => setActiveCategory('Operations')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCategory === 'Operations' ? 'bg-[#D4FC39] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Operations
              </button>
              <button
                onClick={() => setActiveCategory('Strategy')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCategory === 'Strategy' ? 'bg-[#D4FC39] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Strategy
              </button>
            </div>

            {isEditMode && (
              <button
                onClick={() => {
                  setActiveEditorTab('services');
                  setEditorModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 text-[#D4FC39] text-xs font-bold hover:bg-neutral-700"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Cards</span>
              </button>
            )}
          </div>

        </div>

        {/* 6 High-Contrast Service Cards Grid matching image.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#16171D] border border-neutral-800 hover:border-[#D4FC39]/60 hover:shadow-2xl hover:shadow-[#D4FC39]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Number & Metric Percentage */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-neutral-800 text-[#D4FC39]">
                      {service.number}
                    </span>
                    <span className="text-xs font-medium text-neutral-400">
                      {service.category}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono group-hover:text-[#D4FC39] transition-colors">
                    {service.percentage}%
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#D4FC39] transition-colors mb-2 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Card Footer: Progress bar and indicator */}
              <div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-[#D4FC39] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${service.percentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Success Metric</span>
                  <span className="text-neutral-300 font-semibold">{service.percentage}% Benchmark</span>
                </div>
              </div>

              {isEditMode && (
                <button
                  onClick={() => {
                    const newTitle = prompt('Edit Service Title:', service.title);
                    if (newTitle) {
                      updateService({ ...service, title: newTitle });
                    }
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded bg-neutral-800 text-[#D4FC39] hover:bg-neutral-700"
                  title="Quick Edit Title"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Operational Philosophy Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4FC39] text-neutral-950 flex items-center justify-center font-black text-xl shrink-0">
              14
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">
                Proven Track Record Across Top US Healthcare Accounts
              </div>
              <div className="text-xs text-neutral-400">
                Spearheading 30+ person departments, reducing denial turnaround by 25%, and automating AR workflows.
              </div>
            </div>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-neutral-950 text-xs font-bold hover:bg-[#D4FC39] transition-colors flex items-center gap-1.5"
          >
            <span>View Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

    </section>
  );
};
