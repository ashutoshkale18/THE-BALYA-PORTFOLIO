import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
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

type NavRoute = 'landing' | 'about' | 'work';

/** Ensures the window scrolls to top on any route navigation */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavigate = (newRoute: NavRoute) => {
    const targetPath = newRoute === 'landing' ? '/' : `/${newRoute}`;
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // MotionConfig: honour prefers-reduced-motion system setting globally
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <div className="w-full min-h-screen bg-[#F4F4F2] text-[#080808] overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* Landing Route */}
            <Route
              path="/"
              element={
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
              }
            />

            {/* About Route */}
            <Route
              path="/about"
              element={
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
              }
            />

            {/* Works Index Route */}
            <Route
              path="/work"
              element={
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
              }
            />

            {/* Individual Project Detail Route */}
            <Route
              path="/work/:slug"
              element={
                <motion.div
                  key={`detail-${location.pathname}`}
                  initial={pageEnter.initial}
                  animate={pageEnter.animate}
                  exit={pageEnter.exit}
                >
                  <ProjectDetailPage
                    projects={projects}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              }
            />

            {/* Styled 404 Not Found Route */}
            <Route
              path="*"
              element={
                <motion.div
                  key="not-found"
                  initial={pageEnter.initial}
                  animate={pageEnter.animate}
                  exit={pageEnter.exit}
                >
                  <NotFoundPage onNavigate={handleNavigate} />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;

