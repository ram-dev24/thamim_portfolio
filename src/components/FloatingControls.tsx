import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Edit3, Check, Printer, Settings } from 'lucide-react';

export const FloatingControls: React.FC = () => {
  const { isEditMode, toggleEditMode, setEditorModalOpen, setIsPrintView } = usePortfolio();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 no-print">
      
      {/* If editing is active, show quick drawer button */}
      {isEditMode && (
        <button
          onClick={() => setEditorModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-[#D4FC39] font-bold text-xs shadow-xl border border-neutral-700 hover:scale-105 transition-all"
          title="Open Portfolio Data Editor"
        >
          <Settings className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Edit Fields</span>
        </button>
      )}

      {/* Main Edit Mode Toggle Pill */}
      <button
        onClick={toggleEditMode}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs shadow-2xl transition-all border ${
          isEditMode
            ? 'bg-[#D4FC39] text-neutral-950 border-neutral-900 ring-4 ring-[#D4FC39]/40'
            : 'bg-neutral-950 text-white border-neutral-800 hover:bg-neutral-800'
        }`}
        title={isEditMode ? 'Finish Editing (View Mode)' : 'Enable Portfolio Editing'}
      >
        {isEditMode ? (
          <>
            <Check className="w-4 h-4 text-neutral-950" />
            <span>Editing ON</span>
          </>
        ) : (
          <>
            <Edit3 className="w-4 h-4 text-[#D4FC39]" />
            <span>Edit Mode</span>
          </>
        )}
      </button>

      {/* Quick Print Resume button */}
      <button
        onClick={() => setIsPrintView(true)}
        className="w-10 h-10 rounded-full bg-white text-neutral-900 border border-neutral-300 shadow-xl flex items-center justify-center hover:bg-neutral-100 transition-all hover:scale-105"
        title="View & Print Executive CV"
      >
        <Printer className="w-4 h-4" />
      </button>

    </div>
  );
};
