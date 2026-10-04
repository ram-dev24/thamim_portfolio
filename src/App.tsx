/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { JourneySection } from './components/JourneySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { EditorModal } from './components/EditorModal';
import { ResumeModal } from './components/ResumeModal';
import { FloatingControls } from './components/FloatingControls';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#F8F9FA] text-[#121212] selection:bg-[#D4FC39] selection:text-neutral-950 font-sans antialiased">
        {/* Navigation Bar */}
        <Header />

        {/* Hero Section with Stylized Editorial Typography & Portrait */}
        <Hero />

        {/* Running Marquee Ticker */}
        <MarqueeTicker />

        {/* About Section with Competencies & Figma/Ai-style circles */}
        <AboutSection />

        {/* Dark Grid Section: Services & Core Capabilities */}
        <ServicesSection />

        {/* Journey & Experience Section with Left Stylized "JOURNEY" + Education */}
        <JourneySection />

        {/* Strategic Projects & Measurable Initiatives */}
        <ProjectsSection />

        {/* Contact Form & Executive Info Cards */}
        <ContactSection />

        {/* Interactive Slide-over Portfolio Editor */}
        <EditorModal />

        {/* Executive Resume View & PDF Export */}
        <ResumeModal />

        {/* Floating Quick Action Controls */}
        <FloatingControls />
      </div>
    </PortfolioProvider>
  );
}
