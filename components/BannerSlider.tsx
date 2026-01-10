
import React, { memo, useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { ArrowRightIcon } from './Icons';

const BannerSlider: React.FC = memo(() => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Optimized background images with WebP format and compression
    const backgroundImages = [
        './banner.jpg',
        './banner2.jpg',
        './banner3.jpg',
    ];
    const slides = backgroundImages.length;
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides);
        }, 6000);

        return () => clearInterval(interval);
    }, [isPaused, slides]);

    return (
        <div
            className="relative w-full h-screen overflow-hidden  pt-16 md:pt-20 lg:pt-24"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Images Carousel */}
            <div className="absolute inset-0">
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            willChange: currentSlide === index ? 'opacity' : 'auto',
                        }}
                    />
                ))}
            </div>

            {/* Dark Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10"></div>

            {/* Static Hero Content - AOS animations */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-20 pt-24">
                <div className="max-w-3xl">
                    <div data-aos="fade-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary-500 text-white font-bold uppercase text-xs mb-6">
                            Premium Kitchen Hardware
                        </span>
                    </div>

                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Engineered for the Modern Kitchen.
                    </h1>

                    <p
                        className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Experience the smooth glide of EdwenPro Tandem Hardware. The preferred choice for modular kitchen manufacturers and architects.
                    </p>

                    <div data-aos="fade-up" data-aos-delay="300">
                        <a
                            href="/catalog"
                            className="inline-flex items-center gap-3 bg-primary-500 text-slate-900 px-8 py-4 rounded-xl font-bold uppercase text-sm hover:bg-white transition-colors"
                        >
                            EXPLORE COLLECTION
                            <ArrowRightIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {backgroundImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 ${currentSlide === index
                            ? 'w-12 h-3 bg-primary-500'
                            : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                            } rounded-full`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Gradient Fade at bottom to blend with content */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-50 to-transparent z-10"></div>
        </div>
    );
});

export default BannerSlider;
