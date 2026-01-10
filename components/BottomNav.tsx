
import React from 'react';
import { HomeIcon, PhoneIcon, ShoppingCartIcon } from './Icons';
import { ViewState } from './Header';
import Tooltip from './Tooltip';

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
      <Tooltip content={label} position="top">
        <button
          onClick={(e) => handleNav(e, view)}
          className="relative flex flex-col items-center justify-center w-14 h-14 group"
        >
          {isActive && (
            <span className="absolute inset-0 bg-white/10 rounded-2xl animate-in zoom-in-90 duration-200"></span>
          )}

          <Icon
            className={`h-6 w-6 transition-all duration-300 z-10 ${isActive
              ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
              : 'text-slate-400 group-hover:text-slate-200'
              }`}
            strokeWidth={isActive ? 2.5 : 1.5}
          />
          {isActive && (
            <span className="absolute -bottom-2 w-1 h-1 bg-primary-400 rounded-full shadow-[0_0_5px_currentColor]"></span>
          )}
        </button>
      </Tooltip>
    );
  };

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-[90] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-xs bg-slate-900/90  border border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-3xl p-2 flex justify-between items-center relative ring-1 ring-white/5">

        <NavItem view="home" label="Home" icon={HomeIcon} />

        <div className="relative -mt-8 group">
          <Tooltip content="Contact Us" position="top">
            <button
              onClick={(e) => handleNav(e, 'contact')}
              aria-label="Contact Us"
              className={`relative w-16 h-16 flex items-center justify-center rounded-full shadow-2xl border-[3px] border-slate-900 transition-transform duration-300 active:scale-95 hover:-translate-y-1
                  ${currentView === 'contact'
                  ? 'bg-gradient-to-tr from-primary-500 to-slate-800 shadow-primary-500/50 scale-110'
                  : 'bg-gradient-to-tr from-primary-600 to-slate-700 shadow-slate-600/40'
                }
                `}
            >
              <PhoneIcon className="h-7 w-7 text-white fill-current z-10" strokeWidth="1.5" />
            </button>
          </Tooltip>
        </div>

        <NavItem view="catalog" label="Catalog" icon={ShoppingCartIcon} />
      </div>
    </div>
  );
}

export default BottomNav;
