
import React, { useState, useEffect } from 'react';
import { promotions } from '../data/marketing';
import { ArrowRightIcon } from './Icons';
import { ViewState } from './Header';
import BlurText from './BlurText';

interface PromoSliderProps {
    onNavigate: (view: ViewState) => void;
}

const PromoSlider: React.FC<PromoSliderProps> = ({ onNavigate }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % promotions.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleNavigate = (link: string) => {
        if (link === 'store' || link === 'contact' || link === 'home') {
            onNavigate(link as ViewState);
        } else {
            console.warn('Unknown navigation target:', link);
        }
    };

    return (
        <section className="bg-white border-b border-slate-100">
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-soft bg-slate-900 group">
                    {promotions.map((promo, index) => (
                        <div
                            key={promo.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            {/* Image Background */}
                            <img
                                src={promo.image}
                                alt={promo.title}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex items-center">
                                <div className="px-8 md:px-16 max-w-2xl">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-4 ${promo.accentColor}`}>
                                        Limited Offer
                                    </span>
                                    <BlurText
                                        text={promo.title}
                                        className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight"
                                        animateBy="words"
                                        direction="top"
                                    />
                                    <p className="text-slate-200 text-lg mb-8 font-medium max-w-md">
                                        {promo.subtitle}
                                    </p>
                                    <button
                                        onClick={() => handleNavigate(promo.link)}
                                        className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-primary-500 hover:text-white transition-all transform hover:translate-x-1"
                                    >
                                        {promo.ctaText}
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-8 md:left-16 z-20 flex gap-2">
                        {promotions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-primary-500' : 'w-2 bg-white/30 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSlider;
