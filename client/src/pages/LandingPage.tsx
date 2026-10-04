import React from 'react';
import { Hero } from '../components/landing/Hero';
import { BrandMarquee } from '../components/landing/BrandMarquee';
import { GreenDivider } from '../components/common/GreenDivider';
import { FeaturedProjects } from '../components/landing/FeaturedProjects';
import { MoreWorksDivider } from '../components/landing/MoreWorksDivider';
import { AboutPreview } from '../components/landing/AboutPreview';
import { Footer } from '../components/common/Footer';
import type { BrandItem, ProjectItem } from '../data/portfolio';


interface LandingPageProps {
  brands: BrandItem[];
  projects: ProjectItem[];
  onNavigate: (route: 'landing' | 'about' | 'work') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  brands,
  projects,
  onNavigate
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F4F4F2] selection:bg-[#00F000] selection:text-[#080808]">
      {/* SECTIONS 1 & 2 — NAVIGATION & HERO */}
      <Hero onNavigate={onNavigate} />

      {/* SECTION 3 — BRAND LOGO MARQUEE */}
      <BrandMarquee brands={brands} />

      {/* SECTION 4 — GREEN DECORATIVE DIVIDER */}
      <GreenDivider heightClass="h-7 sm:h-11" />

      {/* SECTIONS 5, 6, 7 — FEATURED PROJECTS 01, 02, 03 */}
      <FeaturedProjects projects={projects} />

      {/* SECTION 8 — MORE WORKS DIVIDER */}
      <MoreWorksDivider onNavigateToWork={() => onNavigate('work')} />

      {/* SECTION 9 — ABOUT ME PREVIEW */}
      <AboutPreview onNavigateToAbout={() => onNavigate('about')} />

      {/* SECTIONS 10 & 11 — CONTACT FOOTER & SOCIAL FOOTER STRIP */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
