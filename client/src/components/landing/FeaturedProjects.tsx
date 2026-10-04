import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../../data/portfolio';
import { ProjectPreview } from './ProjectPreview';
import { ProjectModal } from '../common/ProjectModal';

interface FeaturedProjectsProps {
  projects: ProjectItem[];
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Take the 3 featured video projects or top featured projects
  const featuredList = projects.filter((p) => p.featured);
  const displayProjects = featuredList.length >= 3 ? featuredList.slice(0, 3) : projects.slice(0, 3);
  const p1 = displayProjects[0];
  const p2 = displayProjects[1];
  const p3 = displayProjects[2];

  return (
    <section className="w-full bg-[#F4F4F2] py-12 sm:py-20 md:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Project 01 — Left Aligned */}
        {p1 && (
          <ProjectPreview
            project={p1}
            alignment="left"
            onOpenProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {/* Project 02 — Right Aligned */}
        {p2 && (
          <ProjectPreview
            project={p2}
            alignment="right"
            onOpenProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {/* Project 03 — Center Aligned */}
        {p3 && (
          <ProjectPreview
            project={p3}
            alignment="center"
            onOpenProject={(proj) => setSelectedProject(proj)}
          />
        )}

      </div>

      {/* Project Lightbox — multi-media gallery modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
