
import React from 'react';

const brands = [
  "Titan Power Tools",
  "BuildRight Supply",
  "Ace Hardware",
  "SafeGuard Industrial",
  "Vertex Architectural",
  "Global Fasteners",
  "Miller Industrial",
  "Apex Fittings"
];

const BrandSlider: React.FC = () => {
  return (
    <section className="bg-white border-b border-primary-100 py-8 overflow-hidden relative z-20">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex animate-scroll whitespace-nowrap hover:pause-animation">
        {/* Render 3 sets to ensure smooth infinite scroll on wide screens */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex shrink-0">
             {brands.map((brand, idx) => (
              <div key={`${i}-${idx}`} className="flex items-center gap-3 mx-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default group select-none">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors shadow-sm">
                   <span className="font-bold text-xl font-display">{brand.charAt(0)}</span>
                </div>
                <span className="text-xl font-bold font-display text-slate-700 tracking-tight">{brand}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <style>{`
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandSlider;
