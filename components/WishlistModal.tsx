
import React, { useState, useEffect } from 'react';
import { XIcon, TrashIcon, DiamondIcon, ShareIcon } from './Icons';
import { Product, products } from '../data';
import { CONFIG } from '../config';

interface WishlistModalProps {
  onClose: () => void;
  onNavigate: (view: any) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ onClose, onNavigate }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const saved = localStorage.getItem('vistadeck_wishlist');
      if (saved) {
        try {
            const ids: number[] = JSON.parse(saved);
            // Filter global product list based on saved IDs
            const items = products.filter(p => ids.includes(p.id));
            setWishlistItems(items);
        } catch (e) {
            console.error("Failed to parse wishlist", e);
            // Auto-recover by clearing bad data
            localStorage.removeItem('vistadeck_wishlist');
        }
      }
    };
    loadWishlist();
  }, []);

  const removeFromWishlist = (id: number) => {
    const updatedList = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedList);
    
    // Update LocalStorage
    const ids = updatedList.map(i => i.id);
    localStorage.setItem('vistadeck_wishlist', JSON.stringify(ids));
  };

  const handleBrowseCatalog = () => {
    onClose();
    onNavigate('store');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                    <DiamondIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 font-display">Project Board</h2>
                    <p className="text-xs text-slate-500 font-medium">Saved items for consideration</p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-white">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 custom-scrollbar">
            {wishlistItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <DiamondIcon className="w-16 h-16 text-slate-200 mb-4" />
                    <h3 className="text-slate-900 font-bold text-lg">Your board is empty</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
                        Save items from the catalog to build a project list or compare specifications.
                    </p>
                    <button onClick={handleBrowseCatalog} className="mt-6 text-primary-600 font-bold text-xs uppercase tracking-widest hover:underline">
                        Browse Catalog
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center shadow-sm group hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex-grow min-w-0">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{item.category}</div>
                                <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
                                <div className="font-mono text-xs font-bold text-slate-600 mt-1">₹{item.price.toLocaleString('en-IN')}</div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove from saved"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
             <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                     {wishlistItems.length} Items Saved
                 </span>
                 <button 
                    onClick={() => {
                        // Share logic for the whole list
                        const listText = wishlistItems.map(i => `- ${i.name} (₹${i.price})`).join('\n');
                        const text = `Check out my project list on ${CONFIG.company.name}:\n${listText}`;
                        
                        if (navigator.share) {
                            navigator.share({ 
                                title: 'My Project Board', 
                                text: text,
                                url: window.location.href 
                            }).catch(() => {
                                // Fallback if user cancels or share fails
                                navigator.clipboard.writeText(text);
                                alert('Project list copied to clipboard!');
                            });
                        } else {
                            navigator.clipboard.writeText(text);
                            alert('Project list copied to clipboard!');
                        }
                    }}
                    className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest hover:text-primary-700"
                 >
                     <ShareIcon className="w-4 h-4" /> Share List
                 </button>
             </div>
        )}

      </div>
    </div>
  );
};

export default WishlistModal;
