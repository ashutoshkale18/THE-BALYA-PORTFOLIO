import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { FooterStrip } from '../components/common/FooterStrip';
import { pageEnter } from '../utils/motion';

interface NotFoundPageProps {
  onNavigate?: (route: 'landing' | 'about' | 'work') => void;
  attemptedSlug?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, attemptedSlug }) => {
  const navigate = useNavigate();

  const handleReturnToWork = () => {
    if (onNavigate) onNavigate('work');
    else navigate('/work');
  };

  const handleReturnHome = () => {
    if (onNavigate) onNavigate('landing');
    else navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-[#080808] text-white selection:bg-[#00F000] selection:text-[#080808] relative overflow-hidden">
      {/* Subtle CRT scanline overlay */}
      <div className="crt-scanlines fixed inset-0 z-40 pointer-events-none opacity-40" />

      {/* Navigation */}
      <div className="relative z-30 w-full border-b border-neutral-800">
        <Navbar darkHero={true} onNavigate={onNavigate} />
      </div>

      {/* Main Terminal 404 Content */}
      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-12 sm:py-20 flex-1 flex flex-col justify-center relative z-20">
        {/* Terminal Header Telemetry */}
        <div className="flex items-center justify-between border-b border-[#00F000]/30 pb-3 mb-8 font-mono text-[11px] sm:text-xs text-[#00F000]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00F000] animate-pulse" />
            <span className="tracking-widest uppercase font-bold crt-phosphor-glow">
              SYS.DIAGNOSTICS // ARCHIVE EXCEPTION
            </span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">
            ERR_CODE: 0x404_TRANSMISSION_LOST
          </span>
        </div>

        {/* Oversized Title */}
        <motion.div
          initial={pageEnter.initial}
          animate={pageEnter.animate}
          className="space-y-4"
        >
          <div className="inline-block bg-[#00F000] text-[#080808] font-mono text-xs sm:text-sm font-bold px-3 py-1 uppercase tracking-widest">
            ERROR 404 // SIGNAL NOT FOUND
          </div>

          <h1 className="font-work text-[clamp(3.5rem,14vw,11rem)] leading-[0.82] tracking-tight uppercase text-white font-bold select-none">
            SIGNAL<br />
            <span className="text-[#00F000] crt-phosphor-glow">LOST</span>
          </h1>

          {/* CRT Terminal Diagnostics Box */}
          <div className="mt-8 p-5 sm:p-7 bg-black border border-[#00F000]/40 rounded-xs font-mono text-xs sm:text-sm space-y-3 relative overflow-hidden crt-box-glow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-hazard-stripes-sm opacity-20 pointer-events-none" />
            
            <p className="text-[#00F000] flex items-center gap-2">
              <span className="font-bold">&gt;</span> SYSTEM STATUS: NO MATCH IN CARRIER ARCHIVE
            </p>
            {attemptedSlug && (
              <p className="text-neutral-300">
                <span className="text-[#00F000]">&gt;</span> TARGET SLUG: <span className="text-white underline">/work/{attemptedSlug}</span>
              </p>
            )}
            <p className="text-neutral-400 leading-relaxed">
              <span className="text-[#00F000]">&gt;</span> DIAGNOSIS: The project record you requested has either been relocated, unlisted, or does not exist in the Balya production archives.
            </p>
            <p className="text-neutral-500 text-[11px]">
              &gt; ADVICE: Return to master works directory or system root.
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={handleReturnToWork}
              className="min-h-[48px] px-6 py-3 bg-[#00F000] text-[#080808] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer flex items-center space-x-2 crt-glitch-hover"
            >
              <span>←</span>
              <span>INDEX // RETURN TO WORKS</span>
            </button>

            <button
              onClick={handleReturnHome}
              className="min-h-[48px] px-6 py-3 border border-neutral-700 hover:border-[#00F000] text-white hover:text-[#00F000] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              SYSTEM ROOT [HOME]
            </button>
          </div>
        </motion.div>
      </main>

      {/* Terminal Footer Strip */}
      <FooterStrip />
    </div>
  );
};
