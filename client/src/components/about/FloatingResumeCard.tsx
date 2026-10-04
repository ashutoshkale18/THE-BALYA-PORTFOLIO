import React from 'react';
import { motion } from 'framer-motion';

interface FloatingResumeCardProps {
  name?: string;
  status?: string;
  year?: string;
}

export const FloatingResumeCard: React.FC<FloatingResumeCardProps> = ({
  name = "ARYAN NIKAM",
  status = "CREATIVE / AI VISUAL DEVELOPMENT",
  year = "2026"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-[310px] sm:max-w-[360px] md:max-w-[400px] border-2 border-[#00F000] bg-black/90 text-white p-3 sm:p-4 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,0,0.25)] select-none mx-auto lg:mx-0"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-[#00F000]/60 pb-2 mb-2.5 sm:mb-3">
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] text-[#00F000] font-bold">
          RESUME / {year}
        </span>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 bg-[#00F000] inline-block animate-ping rounded-full" />
          <span className="font-mono text-[9px] sm:text-[10px] text-[#00F000]/80 tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Portrait Box with Reticle HUD corners */}
      <div className="relative w-full aspect-4/3 bg-black overflow-hidden mb-2.5 sm:mb-3 border border-neutral-800">
        <img
          src="/assets/images/images-02.png"
          alt={name}
          className="w-full h-full object-cover object-top filter grayscale contrast-110"
        />

        {/* HUD Targeting Box Overlays */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F000]" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F000]" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00F000]" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00F000]" />

        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />
      </div>

      {/* Name & Status */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg sm:text-xl md:text-2xl text-white tracking-wide uppercase">
            {name}
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] text-[#00F000] font-bold">
            [SYS_OK]
          </span>
        </div>

        <p className="font-mono text-[10px] sm:text-xs text-[#00F000] tracking-wider uppercase">
          {status}
        </p>

        {/* Loading / Status Bar with Diagonal Stripes */}
        <div className="pt-1.5 sm:pt-2">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 mb-1">
            <span>STATUS</span>
            <span>OPTIMAL</span>
          </div>
          <div className="w-full h-2.5 sm:h-3 bg-black border border-[#00F000]/60 overflow-hidden relative">
            <div className="h-full w-full bg-hazard-stripes-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
