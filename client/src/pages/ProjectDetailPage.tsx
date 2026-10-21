import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { FooterStrip } from '../components/common/FooterStrip';
import { NotFoundPage } from './NotFoundPage';
import type { ProjectItem, GalleryItem } from '../data/portfolio';
import { scaleIn, VIEWPORT_ONCE } from '../utils/motion';

/** Builds a fallback gallery from the main media if project has none */
function getProjectGallery(project: ProjectItem): GalleryItem[] {
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery;
  }
  const items: GalleryItem[] = [];
  if (project.video) {
    items.push({
      type: 'video',
      src: project.video,
      poster: project.image,
      label: '01 — Primary Reel'
    });
  }
  items.push({
    type: 'image',
    src: project.image,
    label: `${String(items.length + 1).padStart(2, '0')} — Key Visual`
  });
  return items;
}

/** Auto-pausing gallery video component */
const GalleryVideoPlayer: React.FC<{
  src: string;
  poster?: string;
  label?: string;
}> = ({ src, poster, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause video when it scrolls out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black border border-neutral-800 rounded-xs overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-contain bg-black"
      />
      {label && (
        <div className="absolute top-2 left-2 z-10 pointer-events-none bg-black/85 border border-[#00F000]/40 px-2 py-0.5">
          <span className="font-mono text-[9px] sm:text-[10px] text-[#00F000] tracking-wider uppercase font-bold">
            ▶ {label}
          </span>
        </div>
      )}
    </div>
  );
};

interface ProjectDetailPageProps {
  projects: ProjectItem[];
  onNavigate?: (route: 'landing' | 'about' | 'work') => void;
}

/**
 * Backward-compatible slug redirects.
 * Maps old/renamed slugs → current canonical slugs so existing bookmarks
 * and any external links still resolve correctly.
 */
