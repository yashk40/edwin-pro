
import React, { useState, useEffect, Suspense, lazy, startTransition, useCallback } from 'react';
import Header, { ViewState } from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';
import { MessageCircleIcon } from './components/Icons';
import { CONFIG } from './config';
import { useSettings } from './contexts/SettingsContext';
import { getProducts } from './utils/productManager';
import { Product } from './data';

// Lazy load heavy view components to speed up initial load
const Store = lazy(() => import('./components/Store'));
const Contact = lazy(() => import('./components/Contact'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState | 'admin'>('home');
  const [storeCategory, setStoreCategory] = useState('All');

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const { features } = useSettings();

  // Products State (Dynamic)
  const [products, setProducts] = useState<Product[]>([]);

  // Load products on mount
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  // Handle Hash Navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.substring(1);

      if (hash === 'admin') {
        setCurrentView('admin');
        return;
      }

      if (['home', 'store', 'contact'].includes(hash)) {
        setCurrentView(hash as ViewState);
      }
    };

    handleHash(); // Check on mount
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic Title Update, Theme, and Mobile Performance Optimization
  useEffect(() => {
    document.title = `${CONFIG.company.name} | ${CONFIG.company.tagline}`;

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    const root = document.documentElement;
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Performance: Detect Mobile/Low-Power devices and disable Glassmorphism
    // CSS Backdrop-filter is very GPU intensive on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.classList.add('disable-glass');
    }

  }, []);

  // Navigation Handler with Transition for smoothness
  const handleNavigate = useCallback((view: ViewState | 'admin') => {
    startTransition(() => {
      // If navigating to store via generic nav, reset filter to 'All'
      if (view === 'store') {
        setStoreCategory('All');
      }
      setCurrentView(view);
      window.scrollTo(0, 0);
    });
  }, []);

  // Handler for opening a specific category from Home
  const handleCategorySelect = useCallback((category: string) => {
    startTransition(() => {
      setStoreCategory(category);
      setCurrentView('store');
      window.scrollTo(0, 0);
    });
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            products={products}
            onNavigate={handleNavigate}
            onCategorySelect={handleCategorySelect}
            onModalToggle={setIsFullScreenModalOpen}
          />
        );
      case 'store':
        return (
          <Store
            products={products}
            onNavigate={handleNavigate}
            onModalToggle={setIsFullScreenModalOpen}
            initialCategory={storeCategory}
          />
        );
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'admin':
        return (
          <AdminPanel
            products={products}
            onUpdate={handleProductUpdate}
            onBack={() => handleNavigate('home')}
          />
        );
      default:
        return (
          <Home
            products={products}
            onNavigate={handleNavigate}
            onCategorySelect={handleCategorySelect}
            onModalToggle={setIsFullScreenModalOpen}
          />
        );
    }
  };

  // Check if any modal is open to hide bottom nav, AND check feature flag
  const shouldShowBottomNav = features.enableMobileBottomNav && !isFullScreenModalOpen && !isSettingsOpen && currentView !== 'admin';

  return (
    <div className={`bg-primary-50 text-slate-800 dark:bg-slate-900 dark:text-primary-50 antialiased ${shouldShowBottomNav ? 'pb-24' : 'pb-0'} md:pb-0 overflow-x-hidden font-sans selection:bg-primary-100`}>

      {/* Modals with Suspense */}
      <Suspense fallback={null}>
        {isSettingsOpen && (
          <SettingsModal
            onClose={() => setIsSettingsOpen(false)}
            onNavigate={handleNavigate}
          />
        )}
      </Suspense>

      {/* Hide Header on Admin Page */}
      {currentView !== 'admin' && (
        <Header
          currentView={currentView as ViewState}
          onNavigate={handleNavigate}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      <main>
        <Suspense fallback={<LoadingScreen />}>
          {renderView()}
        </Suspense>
      </main>

      {currentView !== 'admin' && <Footer onNavigate={handleNavigate} />}

      {shouldShowBottomNav && (
        <BottomNav currentView={currentView as ViewState} onNavigate={handleNavigate} />
      )}

      {/* Floating WhatsApp - Hide on Admin */}
      {currentView !== 'admin' && (
        <a
          href={`https://wa.me/${CONFIG.contact.phoneRaw.replace('+', '')}?text=${encodeURIComponent(`Hi ${CONFIG.company.name}, I found your digital catalog and would like to know more.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed right-4 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-transform z-50 flex items-center justify-center group ${shouldShowBottomNav ? 'bottom-24' : 'bottom-8'}`}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircleIcon className="h-7 w-7 fill-current" />
        </a>
      )}

    </div>
  );
};

export default App;
