import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, ArrowUpRight, Copy, Check, MessageSquare, Edit3 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, isEditMode, setEditorModalOpen, setActiveEditorTab } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0A0B0E] text-white pt-20 pb-12 relative overflow-hidden border-t border-neutral-800">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 tech-grid-dark opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag & Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4FC39] text-neutral-950 text-xs font-black uppercase tracking-widest mb-4">
              DIRECT CONTACT
            </div>
            <h2 
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let's Connect &amp; Elevate Healthcare Revenue Operations.
            </h2>
            <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
              Available directly for executive discussions, strategic RCM advisory, and institutional healthcare leadership. Reach out directly via mobile or email.
            </p>
          </div>

          {isEditMode && (
            <button
              onClick={() => {
                setActiveEditorTab('profile');
                setEditorModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FC39] text-xs font-bold hover:bg-neutral-800 transition-colors shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Contact Info</span>
            </button>
          )}
        </div>

        {/* Two Prominent Executive Cards: Mobile & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Direct Mobile / Call / WhatsApp (Vibrant Lime Accent) */}
          <div className="group relative p-8 sm:p-10 rounded-3xl bg-[#D4FC39] text-neutral-950 border-2 border-[#D4FC39] shadow-xl hover:shadow-2xl hover:shadow-[#D4FC39]/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-900/15 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-[#D4FC39] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <Phone className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-950/10 text-neutral-950">
                  Immediate Direct Line
                </span>
              </div>

              {/* Label & Number */}
              <div className="text-xs font-mono uppercase tracking-wider font-extrabold text-neutral-800 mb-1">
                Direct Mobile &amp; WhatsApp
              </div>
              <div 
                className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 my-2 break-words"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {data.profile.phone}
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed mt-2 mb-6">
                Available for executive calls, direct discussions, and WhatsApp communication regarding RCM engagements.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-900/15">
              <a
                href={`tel:${data.profile.phone.replace(/[^0-9+]/g, '')}`}
                className="px-5 py-3 rounded-xl bg-neutral-950 text-white font-black text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4 text-[#D4FC39]" />
                <span>Call Directly</span>
              </a>

              <a
                href={`https://wa.me/${data.profile.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white/90 text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => copyToClipboard(data.profile.phone, 'phone')}
                className="p-3 rounded-xl bg-neutral-950/10 hover:bg-neutral-950/20 text-neutral-950 transition-colors"
                title="Copy phone number"
              >
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-800" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Executive Email Inbox */}
          <div className="group relative p-8 sm:p-10 rounded-3xl bg-[#14151B] text-white border-2 border-neutral-800 hover:border-[#D4FC39]/70 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-[#D4FC39] border border-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <Mail className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-800 text-neutral-300">
                  Direct Executive Inbox
                </span>
              </div>

              {/* Label & Email Address */}
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-400 mb-1">
                Primary Email
              </div>
              <div 
                className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-[#D4FC39] transition-colors my-2 break-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {data.profile.email}
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mt-2 mb-6">
                Direct inbox for proposals, provider audit requests, board advisory, and confidential business inquiries.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800">
              <a
                href={`mailto:${data.profile.email}`}
                className="px-5 py-3 rounded-xl bg-[#D4FC39] text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-[#bded1b] transition-all flex items-center gap-2 shadow-md"
              >
                <Mail className="w-4 h-4 text-neutral-950" />
                <span>Send Email</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => copyToClipboard(data.profile.email, 'email')}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-all flex items-center gap-2"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-[#D4FC39]" />
                    <span className="text-[#D4FC39]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; 2026 {data.profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4FC39] animate-pulse"></span>
            <span className="text-neutral-300 font-semibold">{data.profile.availableFor}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 font-bold">{data.profile.company}</span>
            <button
              onClick={scrollToTop}
              className="text-[#D4FC39] hover:underline cursor-pointer"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
