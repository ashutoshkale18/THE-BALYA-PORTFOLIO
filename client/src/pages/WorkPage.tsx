import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { SocialLinks } from '../components/common/SocialLinks';
import { ProjectModal } from '../components/common/ProjectModal';
import type { ProjectItem } from '../data/portfolio';

// Reusable video component that guarantees autoplay across browsers
const AutoPlayVideo: React.FC<{
  src: string;
  poster: string;
  className?: string;
  controls?: boolean;
}> = ({ src, poster, className = '', controls = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || controls) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — poster frame shown, acceptable fallback
      });
    }
  }, [src, controls]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={!controls}
      loop={!controls}
      muted={!controls}
      playsInline
      controls={controls}
      preload={controls ? 'auto' : 'metadata'}
      className={className}
    />
  );
};

interface WorkPageProps {
  projects: ProjectItem[];
  onNavigate: (route: 'landing' | 'about' | 'work') => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ projects, onNavigate }) => {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for floating preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-white text-[#080808] relative">
      {/* SECTION 1 — NAVIGATION */}
      <Navbar currentRoute="work" onNavigate={onNavigate} darkHero={false} />

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex-1 py-6 sm:py-12 md:py-16">
        
        {/* SECTION 2 — OVERSIZED WORK HEADING */}
        <div className="w-full text-center py-2 sm:py-6 md:py-8 select-none overflow-hidden">
          <h1 className="font-work text-[clamp(5.5rem,24vw,19rem)] leading-[0.78] tracking-[-0.03em] font-bold text-[#080808] uppercase">
            WORK
          </h1>
        </div>

        {/* SECTION 3 — PROJECT INDEX */}
        <div className="w-full border-t border-neutral-300 mt-4 sm:mt-8 md:mt-12 section-lazy">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              className="group w-full py-5 sm:py-7 md:py-9 border-b border-neutral-300 flex flex-col lg:flex-row lg:items-center justify-between cursor-pointer transition-colors duration-200 hover:border-[#080808]"
            >
              {/* Project Number + Title */}
              <div className="flex items-center space-x-3 sm:space-x-6 md:space-x-8 pr-2">
                <span className="font-mono text-xs sm:text-sm md:text-base text-neutral-400 group-hover:text-[#00F000] transition-colors font-bold min-w-[24px]">
                  {project.num}
                </span>
                <h3 className="font-work text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-[#080808] group-hover:text-[#00F000] group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-200">
                  {project.title}
                </h3>
              </div>

              {/* Mobile & Tablet Inline Preview (<1024px touch devices) */}
              <div className="lg:hidden mt-3 mb-2 flex items-center gap-3">
                <div className="w-28 sm:w-44 h-18 sm:h-24 overflow-hidden bg-black border border-neutral-300 rounded-xs flex-shrink-0 relative">
                  {project.video ? (
                    <AutoPlayVideo
                      src={project.video}
                      poster={project.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {project.video && (
                    <span className="absolute bottom-1 right-1 bg-[#00F000] text-[#080808] font-mono text-[8px] font-bold px-1 uppercase">
                      VIDEO
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[11px] sm:text-xs text-[#00F000] font-bold uppercase tracking-wider bg-[#080808] px-2 py-0.5 self-start">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="font-mono text-[10px] sm:text-xs text-neutral-500 mt-1">
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Open Link Indicator */}
              <div className="flex items-center space-x-2 flex-shrink-0 self-end lg:self-center mt-1 lg:mt-0">
                <span className="font-mono text-xs sm:text-sm text-neutral-500 group-hover:text-[#080808] lowercase tracking-wide transition-colors duration-200">
                  open link
                </span>
                <span className="text-neutral-400 group-hover:text-[#00F000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 font-mono text-base">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* SECTION 4 — DESKTOP FLOATING HOVER PREVIEW (Desktop Only >= 1024px) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden lg:block fixed pointer-events-none z-40 w-80 xl:w-96 rounded-sm overflow-hidden bg-black shadow-2xl border border-[#00F000]/60"
            style={{
              left: `${Math.min(mousePos.x + 24, window.innerWidth - 420)}px`,
              top: `${Math.min(mousePos.y - 120, window.innerHeight - 300)}px`,
            }}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {hoveredProject.video ? (
                <AutoPlayVideo
                  src={hoveredProject.video}
                  poster={hoveredProject.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00F000] tracking-widest uppercase font-bold">
                  {hoveredProject.video ? '▶ ' : ''}{hoveredProject.category}
                </span>
                <span className="font-mono text-[10px] text-white/80">
                  {hoveredProject.year}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Project Detail Modal — multi-media gallery */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* SECTION 5 — FOOTER */}
      <div className="w-full h-14 sm:h-16 bg-[#00F000] flex items-center justify-between px-4 sm:px-8 lg:px-12 relative overflow-hidden mt-14 sm:mt-20">
        <div className="w-[110px] sm:w-[180px] md:w-[260px] h-full absolute left-0 top-0 overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="work-page-stripes" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                <rect width="32" height="32" fill="#00F000" />
                <rect width="10" height="32" fill="#080808" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#work-page-stripes)" />
          </svg>
        </div>
        <div />
        <div className="relative z-10">
          <SocialLinks sizeClass="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" variant="dark" />
        </div>
      </div>
    </div>
  );
};
