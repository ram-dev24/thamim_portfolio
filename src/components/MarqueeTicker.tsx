import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    { text: 'REVENUE CYCLE MANAGEMENT', outline: false },
    { text: '25% DENIAL REDUCTION', outline: true },
    { text: 'HEALTHCARE AR OPTIMIZATION', outline: false },
    { text: 'RPA WORKFLOW AUTOMATION', outline: true },
    { text: '40% WORKLOAD REDUCTION', outline: false },
    { text: '30+ TEAM LEADERSHIP', outline: true },
    { text: 'DSO REDUCTION', outline: false },
    { text: 'CLEAN CLAIM RATE +20%', outline: true },
    { text: 'HIPAA & REGULATORY COMPLIANCE', outline: false },
  ];

  return (
    <div className="w-full bg-[#0D0E11] text-white py-4 overflow-hidden border-y border-neutral-800 select-none">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span
              className={`text-lg sm:text-2xl font-black tracking-wider uppercase ${
                item.outline
                  ? 'text-stroke-outline text-transparent opacity-80'
                  : 'text-white'
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.text}
            </span>
            <span className="text-[#D4FC39] text-xl font-bold">✱</span>
          </div>
        ))}
      </div>
    </div>
  );
};
