import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate: (route: 'landing' | 'about' | 'work') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee programmatic autoplay across all browsers (including iOS Safari and low-power modes)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, poster remains visible gracefully
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] sm:min-h-[640px] md:min-h-[720px] flex flex-col justify-between overflow-hidden bg-[#080808]">
      {/* ── Background Cinematic Video Banner ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/assets/landing/landing_page_banner.mp4"
          poster="/assets/landing/landing_banner_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-90 contrast-[1.05]"
        />

        {/* Multi-layer calibrated contrast overlays for maximum readability:
            1. Global dark scrim to temper bright highlights */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* 2. Top-down gradient for razor-sharp navigation legibility */}
        <div className="absolute top-0 left-0 right-0 h-44 sm:h-52 bg-gradient-to-b from-black/85 via-black/50 to-transparent pointer-events-none" />

        {/* 3. Bottom-up gradient for oversized brand typography and scroll CTA */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-96 bg-gradient-to-t from-[#080808] via-black/75 to-transparent pointer-events-none" />

        {/* 4. Subtle radial vignette around viewport edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.65)_100%)] pointer-events-none" />
      </motion.div>

      {/* ── Top Floating Navigation ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-30 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 md:pt-6 flex items-center justify-between"
      >
        {/* About Link */}
        <button
          onClick={() => onNavigate('about')}
          className="min-h-[44px] min-w-[44px] px-3 py-2 flex items-center font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-white hover:text-[#00F000] uppercase font-bold transition-all duration-200 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95"
        >
          ABOUT
        </button>

        {/* Brand Home Mark */}
        <button
          onClick={() => onNavigate('landing')}
          className="min-h-[44px] px-3 sm:px-5 py-1.5 flex items-center font-work text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] text-white uppercase hover:text-[#00F000] transition-all duration-200 cursor-pointer drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
        >
          THE BALYA
        </button>

        {/* Work Link */}
        <button
          onClick={() => onNavigate('work')}
          className="min-h-[44px] min-w-[44px] px-3 py-2 flex items-center justify-end font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-white hover:text-[#00F000] uppercase font-bold transition-all duration-200 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95"
        >
          WORK
        </button>
      </motion.nav>

      {/* ── Center/Supporting Tagline in High-Contrast Frosted Glass Capsule ── */}
      <div className="relative z-20 w-full text-center px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="inline-flex items-center gap-x-2 sm:gap-x-3 gap-y-1 flex-wrap justify-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-black/65 backdrop-blur-md border border-white/20 shadow-2xl"
        >
          <span className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.22em] text-white font-semibold uppercase">
            AI
          </span>
          <span className="text-[#00F000] font-mono font-bold text-xs sm:text-sm">/</span>
          <span className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.22em] text-white font-semibold uppercase">
            MOTION
          </span>
          <span className="text-[#00F000] font-mono font-bold text-xs sm:text-sm">/</span>
          <span className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.22em] text-white font-semibold uppercase">
            VISUAL STORYTELLING
          </span>
        </motion.div>
      </div>

      {/* ── Bottom Hero Oversized Typography "THE BALYA ®" ── */}
      <div className="relative z-20 w-full pb-3 sm:pb-6 md:pb-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center px-2 sm:px-4 overflow-hidden"
        >
          <h1 className="font-work text-[clamp(2.75rem,14vw,14rem)] leading-[0.82] tracking-tight text-white uppercase select-none drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)] whitespace-nowrap">
            THE BALYA<span className="font-sans text-[0.32em] align-top ml-1 text-white/90">®</span>
          </h1>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-2 sm:mt-4 flex flex-col items-center gap-1 cursor-pointer group p-1"
          onClick={() => {
            const marquee = document.getElementById('brand-marquee');
            marquee?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-white/75 uppercase group-hover:text-[#00F000] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            SCROLL TO EXPLORE
          </span>
          <span className="text-[#00F000] text-xs sm:text-sm animate-bounce font-mono">↓</span>
        </motion.div>
      </div>
    </section>
  );
};
