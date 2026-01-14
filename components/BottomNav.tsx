
import React from 'react';
import { HomeIcon, PhoneIcon, ShoppingCartIcon } from './Icons';
import { ViewState } from './Header';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {

  const handleNav = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    onNavigate(view);
  };

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={(e) => handleNav(e, view)}
        className="relative flex flex-col items-center justify-center flex-1 h-14 group transition-all duration-300"
        aria-label={label}
      >
        <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary-50 shadow-sm' : 'group-hover:bg-slate-50'}`}>
          <Icon
            className={`h-6 w-6 transition-all duration-300 ${isActive
              ? 'text-primary-600 scale-110'
              : 'text-slate-500 group-hover:text-slate-700'
              }`}
            strokeWidth={isActive ? 2.5 : 2}
          />
        </div>

        {/* Active Dot Indicator */}
        <div className={`absolute bottom-1 w-1 h-1 rounded-full transition-all duration-500 ${isActive ? 'bg-primary-500 shadow-[0_0_8px_rgba(255,192,0,0.5)] scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
      </button>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] animate-in slide-in-from-bottom duration-500">
      {/* Glossy Backdrop (Light Mode) */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" />

      {/* Decorative Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary-400/40 to-transparent rounded-full" />

      <div className="relative flex justify-around items-center h-16 px-4 pb-safe">
        <NavItem view="home" label="Home" icon={HomeIcon} />

        <div className="relative -mt-6">
          <button
            onClick={(e) => handleNav(e, 'contact')}
            aria-label="Contact Us"
            className={`relative w-14 h-14 flex items-center justify-center rounded-full shadow-[0_8px_25px_rgba(255,192,0,0.25)] transition-all duration-300 active:scale-90 hover:scale-105
                ${currentView === 'contact'
                ? 'bg-gradient-to-tr from-primary-500 to-primary-600 ring-4 ring-white shadow-xl'
                : 'bg-gradient-to-tr from-primary-500 to-primary-600'
              }
              `}
          >
            <PhoneIcon className="h-6 w-6 text-white drop-shadow-sm relative z-10" strokeWidth="2.5" />
          </button>

          {/* External Halo Effect */}
          {currentView === 'contact' && (
            <div className="absolute -inset-1 rounded-full bg-primary-400/10 animate-pulse z-0" />
          )}
        </div>

        <NavItem view="catalog" label="Catalog" icon={ShoppingCartIcon} />
      </div>

      {/* Safe Area Spacer for iOS Devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}

export default BottomNav;
