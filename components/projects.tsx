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
      className="scroll-mt-28 w-full max-w-[70rem] mx-auto mt-28 mb-28 sm:mb-40 relative px-4 sm:px-0"
    >
      <SectionHeading>Featured Works</SectionHeading>

      <div className="flex flex-col gap-12 sm:gap-20 mt-16 sm:mt-24">
        <AnimatePresence initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
        <motion.div 
          className="flex justify-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={showAll ? handleShowLess : () => setShowAll(true)}
            className="group flex items-center gap-3 px-10 py-4 font-semibold text-gray-900 border-2 border-gray-900 dark:text-white dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all uppercase tracking-widest text-sm outline-none focus:ring-4 focus:ring-gray-900/20"
          >
            {showAll ? 'Collapse Directory' : `View Directory (${projects.length})`}
          </button>
        </motion.div>
      )}
    </section>
  );
}
