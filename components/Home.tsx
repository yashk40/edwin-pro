
import React, { useMemo } from 'react';
import {
    ArrowRightIcon, LayersIcon, MapPinIcon, BuildingIcon,
    CheckBadgeIcon, UsersIcon, DiamondIcon
} from './Icons';
import FadeIn from './FadeIn';
import BannerSlider from './BannerSlider';
import BrandSlider from './BrandSlider';
import { CONFIG } from '../config';
import { Product } from '../data';
import { ViewState } from './Header';
import BlurText from './BlurText';

interface HomeProps {
    products: Product[];
    onNavigate: (view: ViewState) => void;
    onCategorySelect: (category: string) => void;
    onModalToggle?: (isOpen: boolean) => void;
}

// Optimization: Moved outside component to prevent recreation on every render
const getFeatureIcon = (iconName: string) => {
    const className = "w-6 h-6";
    switch (iconName) {
        case 'users': return <UsersIcon className={className} />;
        case 'pin': return <MapPinIcon className={className} />;
        case 'layers': return <LayersIcon className={className} />;
        case 'check': return <CheckBadgeIcon className={className} />;
        case 'building': return <BuildingIcon className={className} />;
        case 'diamond': return <DiamondIcon className={className} />;
        default: return <LayersIcon className={className} />;
    }
};

// Fallback image in case Unsplash link breaks - optimized with WebP
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=75&fm=webp';

const Home: React.FC<HomeProps> = ({ products, onNavigate, onCategorySelect }) => {

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = FALLBACK_IMAGE;
    };

    // Derive categories from the dynamic products list
    const homeCategories = useMemo(() => {
        return Array.from(new Set(products.map(p => p.category))).slice(0, 5);
    }, [products]);

    return (
        <div className="overflow-hidden bg-primary-50">
            {/* VIDEO HERO SECTION */}
            <section className="relative w-full h-screen overflow-hidden">
                <BannerSlider />

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20">
                    <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-black/10">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping"></div>
                    </div>
                </div>
            </section>



            {/* BRAND SLIDER SECTION */}
            <BrandSlider />

            {/* STATS SECTION */}
            <section className="bg-primary-100 border-y border-primary-200 relative z-20">
                <div className="container mx-auto px-6 py-12 md:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
                        {CONFIG.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center group cursor-default"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                data-aos-duration="600"
                            >
                                <div className="flex items-center justify-center mb-3 text-primary-600 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                    {getFeatureIcon(stat.icon)}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary-700 transition-colors">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className="py-24 md:py-32 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_-15px_rgba(255,192,0,0.1)] relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="800">
                        <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Catalog</span>
                        <BlurText
                            text="Shop by Category"
                            className="text-3xl md:text-5xl font-bold text-slate-900 font-display mb-6 justify-center"
                            animateBy="words"
                            direction="top"
                        />
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Explore our wide range of professional hardware and tools.
                        </p>
                    </div>

                    {/* Categories Grid - 3 cols per row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {homeCategories.map((category, index) => {
                            const categoryImage = products.find(p => p.category === category)?.image;
                            const count = products.filter(p => p.category === category).length;
                            // Optimize image URL with WebP and compression
                            const optimizedImage = categoryImage?.includes('unsplash')
                                ? `${categoryImage}${categoryImage.includes('?') ? '&' : '?'}fm=webp&q=75`
                                : categoryImage;

                            return (
                                <FadeIn key={category} delay={index * 30}>
                                    <div
                                        onClick={() => onCategorySelect(category)}
                                        className="group relative h-96 md:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-glow transition-all duration-300 border border-primary-100 hover:border-primary-400"
                                    >
                                        <img
                                            src={optimizedImage || FALLBACK_IMAGE}
                                            alt={category}
                                            loading={index < 3 ? "eager" : "lazy"}
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                                            onError={handleImageError}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                            <BlurText
                                                text={category}
                                                className="text-3xl md:text-4xl font-bold text-white mb-3 font-display"
                                                animateBy="words"
                                                direction="top"
                                            />
                                            <div className="flex items-center justify-between">
                                                <span className="text-primary-200 font-bold uppercase text-sm tracking-widest group-hover:text-primary-100 transition-colors">
                                                    {count} Products
                                                </span>
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-500 flex items-center justify-center group-hover:bg-white group-hover:text-primary-600 transition-all text-slate-900 shadow-lg">
                                                    <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            );
                        })}

                        {/* 6th Card: See All Categories */}
                        <FadeIn delay={5 * 30}>
                            <div
                                onClick={() => onNavigate('catalog')}
                                className="group relative h-96 md:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-glow transition-all duration-300 border border-primary-100 hover:border-primary-400 bg-slate-900"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=75&fm=webp"
                                    alt="All Categories"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent"></div>

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-500 flex items-center justify-center group-hover:bg-white group-hover:text-primary-600 transition-all text-slate-900 shadow-xl mb-6 group-hover:scale-110">
                                        <ArrowRightIcon className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <BlurText
                                        text="View All Categories"
                                        className="text-3xl md:text-4xl font-bold text-white font-display mb-3 justify-center"
                                        animateBy="words"
                                        direction="top"
                                    />
                                    <span className="text-primary-200 font-bold uppercase text-sm tracking-widest group-hover:text-white transition-colors">
                                        Browse Full Catalog
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* <div className="text-center mt-20">
                        <button
                            onClick={() => onNavigate('store')}
                            className="inline-flex items-center gap-3 text-slate-900 hover:text-primary-600 font-bold uppercase tracking-widest transition-colors group text-sm md:text-base"
                        >
                            <span className="border-b-2 border-primary-500 group-hover:border-slate-900 pb-1">View Full Catalog</span>
                            <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div> */}
                </div>
            </section>

            {/* CTA SECTION - Updated to YELLOW */}
            <section className="py-24 md:py-32 bg-primary-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-30"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <div className="text-center">
                        <span className="text-slate-900 font-bold tracking-[0.2em] text-sm uppercase mb-6 block opacity-70">
                            {CONFIG.homepage.cta.titleLabel}
                        </span>
                        <BlurText
                            text={CONFIG.homepage.cta.title.replace('\n', ' ')}
                            className="text-4xl md:text-6xl font-bold text-slate-900 font-display mb-8 leading-tight justify-center"
                            animateBy="words"
                            direction="top"
                        />
                        <p className="text-xl text-slate-800 mb-12 font-medium max-w-2xl mx-auto opacity-80">
                            {CONFIG.homepage.cta.description}
                        </p>
                        <button
                            onClick={() => onNavigate('catalog')}
                            className="px-10 py-5 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 shadow-2xl"
                        >
                            {CONFIG.homepage.cta.buttonText}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
