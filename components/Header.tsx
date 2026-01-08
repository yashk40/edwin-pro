
import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { SettingsIcon } from './Icons';
import { CONFIG } from '../config';
import Tooltip from './Tooltip';

export type ViewState = 'home' | 'store' | 'contact';

interface HeaderProps {
  currentView: ViewState | 'admin';
  onNavigate: (view: ViewState) => void;
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ currentView, onNavigate, onOpenSettings }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: { name: string; path: string; id: ViewState }[] = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'Catalog', path: '/catalog', id: 'store' },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string, id: ViewState) => {
    e.preventDefault();

    // If clicking the same route, force navigation with a new key
    if (location.pathname === path) {
      navigate(path, { replace: true, state: { refresh: Date.now() } });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 h-16 md:h-20 lg:h-24 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 h-full">
          <div className="flex justify-between items-center h-full relative">
            {/* Logo */}
            <NavLink to="/" onClick={(e) => handleNavClick(e, '/', 'home')} className="flex items-center group">
              <img
                src="/Edwenpro.png"
                alt={CONFIG.company.name}
                className="h-12 md:h-26 lg:h-16 w-auto object-contain transition-all hover:opacity-80"
              />
            </NavLink>

            {/* Desktop/Tablet Nav */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-5 lg:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path, link.id)}
                  className={({ isActive }) =>
                    `relative transition-colors duration-200 font-bold text-xs lg:text-sm uppercase tracking-wider group ${isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400'
                    }`
                  }
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${currentView === link.id ? 'scale-x-100' : ''}`}></span>
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={(e) => handleNavClick(e, '/contact', 'contact')}
                className={({ isActive }) =>
                  `relative transition-colors duration-200 font-bold text-xs lg:text-sm uppercase tracking-wider group ${isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`
                }
              >
                Contact
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${currentView === 'contact' ? 'scale-x-100' : ''}`}></span>
              </NavLink>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
              {/* Settings Button */}
              <Tooltip content="Settings" position="bottom">
                <button
                  onClick={onOpenSettings}
                  className="p-2 text-slate-400 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-500"
                  aria-label="Open Settings"
                >
                  <SettingsIcon className="w-5 h-5 md:w-5 md:h-5" />
                </button>
              </Tooltip>

              {/* Mobile 'Get Quote' Button */}
              <button
                onClick={() => navigate('/contact')}
                className="md:hidden bg-primary-600 text-white text-xs font-bold px-3 py-2 rounded shadow-sm uppercase tracking-wider"
              >
                Get<br />Quote
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});

export default Header;
