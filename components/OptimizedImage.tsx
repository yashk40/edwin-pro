
import React, { useState } from 'react';
import { ImageIcon } from './Icons';

interface OptimizedImageProps {
    src?: string;
    alt: string;
    className?: string;
    aspectRatio?: 'square' | 'video' | 'auto';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = "",
    aspectRatio = 'square'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const aspectClass = {
        square: 'aspect-square',
        video: 'aspect-video',
        auto: ''
    }[aspectRatio];

    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=75&fm=webp";

    return (
        <div className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${className}`}>
            {/* Loading Skeleton */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 animate-pulse bg-slate-200 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-300 opacity-50" />
                </div>
            )}

            {/* Error / Missing Image Fallback */}
            {hasError || !src ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-4 text-center">
                    <img
                        src={FALLBACK_IMAGE}
                        alt="Fallback"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">Image Not<br />Available</span>
                    </div>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
            )}
        </div>
    );
};

export default OptimizedImage;
