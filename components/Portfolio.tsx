
import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import { ArrowRightIcon, XIcon, CheckIcon, MaximizeIcon, PlusIcon, MinusIcon, ShareIcon } from './Icons';
import { Project, projects, testimonials, galleryImages } from '../data';
import { CONFIG } from '../config';
import TestimonialCard from './TestimonialCard';

const ImageModal: React.FC<{ image: string; onClose: () => void }> = ({ image, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchDist, setTouchDist] = useState<number | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom with mouse wheel
    e.stopPropagation();
    const delta = e.deltaY * -0.002;
    const newScale = Math.min(Math.max(1, scale + delta), 4);
    
    setScale(newScale);
    if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
        e.preventDefault();
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Touch Handlers for Mobile Pan & Zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
        // Start Pinch
        const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        setTouchDist(dist);
    } else if (e.touches.length === 1 && scale > 1) {
        // Start Pan
        setIsDragging(true);
        setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDist !== null) {
        // Handle Pinch Zoom
        const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (dist - touchDist) * 0.01;
        setScale(Math.min(Math.max(1, scale + delta), 4));
        setTouchDist(dist);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
        // Handle Pan
         const newX = e.touches[0].clientX - dragStart.x;
         const newY = e.touches[0].clientY - dragStart.y;
         setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDist(null);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
     e.stopPropagation();
     setScale(Math.min(scale + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
     e.stopPropagation();
     const newScale = Math.max(1, scale - 0.5);
     setScale(newScale);
     if (newScale === 1) setPosition({x: 0, y: 0});
  };

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden"
        onClick={onClose}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button 
            onClick={handleZoomIn} 
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Zoom In"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={handleZoomOut} 
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Zoom Out"
          >
            <MinusIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6" />
          </button>
      </div>
      
      <div 
        className="w-full h-full flex items-center justify-center p-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
            src={image} 
            alt="Full view" 
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-75 ease-out select-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (scale === 1) setScale(2);
            }}
            draggable={false}
        />
      </div>
      
      {/* Zoom hint */}
      {scale === 1 && (
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest pointer-events-none bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
             Scroll or Pinch to Zoom
         </div>
      )}
    </div>
  );
};

const ProjectOverlay: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-full md:h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Mock Browser Header */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer" aria-label="Close"></button>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="bg-white border border-slate-200 rounded px-3 py-1 text-xs text-slate-500 flex-1 mx-4 md:mx-12 text-center font-mono truncate">
            morphdesign.in/portfolio/{project.title.toLowerCase().replace(/\s/g, '-')}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Close project details">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto flex-1 bg-white content-auto">
          <div className="relative h-64 md:h-96">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block shadow-sm">
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold drop-shadow-md">{project.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Project Overview</h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  {project.description} This project showcases our design philosophy, 
                  combining aesthetics with functionality to create spaces that truly resonate with the inhabitants.
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mt-8">
                   <h4 className="font-bold text-slate-900 mb-3">Client Testimonial</h4>
                   <p className="italic text-slate-600">"The team exceeded our expectations. The design is not only beautiful but functional."</p>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="sticky top-8">
                   <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Key Features</h3>
                   <ul className="space-y-3">
                     {project.features.map((feature, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                         <CheckIcon className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                         {feature}
                       </li>
                     ))}
                   </ul>
                   <button className="w-full mt-8 bg-slate-900 text-white py-3 px-4 rounded-md font-bold text-sm hover:bg-slate-800 transition-colors">
                     Contact Us
                   </button>
                </div>
              </div>
            </div>

            {/* Sample Grid */}
            <div className="mt-16">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img 
                       src={`https://images.unsplash.com/photo-${i === 1 ? '1586023492125-27b2c045efd7' : i === 2 ? '1616486338812-3dadae4b4f9d' : '1618221195710-dd6b41faaea6'}?auto=format&fit=crop&w=400&q=80`}
                       className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 transform-gpu backface-hidden"
                       alt="Gallery"
                       loading="lazy"
                       decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioProps {
  onModalToggle?: (isOpen: boolean) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onModalToggle }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    onModalToggle?.(!!selectedProject || !!selectedImage);
    return () => onModalToggle?.(false);
  }, [selectedProject, selectedImage, onModalToggle]);

  const handleShare = async (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    
    const shareData = {
        title: project.title,
        text: `Check out ${project.title} by ${CONFIG.company.name}. ${project.description}`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            // User cancelled
        }
    } else {
        try {
            await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
            alert('Project details copied to clipboard!');
        } catch (err) {
            // Ignore
        }
    }
  };

  return (
    <div className="min-h-screen">
      {selectedProject && (
        <ProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
      
      {/* Projects Section */}
      <div className="pt-20 md:pt-24 lg:pt-28 pb-20 bg-slate-50/30">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Our Work</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3 font-display">
                    Featured Projects
                </h2>
                <p className="text-slate-500 text-base font-light">
                    Explore our completed interior projects. Click on any project to view the full case study.
                </p>
                </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                <div 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View project: ${project.title}`}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full border border-slate-100"
                >
                    <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu backface-hidden" 
                    />
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Project
                        </span>
                    </div>

                    {/* Share Button */}
                    <button 
                        onClick={(e) => handleShare(e, project)}
                        className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                        title="Share Project"
                        aria-label="Share"
                    >
                        <ShareIcon className="w-4 h-4" />
                    </button>
                    </div>
                    <div className="p-6 flex flex-col grow">
                    {/* Updated Category: Darker primary and added accent line */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-0.5 bg-primary-400 rounded-full"></div>
                        <div className="text-[11px] font-extrabold text-primary-700 uppercase tracking-widest">
                            {project.category}
                        </div>
                    </div>
                    
                    {/* Updated Title: Font display and color transition */}
                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
                        {project.title}
                    </h3>
                    
                    {/* Updated Description: Darker slate for better readability */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                        {project.description}
                    </p>
                    
                    {/* Updated Footer: Stronger call to action colors */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between group/link">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider group-hover/link:text-primary-700 transition-colors">
                            Read Case Study
                        </span>
                        <div className="bg-slate-50 p-2 rounded-full group-hover:bg-primary-50 transition-colors">
                             <ArrowRightIcon className="w-4 h-4 text-slate-900 group-hover:text-primary-600 transition-colors" />
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Visuals</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6 font-display">
                    On-Site Gallery
                    </h2>
                    <p className="text-slate-500 text-lg font-light">
                    A closer look at our installations and product applications in the real world.
                    </p>
                </div>
            </FadeIn>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map((img, idx) => (
                    <FadeIn key={idx} delay={idx * 50}>
                        <div 
                            className="relative group rounded-xl overflow-hidden cursor-pointer aspect-[4/3] bg-slate-100"
                            onClick={() => setSelectedImage(img)}
                            role="button"
                            aria-label={`View gallery image ${idx + 1}`}
                        >
                            <img 
                                src={img} 
                                alt={`Gallery ${idx + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30">
                                    <MaximizeIcon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 py-24 md:py-32 border-t border-slate-200">
          <div className="container mx-auto px-6">
          <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary-600 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Testimonials</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-display">
                  Trusted by global brands.
              </h2>
              </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 100}>
                  <TestimonialCard {...testimonial} />
              </FadeIn>
              ))}
          </div>
          </div>
      </section>
    </div>
  );
};

export default Portfolio;
