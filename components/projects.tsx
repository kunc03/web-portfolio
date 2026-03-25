'use client';

import React, { useState, useRef } from 'react';
import SectionHeading from './section-heading';
import Project from './project';
import { useSectionInView } from '@/lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectProps } from './project';

const INITIAL_COUNT = 3;

export default function Projects({ projects }: { projects: Array<ProjectProps & { id: number }> }) {
  const { ref } = useSectionInView('#projects');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  function handleShowLess() {
    setShowAll(false);
    // After collapse, scroll back to top of projects section
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <section
      ref={(el) => {
        ref(el);
        sectionRef.current = el;
      }}
      id="projects"
      className="scroll-mt-28 mt-28 mb-28 sm:mb-40 relative"
    >
      <SectionHeading>My projects</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[60rem] mx-auto">
        <AnimatePresence initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Project
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                linkUrl={project.linkUrl}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showAll ? handleShowLess : () => setShowAll(true)}
            className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-700 active:scale-95 transition-all dark:bg-white/10 dark:hover:bg-white/20"
          >
            {showAll ? 'Show less' : `See all projects (${projects.length})`}
            <span className={`transition-transform duration-300 inline-block ${showAll ? 'rotate-180' : ''}`}>↓</span>
          </button>
        </div>
      )}
    </section>
  );
}
