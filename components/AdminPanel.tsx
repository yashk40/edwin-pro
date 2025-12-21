
import React, { useState, useEffect } from 'react';
import { Product } from '../data';
import { updateProduct, resetToDefaults } from '../utils/productManager';
import { 
  SearchIcon, PenToolIcon, CheckIcon, XIcon, 
  TrashIcon, PlusIcon, ImageIcon, ArrowLeftIcon, DownloadIcon, FileTextIcon 
} from './Icons';
import FadeIn from './FadeIn';

interface AdminPanelProps {
  products: Product[];
  onUpdate: (products: Product[]) => void;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onUpdate, onBack }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [showExport, setShowExport] = useState(false);

  // Filter logic
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );
  
  // Unique Categories for Dropdown
  const uniqueCategories = Array.from(new Set(products.map(p => p.category))).sort();

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (editForm.id) {
        const updated = updateProduct(editForm as Product);
        onUpdate(updated);
        setEditingId(null);
        alert('Product updated locally!');
    }
  };

  const handleChange = (field: keyof Product, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleStock = () => {
      setEditForm(prev => ({...prev, inStock: !prev.inStock}));
  };

  // Export Logic
  const getExportCode = () => {
    return `import { Product } from './types';

export const products: Product[] = ${JSON.stringify(products, null, 2)};`;
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(getExportCode());
      alert("Code copied! Paste this into 'data/demos.ts' to save permanently.");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-2 font-bold text-xs uppercase tracking-wider">
                    <ArrowLeftIcon className="w-4 h-4" /> Back to App
                </button>
                <h1 className="text-3xl font-bold font-display text-slate-900">Product Manager</h1>
                <p className="text-slate-500 text-sm">Update pricing, categories, and content details.</p>
            </div>
            
            <div className="flex gap-3">
                 <button 
                    onClick={() => { if(window.confirm('Reset all product data to default?')) resetToDefaults(); }}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-50"
                 >
                    Reset Data
                 </button>
                 <button 
                    onClick={() => setShowExport(true)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 flex items-center gap-2 shadow-lg"
                 >
                    <DownloadIcon className="w-4 h-4" /> Export Data
                 </button>
                 {/* Placeholder for Add New */}
                 <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-700 flex items-center gap-2 shadow-lg">
                    <PlusIcon className="w-4 h-4" /> Add Product
                 </button>
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search by Name, SKU, or Category..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="text-sm font-bold text-slate-500 flex items-center">
                {filteredProducts.length} Products Found
            </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Pricing (₹)</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map(product => (
                            <React.Fragment key={product.id}>
                                <tr className={`hover:bg-slate-50 transition-colors ${editingId === product.id ? 'bg-primary-50/30' : ''}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt="" className="w-10 h-10 rounded-md object-cover bg-slate-100" />
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{product.name}</div>
                                                <div className="text-xs text-slate-400 font-mono">{product.sku || `ID: ${product.id}`}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium">
                                        {product.price}
                                    </td>
                                    <td className="p-4">
                                        {product.inStock ? (
                                            <span className="text-emerald-600 text-xs font-bold flex items-center gap-1"><CheckIcon className="w-3 h-3"/> In Stock</span>
                                        ) : (
                                            <span className="text-red-500 text-xs font-bold">Out of Stock</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleEditClick(product)}
                                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                        >
                                            <PenToolIcon className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                                
                                {/* Edit Drawer (Inline Row) */}
                                {editingId === product.id && (
                                    <tr>
                                        <td colSpan={5} className="p-0">
                                            <FadeIn>
                                                <div className="bg-slate-50 p-6 border-y border-primary-200 shadow-inner">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                                        
                                                        {/* Name - Span 2 */}
                                                        <div className="col-span-1 md:col-span-2">
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Product Name</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.name}
                                                                onChange={(e) => handleChange('name', e.target.value)}
                                                            />
                                                        </div>

                                                        {/* SKU */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">SKU</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none font-mono text-sm"
                                                                value={editForm.sku || ''}
                                                                onChange={(e) => handleChange('sku', e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Category - Dropdown */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
                                                            <select 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none bg-white"
                                                                value={editForm.category}
                                                                onChange={(e) => handleChange('category', e.target.value)}
                                                            >
                                                                {uniqueCategories.map(cat => (
                                                                    <option key={cat} value={cat}>{cat}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        {/* Material */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Material</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.material || ''}
                                                                onChange={(e) => handleChange('material', e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Color */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Color / Finish</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.color || ''}
                                                                onChange={(e) => handleChange('color', e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Price */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Price</label>
                                                            <input 
                                                                type="number" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.price}
                                                                onChange={(e) => handleChange('price', parseInt(e.target.value))}
                                                            />
                                                        </div>

                                                        {/* Original Price */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Original Price</label>
                                                            <input 
                                                                type="number" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.originalPrice || ''}
                                                                onChange={(e) => handleChange('originalPrice', parseInt(e.target.value))}
                                                            />
                                                        </div>

                                                        {/* Stock Level */}
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Stock Level</label>
                                                            <input 
                                                                type="number" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.stockLevel || 0}
                                                                onChange={(e) => handleChange('stockLevel', parseInt(e.target.value))}
                                                            />
                                                        </div>

                                                        {/* Image URL - Span 2 */}
                                                        <div className="col-span-1 md:col-span-2">
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Image URL</label>
                                                            <div className="flex gap-2">
                                                                <input 
                                                                    type="text" 
                                                                    className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none text-xs font-mono"
                                                                    value={editForm.image}
                                                                    onChange={(e) => handleChange('image', e.target.value)}
                                                                />
                                                                <img src={editForm.image} className="w-9 h-9 rounded bg-white border object-cover shrink-0" alt="Preview" />
                                                            </div>
                                                        </div>

                                                        {/* Video URL - Span 2 */}
                                                        <div className="col-span-1 md:col-span-2">
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Video / Demo URL</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none text-xs font-mono text-slate-600"
                                                                value={editForm.videoUrl || ''}
                                                                onChange={(e) => handleChange('videoUrl', e.target.value)}
                                                                placeholder="https://youtube.com/..."
                                                            />
                                                        </div>

                                                        {/* Short Description - Span 3 */}
                                                        <div className="col-span-1 md:col-span-3">
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Short Description (Card)</label>
                                                            <textarea 
                                                                rows={2}
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none"
                                                                value={editForm.description}
                                                                onChange={(e) => handleChange('description', e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Long Details - Span 3 */}
                                                        <div className="col-span-1 md:col-span-3">
                                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Details (Product Page)</label>
                                                            <textarea 
                                                                rows={5}
                                                                className="w-full p-2 border border-slate-300 rounded focus:border-primary-500 outline-none text-sm font-medium text-slate-600"
                                                                value={editForm.details || ''}
                                                                onChange={(e) => handleChange('details', e.target.value)}
                                                                placeholder="Extended product information..."
                                                            />
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-4">
                                                             <label className="flex items-center gap-2 cursor-pointer select-none">
                                                                 <div className={`w-5 h-5 rounded border flex items-center justify-center ${editForm.inStock ? 'bg-primary-500 border-primary-500' : 'bg-white border-slate-300'}`}>
                                                                     {editForm.inStock && <CheckIcon className="w-3.5 h-3.5 text-white" />}
                                                                 </div>
                                                                 <input type="checkbox" className="hidden" checked={editForm.inStock} onChange={toggleStock} />
                                                                 <span className="text-sm font-bold text-slate-700">In Stock</span>
                                                             </label>
                                                        </div>

                                                    </div>

                                                    <div className="flex justify-end gap-3">
                                                        <button 
                                                            onClick={handleCancel}
                                                            className="px-4 py-2 text-slate-600 font-bold uppercase text-xs tracking-wider hover:bg-slate-200 rounded-lg"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button 
                                                            onClick={handleSave}
                                                            className="px-6 py-2 bg-slate-900 text-white font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-slate-800 shadow-lg"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                
                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        No products match your search.
                    </div>
                )}
            </div>
        </div>

        {/* Export Modal */}
        {showExport && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 font-display">Export Database</h2>
                            <p className="text-sm text-slate-500">To save changes permanently, copy this code into <code>data/demos.ts</code></p>
                        </div>
                        <button onClick={() => setShowExport(false)}><XIcon className="w-6 h-6 text-slate-400 hover:text-red-500" /></button>
                    </div>
                    <div className="flex-1 p-0 relative">
                        <textarea 
                            className="w-full h-full p-6 font-mono text-xs text-slate-600 bg-slate-50 resize-none outline-none"
                            readOnly
                            value={getExportCode()}
                        />
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                        <button 
                            onClick={() => setShowExport(false)}
                            className="px-4 py-2 text-slate-500 font-bold uppercase text-xs"
                        >
                            Close
                        </button>
                        <button 
                            onClick={copyToClipboard}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-primary-700 flex items-center gap-2"
                        >
                            <FileTextIcon className="w-4 h-4" /> Copy Code
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
