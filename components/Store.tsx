
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewState } from './Header';
import { Product } from '../data';
import { useProductFilter } from '../hooks/useProductFilter';
import { StoreProductCard } from './StoreProductCard';
import StoreFilters from './StoreFilters';
import { SearchIcon, FilterIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

import { createSlug } from '../utils/slugUtils';

interface StoreProps {
    products: Product[];
    onNavigate: (view: ViewState) => void;
    onModalToggle?: (isOpen: boolean) => void;
    initialCategory?: string;
}

const Store: React.FC<StoreProps> = ({ products, onNavigate, onModalToggle, initialCategory = 'All' }) => {
    const navigate = useNavigate();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const {
        // State
        search, setSearch,
        sort, setSort,
        showOutOfStock, setShowOutOfStock,
        selectedCategories, toggleCategory,
        selectedMaterials, toggleMaterial,
        selectedColors, toggleColor,
        priceRange, setPriceRange,
        currentPage, setCurrentPage,

        // Data
        categories,
        materials,
        colors,
        filteredProducts,
        paginatedProducts,
        totalItems,
        totalPages,
        resetFilters
    } = useProductFilter(products, initialCategory);

    // Handle Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Handler for product click
    const handleProductClick = (product: Product) => {
        navigate(`/catalog/${createSlug(product.name)}`);
        window.scrollTo(0, 0);
    };

    const PaginationControls = () => {
        if (totalPages <= 1) return null;
        return (
            <div className="flex items-center justify-center gap-2 mt-12">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30 hover:bg-white hover:text-primary-600 transition-colors"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>

                <span className="text-sm font-bold text-slate-600 px-4">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30 hover:bg-white hover:text-primary-600 transition-colors"
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
        );
    };

    const FiltersProps = {
        categories,
        selectedCategories,
        onToggleCategory: toggleCategory,
        materials,
        selectedMaterials,
        onToggleMaterial: toggleMaterial,
        colors,
        selectedColors,
        onToggleColor: toggleColor,
        priceRange,
        onPriceChange: (type: 'min' | 'max', val: string) => setPriceRange(prev => ({ ...prev, [type]: val })),
        showOutOfStock,
        onToggleStock: () => setShowOutOfStock(!showOutOfStock),
        onClearAll: resetFilters
    };

    return (
        <div className="pt-20 md:pt-24 lg:pt-28 min-h-screen bg-slate-50 pb-24">

            {/* Mobile Filter Drawer */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                <div className={`absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-300 p-6 overflow-y-auto ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl font-display text-slate-900">Filters</h3>
                        <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-red-500">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <StoreFilters {...FiltersProps} />
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl uppercase tracking-widest text-xs"
                        >
                            Show {totalItems} Results
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-[1600px]">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <button

                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
                    >
                        <ChevronLeftIcon className="w-4 h-4" /> Back to Home
                    </button>
                    <span className="text-slate-300">/</span>
                    <p style={{
                        color: 'black'
                    }} >Product Catalog</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-28">
                        <StoreFilters {...FiltersProps} />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 w-full">

                        {/* Search & Toolbar */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 sticky top-16 md:top-20 lg:top-24 z-30">
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                                {/* Search Input */}
                                <div className="relative w-full md:max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <SearchIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all text-slate-900"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm flex-1 border border-slate-200"
                                    >
                                        <FilterIcon className="w-4 h-4" />
                                        Filters {selectedCategories.length > 0 && <span className="bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded-full">{selectedCategories.length}</span>}
                                    </button>

                                    {/* Sort */}
                                    {/* <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="flex-1 md:w-48 px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary-500 focus:outline-none cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select> */}
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(selectedCategories.length > 0 || selectedMaterials.length > 0 || selectedColors.length > 0) && (
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                                    {selectedCategories.map(cat => (
                                        <button key={cat} onClick={() => toggleCategory(cat)} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-white rounded-full text-xs font-bold uppercase hover:bg-slate-700 transition-colors">
                                            {cat} <XIcon className="w-3 h-3" />
                                        </button>
                                    ))}
                                    {selectedMaterials.map(mat => (
                                        <button key={mat} onClick={() => toggleMaterial(mat)} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold uppercase hover:bg-primary-700 transition-colors">
                                            {mat} <XIcon className="w-3 h-3" />
                                        </button>
                                    ))}
                                    {selectedColors.map(col => (
                                        <button key={col} onClick={() => toggleColor(col)} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-600 text-white rounded-full text-xs font-bold uppercase hover:bg-slate-700 transition-colors">
                                            {col} <XIcon className="w-3 h-3" />
                                        </button>
                                    ))}
                                    {/* {showOutOfStock && (
                                        // <button onClick={() => setShowOutOfStock(false)} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase hover:bg-emerald-700 transition-colors">
                                        //     Include Out of Stock <XIcon className="w-3 h-3" />
                                        // </button>
                                    )} */}
                                </div>
                            )}
                        </div>

                        {/* Products Grid */}
                        <div className="min-h-[50vh]">
                            {totalItems === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 border-dashed">
                                    <SearchIcon className="w-16 h-16 text-slate-200 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                                    <p className="text-slate-500 text-sm mb-6">Try adjusting your search or filters</p>
                                    <button onClick={resetFilters} className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary-700 transition-colors">
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {paginatedProducts.map(product => (
                                        <StoreProductCard
                                            key={product.id}
                                            product={product}
                                            onClick={handleProductClick}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <PaginationControls />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