const SLUG_REDIRECTS: Record<string, string> = {
  'abby-zoozoo': 'abby-zoozoo-youtube-channel',
  'flipkart-bachat-utsav': 'flipkart-nachoo-nachoo',
  'aws-book-screening-mahishasura': 'aws-mahishasura',
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projects, onNavigate }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // CRT Scanlines state toggle (active by default for retro CRT terminal atmosphere)
  const [crtEnabled, setCrtEnabled] = useState(true);

  // Lightbox modal state for gallery images
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Live timecode generator for CRT retro broadcast realism
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [bootSequence, setBootSequence] = useState('INITIALIZING ARCHIVE FEED...');

  // Resolve redirect for renamed slugs, then look up the project
  const canonicalSlug = slug ? (SLUG_REDIRECTS[slug] ?? slug) : slug;
  const project = projects.find((p) => p.slug === canonicalSlug);

  // Redirect old slugs to canonical URL so browser history & address bar stay correct
  useEffect(() => {
    if (slug && SLUG_REDIRECTS[slug]) {
      navigate(`/work/${SLUG_REDIRECTS[slug]}`, { replace: true });
    }
  }, [slug, navigate]);

  // Timecode animation clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 41); // ~24 fps update rate

    return () => clearInterval(interval);
  }, []);

  // Boot sequence simulation on slug change
  useEffect(() => {
    if (!project) return;
    const t0 = setTimeout(() => {
      setBootSequence(`SIGNAL LOCKED // DECODING TELEMETRY`);
    }, 500);
    const t1 = setTimeout(() => {
      setBootSequence(`BROADCAST READY // ${project.category.toUpperCase()}`);
    }, 1100);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [project]);

  // Previous & Next navigation calculations using canonical slug
  const currentIndex = projects.findIndex((p) => p.slug === canonicalSlug);
  const totalProjects = projects.length;
  const prevProject =
    totalProjects > 0 ? projects[(currentIndex - 1 + totalProjects) % totalProjects] : null;
  const nextProject =
    totalProjects > 0 ? projects[(currentIndex + 1) % totalProjects] : null;

  // More works (other projects excluding current)
  const moreProjects = projects.filter((p) => p.slug !== canonicalSlug).slice(0, 3);

  // Lightbox keyboard navigation
  const gallery = project ? getProjectGallery(project) : [];
  const handleNextLightbox = useCallback(() => {
    if (activeLightboxIndex === null || gallery.length === 0) return;
    setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
  }, [activeLightboxIndex, gallery.length]);

  const handlePrevLightbox = useCallback(() => {
    if (activeLightboxIndex === null || gallery.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0
    );
  }, [activeLightboxIndex, gallery.length]);

  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNextLightbox, handlePrevLightbox]);

  // If slug is not found after redirect resolution, show 404
  if (!project) {
    return <NotFoundPage attemptedSlug={slug} onNavigate={onNavigate} />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-[#080808] text-[#F4F4F2] selection:bg-[#00F000] selection:text-[#080808] relative">
      {/* ── CRT Retro Phosphor Scanlines Overlay (Toggleable) ── */}
      {crtEnabled && (
        <div
          className="crt-scanlines fixed inset-0 z-40 pointer-events-none opacity-45"
          aria-hidden="true"
        />
      )}

      {/* ── Top Global Navigation ── */}
      <header className="relative z-30 w-full border-b border-neutral-900 bg-[#080808]/95 backdrop-blur-sm">
        <Navbar currentRoute="work" onNavigate={onNavigate} darkHero={true} />
      </header>

      {/* ── Sub-header: CRT Terminal Status & Telemetry Bar ── */}
      <div className="w-full border-b border-[#00F000]/25 bg-neutral-950/90 px-4 sm:px-8 lg:px-12 py-2.5 z-20 sticky top-0 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          {/* Left: Back to Works link */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('work');
                else navigate('/work');
              }}
              className="group flex items-center space-x-2 text-white hover:text-[#00F000] transition-colors cursor-pointer py-1"
              aria-label="Back to all works"
            >
              <span className="text-[#00F000] group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span className="font-bold tracking-widest uppercase text-[11px] sm:text-xs">
                INDEX // WORKS
              </span>
            </button>

            <span className="text-neutral-700 hidden sm:inline">|</span>

            {/* Project ID Tag */}
            <span className="hidden sm:inline text-neutral-400 text-[11px]">
              PRJ://{project.num}.{project.slug}
            </span>
          </div>

          {/* Center: Boot Sequence Diagnostic */}
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-[#00F000] font-mono crt-phosphor-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F000] animate-pulse" />
            <span className="truncate max-w-[320px]">{bootSequence}</span>
          </div>

          {/* Right: Live Timecode & CRT Overlay Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1.5 text-neutral-300 font-mono text-[11px] sm:text-xs">
              <span className="text-[#00F000] font-bold">REC ●</span>
              <span className="tracking-widest">{timecode}</span>
            </div>

            {/* CRT Scanline Toggle Button */}
            <button
              onClick={() => setCrtEnabled(!crtEnabled)}
              className={`px-2 py-0.5 border text-[10px] sm:text-[11px] font-mono tracking-wider font-bold transition-all cursor-pointer ${crtEnabled
                  ? 'border-[#00F000] text-[#00F000] bg-[#00F000]/10 crt-phosphor-glow'
                  : 'border-neutral-700 text-neutral-400 hover:text-white'
                }`}
              title="Toggle Retro CRT Scanlines"
            >
              CRT: {crtEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Project Detail Content ── */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 md:py-20 flex-1 relative z-20">
        {/* ── SECTION 1: EDITORIAL HEADER & TITLE ── */}
        <section className="mb-8 sm:mb-14">
          {/* Telemetry pill metadata */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 font-mono text-[10px] sm:text-xs">
            <span className="bg-[#00F000] text-[#080808] px-2.5 py-1 font-bold tracking-widest uppercase">
              PROJECT {project.num}
            </span>
            <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 px-2.5 py-1 uppercase tracking-wider">
              {project.category}
            </span>
            {project.year && (
              <span className="bg-neutral-900 border border-neutral-700 text-neutral-400 px-2.5 py-1 tracking-wider">
                YEAR // {project.year}
              </span>
            )}
            {project.client && (
              <span className="bg-neutral-900 border border-neutral-700 text-neutral-400 px-2.5 py-1 tracking-wider hidden sm:inline">
                CLIENT // {project.client}
              </span>
            )}
          </div>

          {/* Oversized Editorial Project Title */}
          <h1 className="font-work text-[clamp(2.75rem,8.5vw,7.8rem)] leading-[0.88] tracking-tight uppercase text-white font-bold break-words">
            {project.title}
          </h1>
        </section>

        {/* ── SECTION 2: CINEMATIC HERO MEDIA ── */}
        <section className="mb-12 sm:mb-20 md:mb-28">
          <div className="relative w-full aspect-video bg-black border border-[#00F000]/40 rounded-xs overflow-hidden crt-box-glow">
            {/* Terminal Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00F000] z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00F000] z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00F000] z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00F000] z-20 pointer-events-none" />

            {/* CRT sweeping scan bar */}
            <div className="crt-scanbar" aria-hidden="true" />

            {project.video ? (
              <video
                src={project.video}
                poster={project.image}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover sm:object-contain bg-black"
              />
            ) : (
              <img
                src={project.image}
                alt={`${project.title} — Main visual`}
                className="w-full h-full object-cover sm:object-contain bg-black"
                fetchPriority="high"
              />
            )}

            {/* Top-right resolution & video indicator */}
            <div className="absolute top-3 right-3 z-10 pointer-events-none hidden sm:flex items-center space-x-2 bg-black/85 border border-[#00F000]/40 px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F000] animate-pulse" />
              <span className="font-mono text-[10px] text-[#00F000] font-bold tracking-widest uppercase">
                {project.video ? 'CINEMATIC 4K MOTION' : 'KEY PRODUCTION ART'}
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: HYBRID EDITORIAL + CRT METADATA GRID ── */}
        <section className="mb-16 sm:mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-start">
            {/* Left Column: Editorial Description & Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#00F000] tracking-widest uppercase">
                <span>[01]</span>
                <span>PROJECT NARRATIVE & CONCEPT</span>
              </div>

              <p className="font-body text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-normal">
                {project.description}
              </p>

              {project.creativeDirection && (
                <div className="pt-4 border-t border-neutral-800">
                  <span className="font-mono text-xs text-neutral-400 block mb-2 uppercase tracking-wider">
                    CREATIVE DIRECTION & EXECUTION:
                  </span>
                  <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {project.creativeDirection}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: CRT Monospace Telemetry Card */}
            <div className="lg:col-span-5 bg-neutral-950 border border-[#00F000]/30 p-6 sm:p-8 rounded-xs font-mono text-xs space-y-4 crt-box-glow relative">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00F000]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00F000]" />

              <div className="border-b border-[#00F000]/30 pb-3 flex items-center justify-between text-[#00F000]">
                <span className="font-bold tracking-widest crt-phosphor-glow">
                  {project.slug === 'adhantar-short-film' ? 'ADHANTAR' : project.title}
                </span>
                <span className="text-[10px] text-neutral-500">FORMAT: VIDEO</span>
              </div>

              <div className="space-y-4 divide-y divide-neutral-900">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">[CLIENT]</span>
                  <span className="text-white text-right">{project.client || 'INDEPENDENT / LAB'}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-neutral-500">[DISCIPLINE]</span>
                  <span className="text-[#00F000] text-right font-bold">{project.category}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-neutral-500">[YEAR]</span>
                  <span className="text-white">{project.year || '2026'}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-neutral-500">[STATUS]</span>
                  <span className="text-emerald-400 font-bold">● ARCHIVED & VERIFIED</span>
                </div>

                {project.link && project.link !== '#' && (
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-neutral-500">[EXTERNAL_REF]</span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00F000] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>LAUNCH LINK</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: RESPONSIVE MEDIA GALLERY ── */}
        <section className="mb-20 sm:mb-28 md:mb-36">
          <div className="border-t border-neutral-800 pt-8 sm:pt-12 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-[#00F000] tracking-widest uppercase mb-2">
                <span>[02]</span>
                <span>PROJECT ASSETS ARCHIVE</span>
              </div>
              <h2 className="font-work text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white font-bold">
                GALLERY & PRODUCTION MEDIA
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              TELEMETRY: {gallery.length} ASSET{gallery.length === 1 ? '' : 'S'} LOADED
            </span>
          </div>

          {/* Dynamic Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {gallery.map((item, index) => {
              // Asymmetrical responsive layout:
              // - 1st item (if total > 2): wide 12-col hero or 8-col
              // - every 3rd item: 12-col full width for cinematic impact
              // - other items: 6-col split pairs
              const isFullWidth = gallery.length > 2 && index % 4 === 0;
              const colSpanClass = isFullWidth
                ? 'lg:col-span-12'
                : 'lg:col-span-6';

              return (
                <motion.div
                  key={`${item.src}-${index}`}
                  className={`${colSpanClass} group relative`}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                >
                  {item.type === 'video' ? (
                    <GalleryVideoPlayer
                      src={item.src}
                      poster={item.poster || project.image}
                      label={item.label}
                    />
                  ) : (
                    <figure className="relative w-full aspect-video bg-neutral-950 border border-neutral-800 hover:border-[#00F000]/60 transition-colors rounded-xs overflow-hidden cursor-pointer">
                      <img
                        src={item.src}
                        alt={`${project.title} — ${item.label || `Visual ${index + 1}`}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                        decoding="async"
                        onClick={() => setActiveLightboxIndex(index)}
                      />

                      {/* Hover overlay hint */}
                      <div
                        onClick={() => setActiveLightboxIndex(index)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
                      >
                        <span className="bg-[#00F000] text-[#080808] font-mono text-[11px] font-bold px-3 py-1 uppercase tracking-widest">
                          INSPECT FRAME ↗
                        </span>
                      </div>

                      {/* Label caption */}
                      {item.label && (
                        <figcaption className="absolute bottom-2 left-2 z-10 bg-black/85 border border-neutral-700 px-2 py-0.5">
                          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-300 font-bold uppercase tracking-wider">
                            {item.label}
                          </span>
                        </figcaption>
                      )}
                    </figure>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 5: PREVIOUS / NEXT PROJECT NAVIGATION ── */}
        <section className="border-t border-b border-neutral-800 py-10 sm:py-16 my-12 sm:my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Previous Project Card */}
            {prevProject && (
              <Link
                to={`/work/${prevProject.slug}`}
                className="group p-5 sm:p-7 bg-neutral-950 border border-neutral-800 hover:border-[#00F000] transition-all rounded-xs flex items-center space-x-4 sm:space-x-6 crt-glitch-hover"
              >
                {/* Thumbnail */}
                <div className="w-20 sm:w-28 h-14 sm:h-20 bg-black flex-shrink-0 overflow-hidden border border-neutral-800 group-hover:border-[#00F000] transition-colors rounded-xs">
                  <img
                    src={prevProject.image}
                    alt={prevProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs text-[#00F000] uppercase tracking-wider block font-bold mb-1">
                    ← PREVIOUS PROJECT [{prevProject.num}]
                  </span>
                  <h4 className="font-work text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight truncate group-hover:text-[#00F000] transition-colors">
                    {prevProject.title}
                  </h4>
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-400 block truncate">
                    {prevProject.category}
                  </span>
                </div>
              </Link>
            )}

            {/* Next Project Card */}
            {nextProject && (
              <Link
                to={`/work/${nextProject.slug}`}
                className="group p-5 sm:p-7 bg-neutral-950 border border-neutral-800 hover:border-[#00F000] transition-all rounded-xs flex items-center justify-between space-x-4 sm:space-x-6 crt-glitch-hover"
              >
                <div className="flex-1 min-w-0 text-left">
                  <span className="font-mono text-[10px] sm:text-xs text-[#00F000] uppercase tracking-wider block font-bold mb-1">
                    NEXT PROJECT [{nextProject.num}] →
                  </span>
                  <h4 className="font-work text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight truncate group-hover:text-[#00F000] transition-colors">
                    {nextProject.title}
                  </h4>
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-400 block truncate">
                    {nextProject.category}
                  </span>
                </div>
                {/* Thumbnail */}
                <div className="w-20 sm:w-28 h-14 sm:h-20 bg-black flex-shrink-0 overflow-hidden border border-neutral-800 group-hover:border-[#00F000] transition-colors rounded-xs">
                  <img
                    src={nextProject.image}
                    alt={nextProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* ── SECTION 6: MORE PROJECTS ARCHIVE STRIP ── */}
        {moreProjects.length > 0 && (
          <section className="mb-14 sm:mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-work text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white font-bold">
                EXPLORE MORE ARCHIVES
              </h3>
              <Link
                to="/work"
                className="font-mono text-xs text-[#00F000] hover:underline uppercase tracking-wider"
              >
                VIEW COMPLETE INDEX ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/work/${p.slug}`}
                  className="group block bg-neutral-950 border border-neutral-800 hover:border-[#00F000] p-4 rounded-xs transition-colors"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black mb-3 border border-neutral-800">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 bg-[#00F000] text-[#080808] font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase">
                      {p.num}
                    </span>
                  </div>
                  <h4 className="font-work text-xl uppercase tracking-tight text-white group-hover:text-[#00F000] transition-colors truncate">
                    {p.title}
                  </h4>
                  <p className="font-mono text-[11px] text-neutral-400 truncate">
                    {p.category}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── IMAGE LIGHTBOX MODAL (Image Inspection Only) ── */}
      <AnimatePresence>
        {activeLightboxIndex !== null && gallery[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Top Lightbox Bar */}
            <div
              className="w-full flex items-center justify-between border-b border-[#00F000]/40 pb-3 font-mono text-xs z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 text-[#00F000]">
                <span className="w-2 h-2 rounded-full bg-[#00F000] animate-pulse" />
                <span className="font-bold crt-phosphor-glow">
                  FRAME INSPECT // {String(activeLightboxIndex + 1).padStart(2, '0')} OF {String(gallery.length).padStart(2, '0')}
                </span>
                <span className="text-neutral-400 hidden sm:inline">
                  {gallery[activeLightboxIndex].label || project.title}
                </span>
              </div>

              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="px-3 py-1 bg-[#00F000] text-[#080808] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
              >
                CLOSE [ESC] ✕
              </button>
            </div>

            {/* Center Image / Media */}
            <div
              className="flex-1 flex items-center justify-center my-4 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery[activeLightboxIndex].type === 'video' ? (
                <video
                  src={gallery[activeLightboxIndex].src}
                  controls
                  playsInline
                  autoPlay
                  className="max-h-[80vh] max-w-full object-contain"
                />
              ) : (
                <img
                  src={gallery[activeLightboxIndex].src}
                  alt={gallery[activeLightboxIndex].label || project.title}
                  className="max-h-[82vh] max-w-full object-contain shadow-2xl"
                />
              )}
            </div>

            {/* Bottom Controls */}
            <div
              className="w-full flex items-center justify-between border-t border-neutral-800 pt-3 font-mono text-xs z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handlePrevLightbox}
                className="px-3 py-1.5 border border-neutral-700 hover:border-[#00F000] text-white hover:text-[#00F000] transition-colors cursor-pointer"
              >
                ← PREV FRAME
              </button>

              <span className="text-neutral-500 text-[11px] hidden sm:inline">
                USE ARROW KEYS OR BUTTONS TO NAVIGATE
              </span>

              <button
                onClick={handleNextLightbox}
                className="px-3 py-1.5 border border-neutral-700 hover:border-[#00F000] text-white hover:text-[#00F000] transition-colors cursor-pointer"
              >
                NEXT FRAME →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER STRIP WITH HAZARD STRIPES & SOCIALS ── */}
      <FooterStrip />
    </div>
  );
};
