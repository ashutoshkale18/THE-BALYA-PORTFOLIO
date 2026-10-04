import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ProjectItem, GalleryItem } from '../../data/portfolio';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Build the gallery for a project, falling back to a single image if none defined */
function buildGallery(project: ProjectItem): GalleryItem[] {
  if (project.gallery && project.gallery.length > 0) return project.gallery;
  const items: GalleryItem[] = [];
  if (project.video) {
    items.push({ type: 'video', src: project.video, poster: project.image, label: '01 — Film' });
  }
  items.push({ type: 'image', src: project.image, label: `${String(items.length + 1).padStart(2, '0')} — Visual` });
  return items;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

// ─── VideoPlayer ─────────────────────────────────────────────────────────────

interface VideoPlayerProps {
  item: GalleryItem;
  active: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, active }) => {
  const ref = useRef<HTMLVideoElement>(null);

  // Pause when gallery navigates away
  useEffect(() => {
    if (!active && ref.current) {
      ref.current.pause();
    }
  }, [active]);

  // Pause when modal unmounts
  useEffect(() => {
    return () => {
      ref.current?.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      controls
      playsInline
      preload="metadata"
      className="w-full h-full object-contain"
      // prevent cursor click propagation going to gallery nav
      onClick={(e) => e.stopPropagation()}
    />
  );
};

// Custom cursor removed — using default browser cursor

// ─── ProjectModal ─────────────────────────────────────────────────────────────

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Detect touch (used for arrow visibility only)
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Reset gallery index when project changes
  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [project?.id]);

  const gallery = project ? buildGallery(project) : [];
  const total = gallery.length;
  const current = gallery[index];

  const goNext = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Click left/right half to navigate (no custom cursor, just normal pointer)
  const handleGalleryClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore clicks on native video controls region (bottom ~80px of video)
    if (current?.type === 'video') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const y = e.clientY - rect.top;
      if (y > rect.height - 80) return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goPrev();
    else goNext();
  }, [goPrev, goNext, current]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      // Don't override typing inside video controls
      if ((e.target as HTMLElement).tagName === 'VIDEO') return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, goNext, goPrev, onClose]);

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-sm p-3 sm:p-6 md:p-8"
        onClick={onClose}
      >
        {/* Modal box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#080808] border-2 border-[#00F000] text-white max-w-4xl w-full relative max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── HEADER ── */}
          <div className="flex justify-between items-start px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 mb-4 sm:mb-5 gap-4">
            <div>
              <span className="font-mono text-xs text-[#00F000] tracking-widest uppercase">
                {project.num} // {project.category} {project.year ? `// ${project.year}` : ''}
              </span>
              <h3 className="font-work text-2xl sm:text-4xl md:text-5xl uppercase mt-1 leading-tight font-bold">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-neutral-400 hover:text-[#00F000] text-2xl p-1 cursor-pointer transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* ── GALLERY AREA ── */}
          <div className="relative w-full bg-black overflow-hidden">

            {/* Media slides */}
            <div
              ref={galleryRef}
              className="relative w-full aspect-video overflow-hidden cursor-pointer group/gallery"
              onClick={handleGalleryClick}
            >
              <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                <motion.div
                  key={`${project.id}-${index}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {current?.type === 'video' ? (
                    <VideoPlayer item={current} active={true} />
                  ) : (
                    <img
                      src={current?.src}
                      alt={current?.label || project.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── PREV / NEXT ARROWS ── */}
              {total > 1 && (
                <>
                  {/* Prev */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    aria-label="Previous"
                    className={`
                      absolute left-0 top-0 h-full w-14 sm:w-16 flex items-center justify-center
                      bg-gradient-to-r from-black/70 to-transparent z-20
                      transition-opacity duration-200
                      ${isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover/gallery:opacity-100 hover:!opacity-100'}
                    `}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="text-white hover:text-[#00F000] font-mono text-3xl sm:text-4xl transition-colors select-none">
                      ‹
                    </span>
                  </button>

                  {/* Next */}
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    aria-label="Next"
                    className={`
                      absolute right-0 top-0 h-full w-14 sm:w-16 flex items-center justify-center
                      bg-gradient-to-l from-black/70 to-transparent z-20
                      transition-opacity duration-200
                      ${isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover/gallery:opacity-100 hover:!opacity-100'}
                    `}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="text-white hover:text-[#00F000] font-mono text-3xl sm:text-4xl transition-colors select-none">
                      ›
                    </span>
                  </button>
                </>
              )}

              {/* ── MEDIA INDEX + LABEL ── */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-4 py-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                <span className="font-mono text-[10px] sm:text-xs text-neutral-300 tracking-widest uppercase truncate mr-2">
                  {current?.label}
                </span>
                {total > 1 && (
                  <span className="font-mono text-[10px] sm:text-xs text-[#00F000] font-bold tracking-widest flex-shrink-0">
                    {pad(index + 1)} / {pad(total)}
                  </span>
                )}
              </div>
            </div>

            {/* ── THUMBNAIL STRIP ── */}
            {total > 1 && (
              <div className="flex gap-1 sm:gap-1.5 px-4 sm:px-6 py-2 sm:py-3 bg-[#0a0a0a] border-t border-neutral-900 overflow-x-auto scrollbar-none">
                {gallery.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    aria-label={`Go to ${item.label}`}
                    className={`relative flex-shrink-0 h-9 sm:h-12 aspect-video overflow-hidden border transition-all duration-200 ${
                      i === index
                        ? 'border-[#00F000] opacity-100'
                        : 'border-neutral-800 opacity-40 hover:opacity-70 hover:border-neutral-600'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <>
                        <img src={item.poster || ''} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="text-[#00F000] text-xs">▶</span>
                        </div>
                      </>
                    ) : (
                      <img src={item.src} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── BODY ── */}
          <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 mt-4 sm:mt-5">
            <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-neutral-800">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                Client: {project.client || 'Creative Commission'}
              </span>
              <button
                onClick={onClose}
                className="min-h-[44px] bg-[#00F000] text-[#080808] px-6 py-2 font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-colors cursor-pointer self-end sm:self-auto"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
