import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { FloatingResumeCard } from '../about/FloatingResumeCard';
import { staggerContainer, slideInLeft, slideInRight, VIEWPORT_ONCE } from '../../utils/motion';

interface AboutPreviewProps {
  onNavigateToAbout: () => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigateToAbout }) => {
  return (
    <section className="w-full bg-[#F4F4F2] py-14 sm:py-24 md:py-36">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center"
          variants={staggerContainer(0.15, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >

          {/* Left Column: Heading & Biography */}
          <motion.div
            variants={slideInLeft}
            className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8"
          >
            <SectionHeading title="ABOUT ME." />

            <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-[#080808] leading-relaxed max-w-2xl font-normal">
              Multidisciplinary creative working at the intersection of AI, motion, and visual storytelling. I craft bold, future-forward visuals that translate complex ideas into impactful brand communication. Driven by experimentation and emerging tools, I build work that blends technology with strong narrative thinking.
            </p>

            {/* Animated arrow button */}
            <button
              onClick={onNavigateToAbout}
              className="group min-h-[44px] inline-flex items-center space-x-2 font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-[#080808] border-b-2 border-[#00F000] pb-1 hover:text-[#00F000] transition-colors cursor-pointer"
            >
              <span>VIEW FULL PROFILE & EXPERIENCE</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </button>
          </motion.div>

          {/* Right Column: Floating Resume HUD Card (Replacing rounded portrait) */}
          <motion.div
            variants={slideInRight}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full"
          >
            <FloatingResumeCard
              name="ARYAN NIKAM"
              status="CREATIVE / AI VISUAL DEVELOPMENT"
              year="2026"
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
