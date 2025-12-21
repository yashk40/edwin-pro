
import { useState, useMemo, useEffect } from 'react';
import { Product } from '../data';

const ITEMS_PER_PAGE = 12;

export const useProductFilter = (products: Product[], initialCategory: string = 'All') => {
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState<{min: string, max: string}>({ min: '', max: '' });
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize category from props
  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      setSelectedCategories([initialCategory]);
    } else {
        setSelectedCategories([]);
    }
  }, [initialCategory]);

  // Derive available options with counts
  const { categories, materials, colors } = useMemo(() => {
    const catCounts: Record<string, number> = {};
    const matCounts: Record<string, number> = {};
    const colCounts: Record<string, number> = {};

    products.forEach(p => {
        catCounts[p.category] = (catCounts[p.category] || 0) + 1;
        if (p.material) matCounts[p.material] = (matCounts[p.material] || 0) + 1;
        if (p.color) colCounts[p.color] = (colCounts[p.color] || 0) + 1;
    });

    return {
        categories: Object.entries(catCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
        materials: Object.entries(matCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
        colors: Object.entries(colCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }))
    };
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      // 1. Category Filter (OR logic between selected)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      
      // 2. Search Filter
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
                            product.name.toLowerCase().includes(searchLower) || 
                            product.description.toLowerCase().includes(searchLower) ||
                            product.category.toLowerCase().includes(searchLower);

      // 3. Stock Filter
      const matchesStock = showOutOfStock ? true : product.inStock;
      
      // 4. Price Filter
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = product.price >= min && product.price <= max;

      // 5. Material Filter
      const matchesMaterial = selectedMaterials.length === 0 || (product.material && selectedMaterials.includes(product.material));

      // 6. Color Filter
      const matchesColor = selectedColors.length === 0 || (product.color && selectedColors.includes(product.color));

      return matchesCategory && matchesSearch && matchesStock && matchesPrice && matchesMaterial && matchesColor;
    });

    // 7. Sorting
    result = result.sort((a, b) => {
        switch (sort) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default: return 0; // featured/default order
        }
    });

    return result;
  }, [products, selectedCategories, selectedMaterials, selectedColors, search, sort, showOutOfStock, priceRange]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  useEffect(() => {
      setCurrentPage(1);
  }, [selectedCategories, selectedMaterials, selectedColors, search, sort, showOutOfStock, priceRange]);

  return {
    // State
    search, setSearch,
    sort, setSort,
    showOutOfStock, setShowOutOfStock,
    selectedCategories, setSelectedCategories,
    selectedMaterials, setSelectedMaterials,
    selectedColors, setSelectedColors,
    priceRange, setPriceRange,
    currentPage, setCurrentPage,
    
    // Data
    categories,
    materials,
    colors,
    filteredProducts,
    paginatedProducts,
    totalItems: filteredProducts.length,
    totalPages,

    // Actions
    toggleCategory: (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    },
    toggleMaterial: (material: string) => {
        setSelectedMaterials(prev => 
            prev.includes(material) 
                ? prev.filter(m => m !== material)
                : [...prev, material]
        );
    },
    toggleColor: (color: string) => {
        setSelectedColors(prev => 
            prev.includes(color) 
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    },
    resetFilters: () => {
      setSearch('');
      setSelectedCategories([]);
      setSelectedMaterials([]);
      setSelectedColors([]);
      setSort('featured');
      setShowOutOfStock(false);
      setPriceRange({ min: '', max: '' });
      setCurrentPage(1);
    }
  };
};
