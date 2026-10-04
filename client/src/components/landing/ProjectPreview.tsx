import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProjectItem } from '../../data/portfolio';
import { staggerContainer, staggerChild, scaleIn, VIEWPORT_ONCE } from '../../utils/motion';

interface ProjectPreviewProps {
  project: ProjectItem;
  alignment: 'left' | 'right' | 'center';
  onOpenProject?: (project: ProjectItem) => void;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  project,
  alignment,
  onOpenProject
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force play the video programmatically — browsers can block autoPlay attribute
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented — video stays on poster frame, that's fine
      });
    }
  }, [project.video]);

  // Alignment classes for asymmetrical layout with clean mobile stacking
  const containerAlignment = {
    left: 'mr-auto w-full md:max-w-2xl lg:max-w-3xl',
    right: 'ml-auto w-full md:max-w-2xl lg:max-w-3xl',
    center: 'mx-auto w-full md:max-w-3xl lg:max-w-4xl'
  }[alignment];

  return (
    <motion.div
      className={`w-full ${containerAlignment} group mb-14 sm:mb-20 md:mb-28`}
      variants={staggerContainer(0.12, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {/* Project Media Container — scroll-triggered scale-in */}
      <motion.div
        variants={scaleIn}
        onClick={() => onOpenProject?.(project)}
        className="relative overflow-hidden bg-black cursor-pointer rounded-xs aspect-video group/media"
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.image}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Video Badge indicator */}
        {project.video && (
          <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 bg-black/80 border border-[#00F000]/60 px-2 py-1">
            <span className="w-1.5 h-1.5 bg-[#00F000] rounded-full animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] text-[#00F000] font-bold tracking-widest uppercase">
              MOTION REEL
            </span>
          </div>
        )}

        {/* Hover overlay with VIEW PROJECT button */}
        <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover/media:bg-black/30 items-center justify-center transition-colors duration-300 z-10">
          <span className="bg-[#00F000] text-[#080808] px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold shadow-lg opacity-0 group-hover/media:opacity-100 translate-y-2 group-hover/media:translate-y-0 transition-all duration-300">
            VIEW PROJECT ↗
          </span>
        </div>
      </motion.div>

      {/* Project Meta Information — staggered */}
      <motion.div variants={staggerChild} className="mt-4 sm:mt-5 space-y-1">
        <div
          onClick={() => onOpenProject?.(project)}
          className="flex items-start justify-between cursor-pointer group/title"
        >
          <motion.h3
            className="font-work text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#080808] uppercase tracking-tight group-hover/title:text-[#00F000] transition-colors font-bold"
          >
            {project.title}
          </motion.h3>
          <span className="sm:hidden font-mono text-xs text-[#00F000] bg-[#080808] px-2 py-1 uppercase tracking-wider font-bold ml-2 flex-shrink-0">
            VIEW ↗
          </span>
        </div>
        <p className="font-mono text-xs sm:text-sm md:text-base text-neutral-600">
          {project.category}
        </p>
        {project.description && (
          <p className="font-body text-xs sm:text-sm text-neutral-500 max-w-2xl pt-1 leading-relaxed">
            {project.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};
