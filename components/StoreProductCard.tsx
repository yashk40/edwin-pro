import React, { memo, useMemo } from 'react';
import { Product } from '../data';
import OptimizedImage from './OptimizedImage';
import TiltedCard from './TiltedCard';

export const ProductSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 flex flex-col h-full">
        <div className="aspect-square bg-slate-100 animate-pulse relative"></div>
        <div className="p-4 flex flex-col gap-2 flex-grow">
            <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
            <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                <div className="h-5 bg-slate-100 rounded w-1/3 animate-pulse"></div>
                <div className="h-8 w-8 bg-slate-100 rounded-lg animate-pulse"></div>
            </div>
        </div>
    </div>
);

interface StoreProductCardProps {
    product: Product;
    onClick: (p: Product) => void;
}

export const StoreProductCard = memo(({
    product,
    onClick
}: StoreProductCardProps) => {

    // Status Logic
    const isLowStock = product.inStock && product.stockLevel !== undefined && product.stockLevel < 5;
    const isOnSale = product.originalPrice && product.originalPrice > product.price;

    // Determine if product is "New" (created within last 30 days)
    const isNew = useMemo(() => {
        const created = new Date(product.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - created.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }, [product.createdAt]);

    return (
        <TiltedCard
            imageSrc={product.image}
            altText={product.name}
            captionText={product.name}
            containerHeight="auto"
            imageHeight="280px"
            scaleOnHover={1.03}
            rotateAmplitude={10}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            className={!product.inStock ? 'opacity-75' : ''}
            overlayContent={
                <div
                    className="flex flex-col h-full pointer-events-auto"
                    onClick={() => onClick(product)}
                >
                    {/* Badge Container (Matches the TiltedCard's image area) */}
                    <div className="relative h-[280px] w-full">
                        {/* Badges Stack */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 items-start">
                            <span className="bg-white/95 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm border border-slate-100">
                                {product.category}
                            </span>

                            {isNew && (
                                <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm animate-in fade-in slide-in-from-left-2">
                                    New
                                </span>
                            )}

                            {isOnSale && (
                                <span className="bg-rose-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm animate-in fade-in slide-in-from-left-2 delay-75">
                                    Sale
                                </span>
                            )}

                            {isLowStock && (
                                <span className="bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm animate-in fade-in slide-in-from-left-2 delay-100">
                                    Low Stock
                                </span>
                            )}
                        </div>

                        {!product.inStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] z-10">
                                <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-md">
                                    Sold Out
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Details Container */}
                    <div className="p-5 flex flex-col flex-grow bg-white/80 backdrop-blur-sm border-t border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
                            {product.category}: {product.name}
                        </h3>

                        {(product.price !== undefined && product.price > 0) && (
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-xl font-bold ${!product.inStock ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </span>
                                        {/* Show original price if on sale */}
                                        {isOnSale && (
                                            <span className="text-xs text-slate-400 line-through decoration-slate-400">
                                                ₹{product.originalPrice?.toLocaleString('en-IN')}
                                            </span>
                                        )}
                                    </div>
                                    {isLowStock && (
                                        <span className="text-[10px] font-bold text-amber-600">
                                            {product.stockLevel} left
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        />
    );
});
