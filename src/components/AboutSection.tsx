import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Activity, 
  ShieldAlert, 
  Cpu, 
  Users, 
  TrendingUp, 
  FileCheck, 
  Edit3, 
  Sparkles, 
  Layers, 
  Award,
  CheckCircle2
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, isEditMode, setEditorModalOpen, setActiveEditorTab } = usePortfolio();

  const getSkillIcon = (iconType: string) => {
    switch (iconType) {
      case 'activity':
        return <Activity className="w-5 h-5 text-neutral-900" />;
      case 'shield-alert':
        return <ShieldAlert className="w-5 h-5 text-neutral-900" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-neutral-900" />;
      case 'users':
        return <Users className="w-5 h-5 text-neutral-900" />;
      case 'trending-up':
        return <TrendingUp className="w-5 h-5 text-neutral-900" />;
      case 'file-check':
        return <FileCheck className="w-5 h-5 text-neutral-900" />;
      default:
        return <Sparkles className="w-5 h-5 text-neutral-900" />;
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden border-b border-neutral-200">
      
      {/* Decorative Technical Icons & Asterisks matching image.png */}
      <div className="absolute top-12 right-12 text-neutral-300 pointer-events-none select-none">
        <svg className="w-16 h-16 animate-spin-slow opacity-40" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L58 35 L93 20 L68 50 L93 80 L58 65 L50 100 L42 65 L7 80 L32 50 L7 20 L42 35 Z" />
        </svg>
      </div>
      <div className="absolute top-28 left-8 text-neutral-300 font-mono text-xl select-none pointer-events-none">
        &#123; &#125;
      </div>
      <div className="absolute bottom-16 left-12 text-neutral-300 font-mono text-2xl select-none pointer-events-none">
        &#8599;
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill Marker */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4FC39] text-neutral-950 text-xs font-black uppercase tracking-widest">
            ABOUT ME
          </div>
          {isEditMode && (
            <button
              onClick={() => {
                setActiveEditorTab('profile');
                setEditorModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 text-[#D4FC39] text-xs font-bold hover:bg-neutral-800"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit About</span>
            </button>
          )}
        </div>

        {/* Heading & Subtitle */}
        <div className="max-w-3xl mb-12">
          <h2 
            className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Director of Medonize & Strategic RCM Leader Driving Operational Precision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            With 14+ years of specialized healthcare experience, I formulate end-to-end revenue strategies that turn chaotic denial cycles into predictable, high-yield financial cash flows for healthcare providers across the United States.
          </p>
        </div>

        {/* Skill / Competency Circle Nodes - Exactly matching the circular Figma/Ai/Ps/Xd badges in image.png */}
        <div className="mb-16">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 flex items-center justify-between">
            <span>Core Competencies & Proficiency Benchmarks</span>
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveEditorTab('skills');
                  setEditorModalOpen(true);
                }}
                className="text-xs font-bold text-neutral-900 underline hover:text-black"
              >
                + Edit Skills &amp; Scores
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {data.skills.map((skill) => (
              <div 
                key={skill.id}
                className="group flex flex-col items-center p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80 hover:border-neutral-900 hover:shadow-lg transition-all duration-300"
              >
                {/* Circular Icon with Neon Accent */}
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-neutral-950 flex flex-col items-center justify-center text-white shadow-md group-hover:scale-105 group-hover:ring-4 group-hover:ring-[#D4FC39]/50 transition-all">
                  <div className="p-2 rounded-full bg-[#D4FC39] text-neutral-950 mb-1">
                    {getSkillIcon(skill.iconType)}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-tight text-[#D4FC39]">
                    {skill.shortName}
                  </span>
                </div>

                {/* Name & Percentage below circle */}
                <div className="text-center mt-3">
                  <div className="text-sm font-bold text-neutral-900 leading-snug">
                    {skill.name}
                  </div>
                  <div className="text-xl font-black text-neutral-950 mt-1 font-mono">
                    {skill.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Hard Skills vs Soft Leadership Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Hard Skills Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F5F6F8] border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-[#D4FC39] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900">
                  RCM Technical Mastery
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  Systems, Billing Architecture & Analytical Control
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.hardSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200/60 text-xs font-semibold text-neutral-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft & Strategic Leadership */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F5F6F8] border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-[#D4FC39] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900">
                  Strategic Leadership & Governance
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  Team Mentorship, Negotiation & Performance Coaching
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.softSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200/60 text-xs font-semibold text-neutral-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
