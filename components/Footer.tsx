
import React, { memo } from 'react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, ShareIcon, WhatsAppIcon, TwitterIcon, YouTubeIcon } from './Icons';
import { ViewState } from './Header';
import { CONFIG } from '../config';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = memo(({ onNavigate }) => {

  const handleNav = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo(0, 0);
  };

  const handleShareApp = async () => {
    const shareData = {
        title: CONFIG.company.name,
        text: CONFIG.company.description,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Share cancelled');
        }
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        } catch (err) {
            // Fallback
        }
    }
  };

  return (
    <footer id="footer" className="bg-primary-50 border-t border-primary-200">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          {/* Brand Section */}
          <div className="md:w-1/3">
            <a href={CONFIG.company.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-8">
              <div className="bg-primary-500 text-slate-900 p-2.5 rounded-lg shadow-lg">
                 <span className="font-bold text-xl md:text-2xl tracking-tighter leading-none block">{CONFIG.company.shortName.charAt(0)}</span>
              </div>
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{CONFIG.company.name}</span>
            </a>
            <p className="text-slate-600 text-sm md:text-base leading-7 max-w-sm mb-8 font-medium">
              {CONFIG.company.description}
            </p>
            
            {/* Social Icons - Bigger & Intuitive */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <a 
                href={CONFIG.social.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <FacebookIcon className="w-5 h-5" strokeWidth="2" />
              </a>
              <a 
                href={CONFIG.social.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <InstagramIcon className="w-5 h-5" strokeWidth="2" />
              </a>
              <a 
                href={CONFIG.social.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <LinkedInIcon className="w-5 h-5" strokeWidth="2" />
              </a>
              <a 
                href={CONFIG.social.whatsapp} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <WhatsAppIcon className="w-5 h-5" strokeWidth="2" />
              </a>
              <a 
                href={CONFIG.social.twitter} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <TwitterIcon className="w-5 h-5" strokeWidth="2" />
              </a>
              <a 
                href={CONFIG.social.youtube} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <YouTubeIcon className="w-5 h-5" strokeWidth="2" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-10 md:gap-16 w-full">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-6 tracking-wide uppercase">Platform</h3>
              <ul className="space-y-4 text-sm md:text-base font-medium text-slate-600">
                <li>
                  <a href="#home" onClick={(e) => handleNav(e, 'home')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#store" onClick={(e) => handleNav(e, 'store')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">
                    Full Catalog
                  </a>
                </li>
                <li>
                    <button onClick={handleShareApp} className="flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors hover:translate-x-1 inline-block duration-200">
                        <ShareIcon className="w-4 h-4" /> Share App
                    </button>
                </li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-slate-900 text-base mb-6 tracking-wide uppercase">Support</h3>
              <ul className="space-y-4 text-sm md:text-base font-medium text-slate-600">
                <li>
                  <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">
                    Contact Sales
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-primary-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
          <span>&copy; {new Date().getFullYear()} {CONFIG.company.name}. All rights reserved.</span>
          <div className="flex items-center gap-6">
             <span className="hidden md:inline">{CONFIG.company.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
