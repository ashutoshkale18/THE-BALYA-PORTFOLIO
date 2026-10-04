import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { SectionHeading } from '../components/common/SectionHeading';
import { FloatingResumeCard } from '../components/about/FloatingResumeCard';
import { ExperienceItem } from '../components/about/ExperienceItem';
import { SoftwareIcon } from '../components/about/SoftwareIcon';
import { SocialLinks } from '../components/common/SocialLinks';
import type { Profile, SoftwareItem } from '../data/portfolio';
import { fadeUp, scaleIn, slideInLeft, slideInRight, staggerContainer, VIEWPORT_ONCE } from '../utils/motion';

interface AboutPageProps {
  profile: Profile;
  softwares: SoftwareItem[];
  onNavigate: (route: 'landing' | 'about' | 'work') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  profile,
  softwares,
  onNavigate
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F4F4F2] text-[#080808]">
      {/* SECTION 1 — NAVIGATION */}
      <Navbar currentRoute="about" onNavigate={onNavigate} darkHero={false} />

      {/* SECTION 2 — PROFILE HERO */}
      <motion.section
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 my-4 sm:my-8 md:my-10"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full rounded-sm overflow-hidden bg-black/10 border border-neutral-300">
          {/* Main Cinematic Visual with HUD Reticles */}
          <img
            src="/assets/images/resumeonly-01-05.jpg"
            alt="Aryan Nikam — The Balya HUD"
            className="w-full h-auto object-cover filter contrast-105"
          />
        </div>
      </motion.section>

      {/* SECTION 4 — ABOUT ME & BIOGRAPHY */}
      <motion.section
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-16 md:py-20"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Biography & Personal Details */}
          <motion.div variants={slideInLeft} className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
            <SectionHeading title="ABOUT ME." />

            <p className="font-body text-base sm:text-lg md:text-xl text-[#080808] leading-relaxed max-w-2xl font-normal">
              {profile.bio}
            </p>

            {/* SECTION 5 — PERSONAL INFORMATION */}
            <div className="w-full max-w-md pt-6 sm:pt-8 space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm md:text-base border-t border-neutral-300">
              <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[110px_1fr] gap-3 sm:gap-4 items-center">
                <span className="text-neutral-500">[NAME]</span>
                <span className="text-[#080808] font-bold tracking-wide">{profile.name}</span>
              </div>
              <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[110px_1fr] gap-3 sm:gap-4 items-center">
                <span className="text-neutral-500">[DOB]</span>
                <span className="text-[#080808]">{profile.dob}</span>
              </div>
              <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[110px_1fr] gap-3 sm:gap-4 items-center">
                <span className="text-neutral-500">[LOCATION]</span>
                <span className="text-[#080808]">{profile.location}</span>
              </div>

              <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[110px_1fr] gap-3 sm:gap-4 items-center">
                <span className="text-neutral-500">[MAIL]</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[#080808] hover:text-[#00F000] transition-colors break-all py-0.5"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Resume HUD Card (Replacing rounded portrait) */}
          <motion.div variants={slideInRight} className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <FloatingResumeCard
              name={profile.name}
              status={profile.status}
              year={profile.resumeYear}
            />
          </motion.div>

        </div>
      </motion.section>

      {/* SECTION 6 — EDUCATION */}
      <motion.section
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <SectionHeading title="EDUCATION." />
        <div className="mt-6 sm:mt-8">
          <h3 className="font-display text-xl sm:text-3xl md:text-4xl text-[#080808] uppercase tracking-tight">
            {profile.education[0]?.institution || 'SIR JJ SCHOOL OF DESIGN'}
          </h3>
        </div>
      </motion.section>

      {/* SECTION 7 — EXPERIENCE */}
      <motion.section
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading title="EXPERIENCE." />
        </motion.div>
        <div className="mt-6 sm:mt-8 space-y-2">
          {profile.experience?.map((exp, idx) => (
            <ExperienceItem
              key={exp.id || `${exp.company}-${idx}`}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              highlights={exp.highlights}
            />
          ))}
        </div>
      </motion.section>

      {/* SECTION 8 — SOFTWARES */}
      <motion.section
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-16 md:py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="flex items-center space-x-3 sm:space-x-4 mb-8 sm:mb-10">
          <h2 className="font-work text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#080808] font-bold">
            SOFTWARES.
          </h2>
          <div className="w-16 sm:w-28 md:w-36 h-5 sm:h-6 overflow-hidden relative">
            <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="softwares-stripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="8" height="16" fill="#00F000" />
                  <rect x="8" width="8" height="16" fill="transparent" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#softwares-stripes)" />
            </svg>
          </div>
        </div>

        {/* Software Icons Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3 sm:gap-4 md:gap-6 justify-items-center">
          {softwares.map((sw, idx) => (
            <SoftwareIcon key={idx} software={sw} />
          ))}
        </div>
      </motion.section>

      {/* SECTION 9 — FOOTER */}
      <div className="w-full h-14 sm:h-16 bg-[#00F000] flex items-center justify-between px-4 sm:px-8 lg:px-12 relative overflow-hidden mt-auto">
        {/* Left diagonal black stripes */}
        <div className="w-[110px] sm:w-[180px] md:w-[260px] h-full absolute left-0 top-0 overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-footer-stripes-strip" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="12" height="24" fill="#080808" />
                <rect x="12" width="12" height="24" fill="#00F000" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-footer-stripes-strip)" />
          </svg>
        </div>
        <div />
        <div className="relative z-10">
          <SocialLinks sizeClass="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" variant="dark" />
        </div>
      </div>
    </div>
  );
};
