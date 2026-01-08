
import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../data';

const ITEMS_PER_PAGE = 12;

export const useProductFilter = (products: Product[], initialCategory: string = 'All') => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to get array from params
  const getParamArray = (key: string) => {
    const val = searchParams.get(key);
    return val ? val.split(',') : [];
  };

  // State Wrappers around URL Params
  const selectedCategories = useMemo(() => getParamArray('categories'), [searchParams]);
  const selectedMaterials = useMemo(() => getParamArray('materials'), [searchParams]);
  const selectedColors = useMemo(() => getParamArray('colors'), [searchParams]);

  const search = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'featured';
  const showOutOfStock = searchParams.get('outOfStock') === 'true';
  const priceMin = searchParams.get('minPrice') || '';
  const priceMax = searchParams.get('maxPrice') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Initialize category from props if URL is empty AND initialCategory is provided (first load)
  useEffect(() => {
    if (initialCategory && initialCategory !== 'All' && !searchParams.has('categories')) {
      setSearchParams(prev => {
        prev.set('categories', initialCategory);
        return prev;
      }, { replace: true });
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
      const min = priceMin ? parseFloat(priceMin) : 0;
      const max = priceMax ? parseFloat(priceMax) : Infinity;
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
  }, [products, selectedCategories, selectedMaterials, selectedColors, search, sort, showOutOfStock, priceMin, priceMax]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);


  // Helper to update params safely
  const updateParams = (updates: Record<string, string | null | undefined>) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      // Reset page on filter change if not updating page explicitly
      if (!updates.page) {
        newParams.set('page', '1');
      }
      return newParams;
    }, { replace: true });
  };

  return {
    // State (read from URL)
    search,
    setSearch: (val: string) => updateParams({ q: val }),

    sort,
    setSort: (val: string) => updateParams({ sort: val }),

    showOutOfStock,
    setShowOutOfStock: (val: boolean) => updateParams({ outOfStock: val ? 'true' : null }),

    selectedCategories,
    setSelectedCategories: (updater: any) => { /* Not used directly by UI usually, but for compat */ },

    selectedMaterials,
    selectedColors,

    priceRange: { min: priceMin, max: priceMax },
    setPriceRange: (range: { min: string, max: string } | ((prev: any) => any)) => {
      const newRange = typeof range === 'function' ? range({ min: priceMin, max: priceMax }) : range;
      updateParams({ minPrice: newRange.min, maxPrice: newRange.max });
    },

    currentPage,
    setCurrentPage: (page: number | ((prev: number) => number)) => {
      const newPage = typeof page === 'function' ? page(currentPage) : page;
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page', newPage.toString());
        return newParams;
      });
    },

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
      const current = selectedCategories;
      const next = current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category];
      updateParams({ categories: next.length > 0 ? next.join(',') : null });
    },
    toggleMaterial: (material: string) => {
      const current = selectedMaterials;
      const next = current.includes(material)
        ? current.filter(m => m !== material)
        : [...current, material];
      updateParams({ materials: next.length > 0 ? next.join(',') : null });
    },
    toggleColor: (color: string) => {
      const current = selectedColors;
      const next = current.includes(color)
        ? current.filter(c => c !== color)
        : [...current, color];
      updateParams({ colors: next.length > 0 ? next.join(',') : null });
    },
    resetFilters: () => {
      setSearchParams(new URLSearchParams());
    }
  };
};
