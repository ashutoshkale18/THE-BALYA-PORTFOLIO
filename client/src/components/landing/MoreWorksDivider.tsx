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
      className="w-full bg-[#00F000] py-3.5 sm:py-5 md:py-6 relative overflow-hidden cursor-pointer group transition-brightness duration-300 hover:brightness-105 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between relative z-10">

        {/* Left / Center: Large Bold Typography */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.span
            className="font-work text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-[#080808] uppercase tracking-tight whitespace-nowrap font-bold"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            MORE WORKS
          </motion.span>

          {/* Animated arrow — bounces on idle, flies on hover */}
          <motion.img
            src="/assets/header_and_footer_elements/header_and_footer_elements-11.png"
            alt="arrow"
            className="w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 object-contain inline-block flex-shrink-0"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ x: 10, y: -4 }}
          />
        </div>

        {/* Right: Diagonal Black Stripes */}
        <div className="w-16 sm:w-36 md:w-56 h-7 sm:h-10 md:h-14 overflow-hidden relative flex-shrink-0 ml-2">
          <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="more-works-stripes" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                <rect width="32" height="32" fill="#00F000" />
                <rect width="10" height="32" fill="#080808" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#more-works-stripes)" />
          </svg>
        </div>

      </div>
    </motion.div>
  );
};
