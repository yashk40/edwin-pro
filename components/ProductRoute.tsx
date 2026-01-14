import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../data/types';
import ProductPage from './ProductPage';
import { createSlug } from '../utils/slugUtils';

interface ProductRouteProps {
    products: Product[];
}

const ProductRoute: React.FC<ProductRouteProps> = ({ products }) => {
    const { productSlug } = useParams<{ productSlug: string }>();
    const navigate = useNavigate();

    // Parse Slug and find product
    const product = products.find(p => createSlug(p.name) === productSlug);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold mb-4 text-slate-800">Product Not Found</h2>
                    <p className="text-slate-500 mb-6">The product you are looking for does not exist or has been removed.</p>
                    <button
                        onClick={() => {
                            navigate('/catalog');
                            console.log('Navigating to catalog');
                        }}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                    >
                        Return to Catalog
                    </button>
                </div>
            </div>
        );
    }

    // Always navigate back to catalog
    const handleBack = () => {
        console.log('ProductRoute: Navigating back to catalog with preserved params');
        // Try to restore previous catalog parameters
        const savedParams = sessionStorage.getItem('catalogParams');
        const backUrl = savedParams ? `/catalog?${savedParams}` : '/catalog';
        navigate(backUrl);
    };

    return <ProductPage product={product} onBack={handleBack} />;
};

export default ProductRoute;
