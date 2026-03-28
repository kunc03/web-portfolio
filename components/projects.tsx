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

      <div className="flex flex-col border-t border-black/5 dark:border-white/10 max-w-[55rem] mx-auto overflow-visible relative">
        <AnimatePresence initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
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
        <div className="flex justify-center mt-12 mb-4">
          <button
            onClick={showAll ? handleShowLess : () => setShowAll(true)}
            className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-3.5 rounded-full font-medium outline-none focus:scale-110 hover:scale-105 hover:bg-gray-950 active:scale-105 transition-all dark:bg-white/10 dark:hover:bg-white/20 borderBlack"
          >
            {showAll ? 'Show less projects' : `Explore all ${projects.length} projects`}
            <span className={`transition-transform duration-500 inline-block font-bold text-lg ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
              ↓
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
