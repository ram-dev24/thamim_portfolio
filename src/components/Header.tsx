import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Edit3, Eye, Phone, Printer, Menu, X, Check, Download } from 'lucide-react';

export const Header: React.FC = () => {
  const { data, isEditMode, toggleEditMode, setEditorModalOpen, setIsPrintView } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <a 
              href="#home" 
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-[#D4FC39] font-black text-xl tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  {data.profile.company}
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase mt-0.5">
                  {data.profile.name} · {data.profile.organizationRole.split('&')[0]}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              Expertise
            </button>
            <button 
              onClick={() => scrollToSection('experiences')} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              Experiences
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs & Edit Mode Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Edit Mode Toggle Button */}
            <button
              onClick={toggleEditMode}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
                isEditMode
                  ? 'bg-neutral-900 text-[#D4FC39] border-neutral-900 shadow-sm ring-2 ring-[#D4FC39]/50'
                  : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
              }`}
              title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode to customize text, stats & experiences'}
            >
              {isEditMode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D4FC39]" />
                  <span>Editing On</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Edit Portfolio</span>
                </>
              )}
            </button>

            {/* Quick Open Editor Drawer (when editing is on) */}
            {isEditMode && (
              <button
                onClick={() => setEditorModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-[#D4FC39] text-neutral-950 hover:bg-[#bded1b] transition-all shadow-sm"
              >
                <span>Edit Fields</span>
              </button>
            )}

            {/* Print CV Button */}
            <button
              onClick={() => setIsPrintView(true)}
              className="p-2.5 rounded-full text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              title="View & Print Executive Resume"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Let's Talk CTA (Yellow Button from sample design) */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4FC39] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#cbfb45] hover:shadow-md transition-all border border-neutral-900/10"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>LET'S TALK</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleEditMode}
              className={`p-2 rounded-lg text-xs font-bold ${
                isEditMode ? 'bg-neutral-900 text-[#D4FC39]' : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-neutral-200 py-4 px-2 space-y-3 bg-white">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-50"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-50"
            >
              About Me
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-50"
            >
              Expertise & Services
            </button>
            <button
              onClick={() => scrollToSection('experiences')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-50"
            >
              Journey & Career
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-50"
            >
              Strategic Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-50"
            >
              Contact
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPrintView(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-300 text-xs font-bold text-neutral-800"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Resume</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#D4FC39] text-xs font-bold text-neutral-950 uppercase"
              >
                <Phone className="w-4 h-4" />
                <span>LET'S TALK</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
