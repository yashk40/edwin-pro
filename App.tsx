
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { WhatsAppIcon } from './components/Icons';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';
import { CONFIG } from './config';
import { getProducts } from './utils/productManager';
import { Product } from './data';
import { useLenis } from './hooks/useLenis';

// Lazy load heavy view components
const Store = lazy(() => import('./components/Store'));
const Contact = lazy(() => import('./components/Contact'));
const ProductRoute = lazy(() => import('./components/ProductRoute'));

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [storeCategory, setStoreCategory] = useState('All');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);

  // Initialize Lenis smooth scroll
  useLenis();

  // Load products on mount
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  // Refresh AOS on route change to ensure animations work
  useEffect(() => {
    if ((window as any).AOS) {
      // Scroll to top on route change
      window.scrollTo(0, 0);

      // Reinitialize AOS completely to fix animations on navigation
      setTimeout(() => {
        (window as any).AOS.refreshHard(); // Force complete refresh
      }, 100);
    }
  }, [location.pathname]);

  // Dynamic Title Update and ensure light mode
  useEffect(() => {
    document.title = `${CONFIG.company.name} | ${CONFIG.company.tagline}`;

    // Always use light mode
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');

    // Performance: Detect Mobile/Low-Power devices and disable Glassmorphism
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.classList.add('disable-glass');
    }
  }, []);

  // Handler for opening a specific category from Home
  const handleCategorySelect = (category: string) => {
    setStoreCategory(category);
    navigate('/catalog');
    window.scrollTo(0, 0);
  };

  // Determine current view from location
  const getCurrentView = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/catalog')) return 'store';
    if (location.pathname === '/contact') return 'contact';
    if (location.pathname === '/admin') return 'admin';
    if (location.pathname.startsWith('/product')) return 'store'; // Highlight catalog for product pages
    return 'home';
  };

  const currentView = getCurrentView();
  const shouldShowBottomNav = !isFullScreenModalOpen && currentView !== 'admin';

  return (
    <div className={`bg-primary-50 text-slate-800 antialiased ${shouldShowBottomNav ? 'pb-24' : 'pb-0'} md:pb-0 overflow-x-hidden font-sans selection:bg-primary-100`}>

      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)}
      />

      {/* Main Content with Routes */}
      <main className="min-h-screen">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)}
                  onCategorySelect={handleCategorySelect}
                  onModalToggle={setIsFullScreenModalOpen}
                />
              }
            />
            <Route
              path="/catalog"
              element={
                <Store
                  products={products}
                  onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)}
                  onModalToggle={setIsFullScreenModalOpen}
                  initialCategory={storeCategory}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />
              }
            />
            <Route
              path="/catalog/:productSlug"
              element={<ProductRoute products={products} />}
            />
            {/* <Route
              path="/admin"
              element={
                <AdminPanel
                  products={products}
                  onUpdate={handleProductUpdate}
                  onBack={() => navigate('/')}
                />
              }
            /> */}
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />

      {/* Bottom Nav (Mobile) */}
      {shouldShowBottomNav && (
        <BottomNav
          currentView={currentView}
          onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)}
        />
      )}

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${CONFIG.contact.phoneRaw.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </div>
  );
};

export default App;
