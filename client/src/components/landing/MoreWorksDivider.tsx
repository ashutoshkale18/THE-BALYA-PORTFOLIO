import React from 'react';
import { motion } from 'framer-motion';
import { VIEWPORT_ONCE } from '../../utils/motion';

interface MoreWorksDividerProps {
  onNavigateToWork: () => void;
}

export const MoreWorksDivider: React.FC<MoreWorksDividerProps> = ({ onNavigateToWork }) => {
  return (
    <motion.div
      onClick={onNavigateToWork}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#00FF00] py-4 sm:py-6 md:py-7 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:brightness-105 select-none"
    >
      {/* Right / Background diagonal black stripes using authentic header_and_footer_elements-04.png */}
      <div className="w-[180px] sm:w-[280px] md:w-[420px] lg:w-[520px] h-full absolute right-0 top-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/header_and_footer_elements/header_and_footer_elements-04.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-right"
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between relative z-10">

        {/* Left / Center: Large Bold Typography */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <motion.span
            className="font-work text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-[#080808] uppercase tracking-tight whitespace-nowrap font-bold group-hover:translate-x-2 transition-transform duration-300"
          >
            MORE WORKS
          </motion.span>

          {/* Animated arrow — bounces on idle, flies on hover */}
          <motion.img
            src="/assets/header_and_footer_elements/header_and_footer_elements-11.png"
            alt="arrow"
            className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain inline-block flex-shrink-0"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ x: 12, y: -4 }}
          />
        </div>

        {/* Clean spacer on right to ensure typography does not collide with right stripes */}
        <div className="w-16 sm:w-28 md:w-44 flex-shrink-0" />

      </div>
    </motion.div>
  );
};
