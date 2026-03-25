'use client';

import React from 'react';
import SectionHeading from './section-heading';
import { useSectionInView } from '@/lib/hooks';
import { motion, Variants } from 'framer-motion';

const fadeInAnimationsVariants: Variants = {
  initial: {
    opacity: 0,
    y: 15,
    scale: 0.98,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.03 * index,
    },
  }),
};

export default function Skills({ skills }: { skills: string[] }) {
  const { ref } = useSectionInView('#skills');

  return (
    <section ref={ref} id="skills" className="mb-28 max-w-[55rem] mx-auto scroll-mt-28 text-center pb-20 relative px-4">
      <SectionHeading className="mb-12">My Skills</SectionHeading>

      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-[15px] text-gray-800">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 shadow-sm hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-400/30 dark:text-gray-200 font-medium transition-all group flex items-center gap-2"
            variants={fadeInAnimationsVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary-500/50 group-hover:bg-primary-500 transition-colors"></div>
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
