
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckIcon, DiamondIcon, LayersIcon,
    FileTextIcon, ArrowLeftIcon,
    VideoIcon, MonitorIcon, PenToolIcon, ImageIcon
} from './Icons';
import { Product } from '../data';
import PricingTable from './PricingTable';

interface ProductPageProps {
    product: Product;
    onBack: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onBack }) => {
    const navigate = useNavigate();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [mediaViewMode, setMediaViewMode] = useState<'photos' | 'drawing'>('photos');
    const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'pricing'>('overview');

    const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    const hasPricing = product.bulkPricing && product.bulkPricing.length > 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product.id]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FileTextIcon },
        { id: 'specs', label: 'Specifications', icon: LayersIcon }
    ];

    if (hasPricing) {
        tabs.push({ id: 'pricing', label: 'Bulk Pricing', icon: DiamondIcon });
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20 md:pt-24 lg:pt-28 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Increased Container Width from 7xl to 1800px for larger layout */}
            <div className="container mx-auto px-4 md:px-6 max-w-[1800px]">
                {/* Navigation / Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 text-sm relative z-0">
                    <button
                        onClick={() => {
                            console.log('ProductPage: Back button clicked - navigating to /catalog');
                            navigate('/catalog');
                        }}
                        className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer"
                    >
                        <ArrowLeftIcon className="w-4 h-4" /> Back
                    </button>
                    <span className="text-slate-300 hidden md:inline" style={{ cursor: "default" }}>/</span>
                    <span className="text-slate-500 hidden md:inline" style={{ cursor: "default" }}>{product.category}</span>
                    <span className="text-slate-300 hidden md:inline" style={{ cursor: "default" }}>/</span>
                    <span className="text-slate-900 font-bold truncate max-w-[200px] hidden md:inline" style={{ cursor: "default" }}>{product.name}</span>
                </div>

                {/* Product Layout */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[80vh]">

                    {/* Left Column: Media Gallery - Increased width to 60% */}
                    <div className="w-full lg:w-[60%] bg-slate-50/50 flex flex-col relative border-b lg:border-b-0 lg:border-r border-slate-200">

                        {/* Media View Toggles */}
                        {product.installationDrawing && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur rounded-full p-1 border border-slate-200 shadow-sm flex gap-1">
                                <button
                                    onClick={() => setMediaViewMode('photos')}
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${mediaViewMode === 'photos' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                                >
                                    <MonitorIcon className="w-3.5 h-3.5" /> Product Photos
                                </button>
                                <button
                                    onClick={() => setMediaViewMode('drawing')}
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${mediaViewMode === 'drawing' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                                >
                                    <PenToolIcon className="w-3.5 h-3.5" /> Installation Diagram
                                </button>
                            </div>
                        )}

                        {/* Main Media Area */}
                        <div className="relative w-full aspect-square lg:aspect-auto flex-1 bg-white overflow-hidden">
                            {mediaViewMode === 'photos' ? (
                                galleryImages[activeImageIndex] ? (
                                    <img
                                        src={galleryImages[activeImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-contain animate-in fade-in duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                        <ImageIcon className="w-16 h-16 text-slate-300" />
                                    </div>
                                )
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                                    <div className="relative w-full h-full border-2 border-dashed border-primary-200 rounded-xl bg-primary-50/30 p-4">
                                        {product.installationDrawing ? (
                                            <img
                                                src={product.installationDrawing}
                                                alt="Installation Diagram"
                                                className="w-full h-full object-contain mix-blend-multiply opacity-90"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <PenToolIcon className="w-16 h-16 text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-primary-800 border border-primary-100">
                                            Scale 1:50 • Blueprint
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Technical Installation Guide</p>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails - Only show in Photos mode */}
                        {mediaViewMode === 'photos' && galleryImages.length > 1 && (
                            <div className="flex gap-3 p-6 overflow-x-auto bg-slate-50 border-t border-slate-200 no-scrollbar justify-center">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-primary-500 ring-2 ring-primary-500 ring-offset-2' : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300'}`}
                                    >
                                        {img ? (
                                            <img src={img} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                                <ImageIcon className="w-4 h-4 text-slate-300" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* NEW: Additional Image Placeholder Section */}
                        <div className="p-6 bg-slate-50 border-t border-slate-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Dimensional Drawing / Additional View</h4>
                            <div className="w-full h-64 bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 m-2 rounded-lg cursor-pointer hover:border-primary-400 hover:text-primary-500 transition-all">
                                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Additional Product View Placeholder</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Info - Width reduced to 40% */}
                    <div className="w-full lg:w-[40%] flex flex-col">

                        {/* Header */}
                        <div className="p-8 md:p-10 border-b border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1 rounded-full uppercase tracking-wider border border-primary-100">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight font-display mb-3">{product.name}</h1>
                            {product.sku && (
                                <div className="text-sm font-mono text-slate-400 mb-6 bg-slate-50 inline-block px-2 py-1 rounded">SKU: {product.sku}</div>
                            )}

                            {/* Price or Pricing Table */}
                            {product.pricingTable && product.pricingTable.length > 0 ? (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">Pricing Details</h3>
                                    <PricingTable pricingData={product.pricingTable} />
                                </div>
                            ) : (
                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-5xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-slate-400 line-through decoration-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 bg-slate-50/50">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 py-5 text-sm font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 border-b-4 transition-all ${activeTab === tab.id ? 'border-amber-500 text-amber-600 bg-amber-50/50' : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100'}`}
                                >
                                    <tab.icon className="w-4 h-4" /> {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 md:p-10 bg-white overflow-y-auto max-h-[600px] custom-scrollbar">
                            {activeTab === 'overview' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <p className="text-xl text-slate-700 leading-relaxed font-semibold">
                                        {product.details || product.description}
                                    </p>
                                    <div className="grid grid-cols-1 gap-4">
                                        {product.features?.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors">
                                                <div className="bg-white p-2 rounded-full shadow-sm text-primary-600">
                                                    <CheckIcon className="w-6 h-6" strokeWidth="2.5" />
                                                </div>
                                                <span className="text-base font-bold text-slate-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Video Link */}
                                    {product.videoUrl && (
                                        <div className="pt-6 border-t border-slate-100">
                                            <a
                                                href={product.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold uppercase tracking-wide text-xs transition-all shadow-lg group"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <VideoIcon className="w-5 h-5" />
                                                    Watch Installation Guide
                                                </span>
                                                <ArrowLeftIcon className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'specs' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    {product.specs && product.specs.length > 0 ? (
                                        <div className="rounded-xl border-2 border-slate-300 overflow-hidden shadow-sm">
                                            <table className="w-full text-base text-left">
                                                <tbody className="divide-y divide-slate-200">
                                                    {product.specs.map((row, i) => (
                                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                            <td className="py-5 px-6 font-bold text-slate-600 text-base w-1/3 bg-slate-100 border-r-2 border-slate-200">{row.key}</td>
                                                            <td className="py-5 px-6 font-mono text-slate-800 font-semibold text-base">{row.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                                            No detailed specifications available for this product.
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'pricing' && hasPricing && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className="grid grid-cols-3 bg-slate-100 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                            <div>Quantity</div>
                                            <div>Unit Price</div>
                                            <div>Savings</div>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {product.bulkPricing!.map((tier, idx) => (
                                                <div key={idx} className={`grid grid-cols-3 p-4 text-sm font-medium text-slate-700 ${tier.label ? 'bg-emerald-50/50' : ''}`}>
                                                    <div>{tier.minQty} {tier.maxQty ? `- ${tier.maxQty}` : '+'}</div>
                                                    <div>₹{tier.price.toLocaleString('en-IN')}</div>
                                                    <div className="text-emerald-600 font-bold">{tier.label || '-'}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        *Bulk pricing is automatically applied at checkout. For custom quotes, contact sales directly.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
