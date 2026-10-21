import React from 'react';
import { motion } from 'framer-motion';
import { SocialLinks } from './SocialLinks';
import { VIEWPORT_ONCE } from '../../utils/motion';

interface FooterStripProps {
  className?: string;
}

export const FooterStrip: React.FC<FooterStripProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`w-full h-16 sm:h-20 bg-[#00FF00] flex items-center justify-between px-4 sm:px-8 lg:px-12 relative overflow-hidden ${className}`}
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

      {/* Right social icons */}
      <div className="relative z-10 flex items-center">
        <SocialLinks sizeClass="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" variant="dark" />
      </div>
    </motion.div>
  );
};
