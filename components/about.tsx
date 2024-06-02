'use client';

import React, { useEffect } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';

export default function About() {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      className="pb-28 sm:pb-24 md:mb-32 sm:mb-0 max-w-[45rem] text-center leading-8 md:scroll-mt-[150px] scroll-mt-32"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3 text-justify">
        My last activities as a student at Pekalongan University. I was once a part of
        <span className="font-medium"> Student Regiment (Menwa)</span> organization and I had the opportunity to serve as <span className="font-medium">teaching assistant</span> for 2 semesters.
      </p>

      {/* <p className="mb-3 text-justify">
        Throughout my studies, I developed expertise in creating reports related to the growth and production results of fisheries. During my academic journey, I consistently dealt with report writing and frequently operated{' '}
        <span className="font-medium">Microsoft Word </span>
        and <span className="font-medium">Microsoft Excel</span>. As a result, I am quite familiar with these tools and am quick to learn in this field
      </p> */}

      <p className="mb-3 text-justify">
        After graduating with a<span className="font-medium"> Bachelor's degree in Fisheries</span>, I developed an interest in programming, specifically in<span className="font-medium"> frontend web development</span>.
        <span className="italic"> My favorite aspect of programming is </span>problem-solving. I <span className="underline">enjoy</span> the process of finding solutions to challenges that arise in the programs I create.
      </p>

      {/* 
      <p>
        <span className="italic">Ketika waktu luang</span>, saya biasanya bermain<span className="font-medium"> game online</span>, nonton<span className="font-medium"> Youtube</span>, <span className="font-medium"> menanam</span> dan
        terkadang saya juga belajar cara <span className="font-medium"> bermain gitar</span>. Saya tipe orang yang selalu ingin mempelajari hal baru.
      </p> 
    */}
    </motion.section>
  );
}
function setActiveSection(arg0: string) {
  throw new Error('Function not implemented.');
}
