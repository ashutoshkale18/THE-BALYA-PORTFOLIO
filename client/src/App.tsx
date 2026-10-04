import { useState, useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import {
  initialProfile,
  initialBrands,
  initialProjects,
  initialSoftwares,
} from './data/portfolio';
import type {
  Profile,
  BrandItem,
  ProjectItem,
  SoftwareItem
} from './data/portfolio';
import { fetchProfile, fetchBrands, fetchProjects, fetchSoftwares } from './services/api';
import { pageEnter } from './utils/motion';

type Route = 'landing' | 'about' | 'work';

export function App() {
  const [route, setRoute] = useState<Route>('landing');
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [brands, setBrands] = useState<BrandItem[]>(initialBrands);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [softwares, setSoftwares] = useState<SoftwareItem[]>(initialSoftwares);

  // Sync data with backend API
  useEffect(() => {
    async function loadData() {
      try {
        const [profData, brandData, projData, softData] = await Promise.all([
          fetchProfile(),
          fetchBrands(),
          fetchProjects(),
          fetchSoftwares()
        ]);
        if (profData) setProfile(profData);
        if (brandData?.length) setBrands(brandData);
        if (projData?.length) setProjects(projData);
        if (softData?.length) setSoftwares(softData);
      } catch (err) {
        console.warn('API sync fallback active:', err);
      }
    }
    loadData();
  }, []);

  const handleNavigate = (newRoute: Route) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // MotionConfig: honour prefers-reduced-motion system setting globally
    <MotionConfig reducedMotion="user">
      <div className="w-full min-h-screen bg-[#F4F4F2] text-[#080808] overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {route === 'landing' && (
            <motion.div
              key="landing"
              initial={pageEnter.initial}
              animate={pageEnter.animate}
              exit={pageEnter.exit}
            >
              <LandingPage
                brands={brands}
                projects={projects}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {route === 'about' && (
            <motion.div
              key="about"
              initial={pageEnter.initial}
              animate={pageEnter.animate}
              exit={pageEnter.exit}
            >
              <AboutPage
                profile={profile}
                softwares={softwares}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {route === 'work' && (
            <motion.div
              key="work"
              initial={pageEnter.initial}
              animate={pageEnter.animate}
              exit={pageEnter.exit}
            >
              <WorkPage
                projects={projects}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
