import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MapPin, ArrowDownRight, Edit3, Linkedin, Mail, Phone, FileText, Sparkles, ShieldCheck, Camera, Upload, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Hero: React.FC = () => {
  const { data, isEditMode, setEditorModalOpen, setActiveEditorTab, setIsPrintView, updateProfile } = usePortfolio();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        updateProfile({ avatarUrl: result });
        setUploadSuccess(true);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4FC39', '#ffffff', '#22c55e']
        });
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  return (
    <section id="home" className="relative bg-[#FAFAFA] overflow-hidden pt-8 pb-16 lg:pb-24 border-b border-neutral-200">
      
      {/* Technical Background Elements & Rulers matching image.png */}
      <div className="absolute inset-0 pointer-events-none tech-grid-light opacity-60"></div>
      
      {/* Top right measurement markers */}
      <div className="hidden sm:flex flex-col items-end absolute top-6 right-10 pointer-events-none opacity-40 text-[10px] font-mono font-semibold text-neutral-500">
        <div className="flex items-center gap-2 border-b border-neutral-400 pb-1">
          <span>30px</span>
          <div className="w-8 h-[1px] bg-neutral-400"></div>
        </div>
        <div className="flex items-center gap-2 border-b border-neutral-400 py-1 mt-6">
          <span>90px</span>
          <div className="w-14 h-[1px] bg-neutral-400"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Edit notice banner when active */}
        {isEditMode && (
          <div className="mb-6 p-3 bg-[#D4FC39]/20 border border-[#D4FC39] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <span className="w-2 h-2 rounded-full bg-[#121212] animate-ping"></span>
              <span>Edit Mode is ACTIVE — Click any pencil icon or the "Edit Fields" drawer to customize.</span>
            </div>
            <button
              onClick={() => {
                setActiveEditorTab('profile');
                setEditorModalOpen(true);
              }}
              className="text-xs font-bold bg-neutral-900 text-[#D4FC39] px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Big Typographic Hero */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Greeting Tag */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md bg-neutral-900 text-[#D4FC39] text-xs font-extrabold uppercase tracking-widest">
                Director @ Medonize
              </span>
              <span className="text-xs font-semibold text-neutral-500 tracking-wider">
                14+ Years RCM Operations
              </span>
            </div>

            {/* Giant "Hey -It's Thamim Ansar" Headline */}
            <div className="relative group">
              <h1 
                className="text-7xl sm:text-8xl lg:text-9xl font-black text-neutral-950 tracking-tighter leading-[0.9] select-none"
                style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}
              >
                Hey
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-neutral-600 tracking-tight mt-1 mb-6 flex items-center gap-2">
                <span>-It's {data.profile.name}</span>
                {isEditMode && (
                  <button
                    onClick={() => {
                      setActiveEditorTab('profile');
                      setEditorModalOpen(true);
                    }}
                    className="p-1 rounded bg-[#D4FC39] text-neutral-900 hover:scale-110 transition-transform"
                    title="Edit Name"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
              </p>
            </div>

            {/* Role & Location Card / Description */}
            <div className="space-y-4 max-w-xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                <span>Director of Medonize &</span>
                <br />
                <span className="text-neutral-500">RCM Operations Leader</span>
              </div>

              {/* Location Pill */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-300 shadow-xs text-xs font-bold text-neutral-800">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Based in {data.profile.location}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
                  <span>HIPAA & US Healthcare Expert</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-2">
                {data.profile.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-xl bg-neutral-950 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md flex items-center gap-2 group"
                >
                  <span>Connect with Thamim</span>
                  <ArrowDownRight className="w-4 h-4 text-[#D4FC39] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => setIsPrintView(true)}
                  className="px-5 py-3.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-bold text-sm hover:bg-neutral-50 hover:border-neutral-400 transition-all flex items-center gap-2 shadow-xs"
                >
                  <FileText className="w-4 h-4 text-neutral-700" />
                  <span>Download / Print CV</span>
                </button>
              </div>

              {/* High-Impact Stat Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-200">
                <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs">
                  <span className="block text-2xl sm:text-3xl font-black text-neutral-950">
                    {data.metrics.yearsExperience}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    Years RCM Exp
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs">
                  <span className="block text-2xl sm:text-3xl font-black text-neutral-950 text-emerald-600">
                    -{data.metrics.denialReduction}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    Denial Reduction
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs">
                  <span className="block text-2xl sm:text-3xl font-black text-neutral-950 text-blue-600">
                    {data.metrics.teamSizeManaged}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    Team Members Led
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Visual Portrait matching image.png */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Neon Halo Background Shape matching image.png */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
              
              {/* Vibrant lime green arched background */}
              <div className="absolute inset-4 rounded-[40px] bg-[#D4FC39] transform -rotate-1 border border-neutral-900/10 shadow-lg"></div>

              {/* Decorative Geometric Rings & Wireframe elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-2 border-neutral-900/30 flex items-center justify-center text-xs font-mono font-bold">
                14+
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-neutral-950 rounded-2xl flex items-center justify-center text-[#D4FC39]">
                <Sparkles className="w-6 h-6" />
              </div>

              {/* Portrait Container with Drag & Drop & Direct File Upload */}
              <div 
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative w-[92%] h-[92%] rounded-[36px] overflow-hidden border-2 transition-all duration-300 shadow-xl group ${
                  isDragging 
                    ? 'border-[#D4FC39] ring-4 ring-[#D4FC39] scale-102 bg-neutral-900' 
                    : 'border-neutral-950 bg-neutral-100'
                }`}
              >
                {/* Hidden File Input for Direct Local Image Selection */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <img
                  src={data.profile.avatarUrl}
                  alt={data.profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.01] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/WhatsApp Image 2026-10-02 at 22.21.37.jpg';
                  }}
                />

                {/* Dragging Overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-[#D4FC39] z-30">
                    <Upload className="w-12 h-12 mb-2 animate-bounce" />
                    <span className="text-sm font-black uppercase tracking-wider">
                      Drop Your Exact Photo Here!
                    </span>
                    <span className="text-xs text-neutral-300 mt-1">
                      Sets pixel-perfect photo immediately
                    </span>
                  </div>
                )}

                {/* Director Badge Overlay at bottom of portrait */}
                <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/85 backdrop-blur-md p-3 rounded-2xl border border-neutral-700/50 text-white flex items-center justify-between z-10">
                  <div>
                    <div className="text-xs font-mono text-[#D4FC39] uppercase font-bold tracking-widest">
                      Medonize
                    </div>
                    <div className="text-sm font-extrabold tracking-tight">
                      Thamim Ansar K
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#D4FC39] text-neutral-950 flex items-center justify-center font-bold text-xs">
                    RCM
                  </div>
                </div>

                {/* One-Click Direct Photo Upload Action Button on Top Left */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-neutral-950/85 backdrop-blur-md text-[#D4FC39] rounded-xl hover:bg-neutral-950 transition-all shadow-md text-[11px] font-bold flex items-center gap-1.5 border border-neutral-700/50 group/btn"
                  title="Click to select your exact WhatsApp photo file"
                >
                  <Camera className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  <span>Upload Exact Photo</span>
                </button>

                {/* Edit Photo Icon if edit mode */}
                {isEditMode && (
                  <button
                    onClick={() => {
                      setActiveEditorTab('profile');
                      setEditorModalOpen(true);
                    }}
                    className="absolute top-4 right-4 z-20 p-2 bg-neutral-900/80 backdrop-blur-md text-[#D4FC39] rounded-xl hover:bg-neutral-900 transition-colors shadow-md"
                    title="Change Photo URL"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}

                {/* Upload Success Banner */}
                {uploadSuccess && (
                  <div className="absolute top-14 left-4 right-4 z-30 p-2.5 bg-emerald-500 text-neutral-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg animate-in fade-in zoom-in">
                    <Check className="w-4 h-4" />
                    <span>Exact Photo Applied Successfully!</span>
                  </div>
                )}
              </div>

              {/* Floating Social Pill column on the right side - exactly like in image.png */}
              <div className="absolute -right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                <a
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:bg-[#D4FC39] hover:border-neutral-900 hover:scale-110 transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${data.profile.email}`}
                  className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:bg-[#D4FC39] hover:border-neutral-900 hover:scale-110 transition-all"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${data.profile.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:bg-[#D4FC39] hover:border-neutral-900 hover:scale-110 transition-all"
                  title="Direct Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsPrintView(true)}
                  className="w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center text-neutral-800 hover:bg-[#D4FC39] hover:border-neutral-900 hover:scale-110 transition-all"
                  title="Download Resume"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
