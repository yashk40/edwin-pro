
import { Product, products as staticProducts } from '../data';

const STORAGE_KEY = 'vistadeck_products_v1';

/**
 * Loads products from LocalStorage. 
 * If no custom data exists, returns the static initial data.
 */
export const getProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load products", e);
  }
  return staticProducts;
};

/**
 * Saves the entire product list to LocalStorage.
 */
export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    // Dispatch a custom event so components can listen for updates if needed
    window.dispatchEvent(new Event('product-data-update'));
  } catch (e) {
    console.error("Failed to save products", e);
  }
};

/**
 * Updates or Adds a single product.
 */
export const updateProduct = (updatedProduct: Product) => {
  const currentProducts = getProducts();
  const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
  
  if (index !== -1) {
    currentProducts[index] = updatedProduct;
  } else {
    // New product (simple ID generation)
    updatedProduct.id = Math.max(...currentProducts.map(p => p.id)) + 1;
    updatedProduct.createdAt = new Date().toISOString();
    currentProducts.unshift(updatedProduct);
  }
  
  saveProducts(currentProducts);
  return currentProducts;
};

/**
 * Resets data back to original code.
 */
export const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
};
