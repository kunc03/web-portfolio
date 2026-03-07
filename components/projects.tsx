'use client';

import React from 'react';
import SectionHeading from './section-heading';
import Project from './project';
import { useSectionInView } from '@/lib/hooks';
import type { ProjectProps } from './project';

export default function Projects({ projects }: { projects: Array<ProjectProps & { id: number }> }) {
  const { ref } = useSectionInView('#projects', 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mt-28 mb-28 sm:mb-40">
      <SectionHeading>My projects</SectionHeading>

      <div>
        {projects.map((project) => (
          <React.Fragment key={project.id}>
            <Project title={project.title} description={project.description} tags={project.tags} imageUrl={project.imageUrl} linkUrl={project.linkUrl} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
