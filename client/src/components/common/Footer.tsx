import React from 'react';
import { motion } from 'framer-motion';
import { SocialLinks } from './SocialLinks';
import { staggerContainer, staggerChild, fadeUp, VIEWPORT_ONCE } from '../../utils/motion';

interface FooterProps {
  onNavigate?: (route: 'landing' | 'about' | 'work') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full bg-[#080808] text-white pt-14 sm:pt-20 md:pt-28">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Top Info Grid — scroll-triggered stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 md:gap-16 pb-14 sm:pb-20 md:pb-28 border-b border-neutral-800"
          variants={staggerContainer(0.06, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >

          {/* Left Column: Capabilities */}
          <motion.div
            variants={staggerChild}
            className="flex flex-col space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.18em] uppercase text-neutral-300"
          >
            <span className="hover:text-[#00F000] transition-colors cursor-default">AI VISUAL DEVELOPMENT</span>
            <span className="hover:text-[#00F000] transition-colors cursor-default">AI VIDEOS</span>
            <span className="hover:text-[#00F000] transition-colors cursor-default">CAMPAIGNS</span>
            <span className="hover:text-[#00F000] transition-colors cursor-default">ILLUSTRATION</span>
            <span className="hover:text-[#00F000] transition-colors cursor-default">AGENTIC AI INTEGRATION</span>
          </motion.div>

          {/* Right Column: Technical Metadata */}
          <motion.div
            variants={staggerChild}
            className="flex flex-col space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm md:text-base tracking-wider md:items-end"
          >
            <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[90px_1fr] md:grid-cols-[100px_1fr] gap-3 sm:gap-4 w-full md:max-w-md items-center">
              <span className="text-neutral-500">[LOC]</span>
              <span className="text-white text-right">MUMBAI</span>
            </div>

            <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[90px_1fr] md:grid-cols-[100px_1fr] gap-3 sm:gap-4 w-full md:max-w-md items-center">
              <span className="text-neutral-500">[INSTA]</span>
              <a
                href="https://instagram.com/thebalya"
                target="_blank"
                rel="noreferrer"
                className="text-white text-right hover:text-[#00F000] transition-colors py-1"
              >
                @thebalya
              </a>
            </div>
            <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[90px_1fr] md:grid-cols-[100px_1fr] gap-3 sm:gap-4 w-full md:max-w-md items-center">
              <span className="text-neutral-500">[MAIL]</span>
              <a
                href="mailto:aryannikam7556@gmail.com"
                className="text-white text-right hover:text-[#00F000] transition-colors break-all py-1"
              >
                aryannikam7556@gmail.com
              </a>
            </div>
          </motion.div>

        </motion.div>

        {/* Lower Statement Section — footer reveal */}
        <motion.div
          className="py-12 sm:py-20 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <div className="w-full md:w-auto text-left">
            <h2 className="font-display text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.92] sm:leading-[0.9] tracking-tight uppercase select-none break-words">
              LET'S WORK<br />TOGETHER !!!
            </h2>
          </div>

          {/* 3D Avatar Bust — subtle float */}
          <motion.div
            className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-full h-full rounded-full border-2 border-white/20 p-1 flex items-center justify-center overflow-hidden bg-black"
              whileHover={{ borderColor: '#00F000', scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/assets/images/images-03.png"
                alt="Aryan Nikam Avatar"
                className="w-full h-full object-contain filter grayscale"
              />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* SOCIAL FOOTER STRIP */}
      <motion.div
        className="w-full h-16 sm:h-20 bg-[#00F000] flex items-center justify-between px-4 sm:px-8 lg:px-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.6 }}
      >
        {/* Left diagonal black stripes matching header_and_footer_elements-02.png */}
        <div className="w-[180px] sm:w-[280px] md:w-[420px] lg:w-[500px] h-full absolute left-0 top-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/header_and_footer_elements/header_and_footer_elements-02.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-left"
          />
        </div>

        <div />

        {/* Right social icons — enlarged size */}
        <div className="relative z-10 flex items-center">
          <SocialLinks sizeClass="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" variant="dark" />
        </div>
      </motion.div>
    </footer>
  );
};
