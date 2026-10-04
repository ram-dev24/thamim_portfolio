import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  User, 
  Briefcase, 
  FolderKanban, 
  Sparkles, 
  Sliders,
  Check,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EditorModal: React.FC = () => {
  const { 
    data, 
    isEditorModalOpen, 
    setEditorModalOpen, 
    activeEditorTab, 
    setActiveEditorTab,
    updateProfile,
    updateMetrics,
    updateExperience,
    addExperience,
    deleteExperience,
    updateProject,
    addProject,
    deleteProject,
    updateSkill,
    addSkill,
    deleteSkill,
    updateEducation,
    addEducation,
    deleteEducation,
    resetToDefaults,
    exportJSON,
    importJSON,
    setIsPrintView
  } = usePortfolio();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isEditorModalOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importJSON(text);
          if (success) {
            showToast('Portfolio imported successfully!');
            confetti({ particleCount: 50, spread: 60 });
          } else {
            alert('Invalid portfolio JSON file format.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* Slide-over panel */}
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-300 animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4FC39] text-neutral-950 flex items-center justify-center font-bold">
              ✏️
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                Live Portfolio Editor
              </h2>
              <p className="text-xs text-neutral-400">
                Customize content, metrics &amp; career entries in real time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast('Changes saved to browser storage!');
                setEditorModalOpen(false);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#D4FC39] text-neutral-950 text-xs font-bold hover:bg-[#bded1b] flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
            <button
              onClick={() => setEditorModalOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-neutral-200 bg-neutral-50 px-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveEditorTab('profile')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeEditorTab === 'profile'
                ? 'border-neutral-950 text-neutral-950 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Bio</span>
          </button>
          <button
            onClick={() => setActiveEditorTab('metrics')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeEditorTab === 'metrics'
                ? 'border-neutral-950 text-neutral-950 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Key Metrics</span>
          </button>
          <button
            onClick={() => setActiveEditorTab('experiences')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeEditorTab === 'experiences'
                ? 'border-neutral-950 text-neutral-950 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({data.experiences.length})</span>
          </button>
          <button
            onClick={() => setActiveEditorTab('projects')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeEditorTab === 'projects'
                ? 'border-neutral-950 text-neutral-950 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects ({data.projects.length})</span>
          </button>
          <button
            onClick={() => setActiveEditorTab('skills')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeEditorTab === 'skills'
                ? 'border-neutral-950 text-neutral-950 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skills</span>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: PROFILE */}
          {activeEditorTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Primary Title &amp; Role
                  </label>
                  <input
                    type="text"
                    value={data.profile.role}
                    onChange={(e) => updateProfile({ role: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={data.profile.company}
                    onChange={(e) => updateProfile({ company: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={data.profile.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-neutral-900 bg-neutral-100 shrink-0 shadow-sm">
                    <img
                      src={data.profile.avatarUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 text-[#D4FC39] text-xs font-bold cursor-pointer hover:bg-neutral-800 transition-colors shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (uploadEvent) => {
                              const result = uploadEvent.target?.result as string;
                              if (result) {
                                updateProfile({ avatarUrl: result });
                                showToast('Custom photo applied successfully!');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-neutral-500">
                      Upload your high-res headshot, corporate photo, or enter an image URL below.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.profile.avatarUrl}
                    onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-black"
                    placeholder="Image URL or Data URL..."
                  />
                  <button
                    type="button"
                    onClick={() => updateProfile({ avatarUrl: '/avatar.jpg' })}
                    className="px-3 py-1 bg-neutral-900 text-[#D4FC39] text-xs font-bold rounded-lg hover:bg-neutral-800 shrink-0"
                  >
                    Reset to Executive Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Executive Bio &amp; Summary
                </label>
                <textarea
                  rows={4}
                  value={data.profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Availability / Open For
                </label>
                <input
                  type="text"
                  value={data.profile.availableFor}
                  onChange={(e) => updateProfile({ availableFor: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* TAB 2: METRICS */}
          {activeEditorTab === 'metrics' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-500">
                These quantifiable metrics appear in the hero badges, project cards, and ticker banner.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Years of RCM Experience
                  </label>
                  <input
                    type="text"
                    value={data.metrics.yearsExperience}
                    onChange={(e) => updateMetrics({ yearsExperience: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Denial Rate Reduction
                  </label>
                  <input
                    type="text"
                    value={data.metrics.denialReduction}
                    onChange={(e) => updateMetrics({ denialReduction: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Manual Workload Cut (RPA)
                  </label>
                  <input
                    type="text"
                    value={data.metrics.manualWorkloadReduction}
                    onChange={(e) => updateMetrics({ manualWorkloadReduction: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Clean Claim Increase
                  </label>
                  <input
                    type="text"
                    value={data.metrics.cleanClaimImprovement}
                    onChange={(e) => updateMetrics({ cleanClaimImprovement: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Team Size Led
                  </label>
                  <input
                    type="text"
                    value={data.metrics.teamSizeManaged}
                    onChange={(e) => updateMetrics({ teamSizeManaged: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    First-Pass Resolution Improvement
                  </label>
                  <input
                    type="text"
                    value={data.metrics.firstPassResolution}
                    onChange={(e) => updateMetrics({ firstPassResolution: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCES */}
          {activeEditorTab === 'experiences' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500">
                  Career Positions &amp; Leadership Roles
                </span>
                <button
                  type="button"
                  onClick={() => {
                    addExperience({
                      role: 'New Healthcare Role',
                      company: 'Organization Name',
                      duration: '2026 - Present',
                      isCurrent: true,
                      summary: 'Brief overview of responsibilities and focus.',
                      highlights: ['Led core operational initiatives.', 'Achieved quantifiable performance milestones.'],
                    });
                    showToast('New experience entry added!');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 text-[#D4FC39] text-xs font-bold hover:bg-neutral-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.experiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 border rounded-xl bg-neutral-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-200">
                        #{index + 1} {exp.company}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteExperience(exp.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-600">Role Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience({ ...exp, role: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-600">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience({ ...exp, company: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-600">Duration (e.g. 2022 - Feb 2026)</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateExperience({ ...exp, duration: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.isCurrent || false}
                          onChange={(e) => updateExperience({ ...exp, isCurrent: e.target.checked })}
                          className="rounded"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-xs font-semibold text-neutral-700">
                          Current Role
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600">Role Summary</label>
                      <input
                        type="text"
                        value={exp.summary}
                        onChange={(e) => updateExperience({ ...exp, summary: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600">
                        Bullet Points (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={exp.highlights.join('\n')}
                        onChange={(e) =>
                          updateExperience({
                            ...exp,
                            highlights: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeEditorTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500">
                  Strategic Projects &amp; Case Studies
                </span>
                <button
                  type="button"
                  onClick={() => {
                    addProject({
                      number: String(data.projects.length + 1).padStart(2, '0'),
                      title: 'New Strategic Initiative',
                      duration: 'Quarterly Project',
                      tags: ['Operations', 'Optimization'],
                      metrics: 'Measurable Impact KPI',
                      description: 'Comprehensive project overview and target objectives.',
                      highlights: ['Engineered streamlined workflows.', 'Achieved quantifiable bottom-line improvement.'],
                      category: 'Revenue Optimization',
                    });
                    showToast('New strategic project added!');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 text-[#D4FC39] text-xs font-bold hover:bg-neutral-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 border rounded-xl bg-neutral-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-200">
                        {proj.number} - {proj.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteProject(proj.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-600">Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject({ ...proj, title: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-600">Metric Highlight</label>
                        <input
                          type="text"
                          value={proj.metrics}
                          onChange={(e) => updateProject({ ...proj, metrics: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject({ ...proj, description: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600">
                        Key Accomplishments (one per line)
                      </label>
                      <textarea
                        rows={2}
                        value={proj.highlights.join('\n')}
                        onChange={(e) =>
                          updateProject({
                            ...proj,
                            highlights: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeEditorTab === 'skills' && (
            <div className="space-y-4">
              <span className="text-xs font-bold text-neutral-500">
                Core Competencies &amp; Score % (Matching Figma/Ai/Ps/Xd Circle Style)
              </span>

              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="p-3 border rounded-xl bg-neutral-50 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span>{skill.name} ({skill.shortName})</span>
                        <span>{skill.percentage}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skill.percentage}
                        onChange={(e) => updateSkill({ ...skill, percentage: Number(e.target.value) })}
                        className="w-full accent-black cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Drawer Actions: Export, Import, Reset, Print */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="px-3 py-1.5 rounded-lg bg-white border border-neutral-300 text-xs font-bold text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5"
              title="Download portfolio data as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="px-3 py-1.5 rounded-lg bg-white border border-neutral-300 text-xs font-bold text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditorModalOpen(false);
                setIsPrintView(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4FC39]" />
              <span>Print CV</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all changes back to Thamim Ansar K original resume data?')) {
                  resetToDefaults();
                  showToast('Reset to original resume defaults!');
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-1"
              title="Reset back to Thamim's original resume data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
