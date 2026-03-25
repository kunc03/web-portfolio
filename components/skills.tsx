'use client';

import React from 'react';
import SectionHeading from './section-heading';
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';

const fadeInAnimationsVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills({ skills }: { skills: string[] }) {
  const { ref } = useSectionInView('#skills');

  return (
    <section ref={ref} id="skills" className="mb-28 max-w-[53rem] scroll-mt-28 text-center pb-20 relative">
      <SectionHeading>My skills</SectionHeading>

      <ul className="flex flex-wrap justify-center gap-2 text-sm sm:text-lg text-gray-800 mt-10">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            className="bg-white border border-black/[0.05] rounded-xl px-3 py-1.5 sm:px-5 sm:py-3 dark:bg-white/5 dark:border-white/10 dark:text-white/80 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-300 transition-all cursor-default"
            variants={fadeInAnimationsVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            whileHover={{ scale: 1.1, y: -3 }}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
