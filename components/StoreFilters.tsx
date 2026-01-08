
import React from 'react';
import { CheckIcon, MinusIcon } from './Icons';

interface StoreFiltersProps {
  categories: { name: string; count: number }[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;

  materials: { name: string; count: number }[];
  selectedMaterials: string[];
  onToggleMaterial: (material: string) => void;

  colors: { name: string; count: number }[];
  selectedColors: string[];
  onToggleColor: (color: string) => void;

  priceRange: { min: string; max: string };
  onPriceChange: (type: 'min' | 'max', value: string) => void;

  showOutOfStock: boolean;
  onToggleStock: () => void;

  onClearAll: () => void;
}

const FilterSection: React.FC<{
  title: string;
  items: { name: string; count: number }[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}> = ({ title, items, selectedItems, onToggle }) => (
  <div className="space-y-3">
    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h4>
    <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
      {items.map((item) => {
        const isSelected = selectedItems.includes(item.name);
        return (
          <label
            key={item.name}
            className="flex items-center justify-between group cursor-pointer select-none py-1"
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-300 group-hover:border-primary-500'}`}>
                {isSelected && <CheckIcon className="w-3.5 h-3.5 text-white" strokeWidth="3" />}
              </div>
              <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {item.name}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded-full">{item.count}</span>

            <input
              type="checkbox"
              className="hidden"
              checked={isSelected}
              onChange={() => onToggle(item.name)}
            />
          </label>
        );
      })}
    </div>
  </div>
);

const StoreFilters: React.FC<StoreFiltersProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
  materials,
  selectedMaterials,
  onToggleMaterial,
  colors,
  selectedColors,
  onToggleColor,
  priceRange,
  onPriceChange,
  showOutOfStock,
  onToggleStock,
  onClearAll
}) => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 font-display text-lg">Filters</h3>
        <button
          onClick={onClearAll}
          className="text-xs font-bold text-primary-600 uppercase tracking-wider hover:text-primary-700 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <FilterSection
        title="Categories"
        items={categories}
        selectedItems={selectedCategories}
        onToggle={onToggleCategory}
      />

      {/* Materials */}
      {/* <FilterSection 
        title="Material" 
        items={materials} 
        selectedItems={selectedMaterials} 
        onToggle={onToggleMaterial} 
      /> */}

      {/* Colors */}
      {/* <FilterSection 
        title="Color" 
        items={colors} 
        selectedItems={selectedColors} 
        onToggle={onToggleColor} 
      /> */}

      {/* Price Range */}
      {/* <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Price Range (₹)</h4>
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input 
                    type="number" 
                    placeholder="Min"
                    className="w-full pl-6 pr-2 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    value={priceRange.min}
                    onChange={(e) => onPriceChange('min', e.target.value)}
                />
            </div>
            <MinusIcon className="w-3 h-3 text-slate-300" />
            <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input 
                    type="number" 
                    placeholder="Max"
                    className="w-full pl-6 pr-2 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    value={priceRange.max}
                    onChange={(e) => onPriceChange('max', e.target.value)}
                />
            </div>
        </div>
      </div> */}

      {/* Stock Availability */}
      {/* <div className="space-y-4 pt-4 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">Include Out of Stock</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showOutOfStock}
              onChange={onToggleStock}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors duration-200 ${showOutOfStock ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${showOutOfStock ? 'translate-x-4' : 'translate-x-0'} shadow-sm`}></div>
          </div>
        </label>
      </div> */}

    </div>
  );
};

export default StoreFilters;
