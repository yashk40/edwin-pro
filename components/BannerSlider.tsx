
import React, { memo } from 'react';
import { CONFIG } from '../config';
import { ArrowRightIcon } from './Icons';

const BannerSlider: React.FC = memo(() => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-primary-950">
            {/* Full Screen Video - Optimized to 1080p for performance */}
            <video 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                autoPlay 
                loop 
                muted 
                playsInline
                preload="metadata"
                poster={CONFIG.hero.image}
            >
                <source src="https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Overlay for text contrast (Yellow tinted) */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-900/40 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Hero Content - SEO Optimized H1 */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-20">
                <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 border border-primary-500/50 text-primary-300 font-bold uppercase tracking-[0.2em] text-xs mb-6 backdrop-blur-sm">
                        Premium Kitchen Hardware
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        {CONFIG.hero.headline}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-md">
                        {CONFIG.hero.subheadline}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                            href="#store"
                            className="inline-flex items-center justify-center gap-3 bg-primary-500 text-slate-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white transition-all transform hover:translate-x-1 shadow-lg shadow-primary-500/25"
                        >
                            {CONFIG.hero.ctaButton}
                            <ArrowRightIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Gradient Fade at bottom to blend with content */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-50 to-transparent z-10"></div>
        </div>
    );
});

export default BannerSlider;
