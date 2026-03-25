'use client';

import Image from 'next/image';
import React from 'react';
import profile from '@/public/Bisa2.png';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGitSquare } from 'react-icons/fa';
import { useSectionInView } from '@/lib/hooks';
import { useActiveSectionContext } from '@/context/active-section';

export default function Intro() {
  const { ref } = useSectionInView('#home');
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section ref={ref} className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]" id="home">
      <div className="flex items-center justify-center">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-md animate-pulse-slow"
          ></motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative">
            <Image width={192} height={192} quality={95} priority={true} src={profile} alt="Kunc portrait" className="h-28 w-28 rounded-full object-cover border-[0.35rem] border-white shadow-xl relative z-10" />
          </motion.div>
        </motion.div>
      </div>
      <motion.h1 className="mb-10 mt-[2.286vw] sm:mt-4 px-[2.286vw] sm:px-4 text-[5.143vw] font-medium !leading-[1.5] sm:text-4xl" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-bold">Hello, I'm <span className="text-gradient from-purple-500 via-pink-500 to-amber-500 font-extrabold animate-shimmer bg-[size:200%]">Bagus Kuncoro Aziz</span>.</span> A passionate <span className="italic font-semibold text-blue-600 dark:text-blue-400">front-end Developer </span>based in Pekalongan, Indonesia.
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-[2.571vw] sm:text-lg font-medium">
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-[4vw] sm:px-7 py-[1.714vw] sm:py-3 flex items-center gap-[1.143vw] sm:gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 hover:bg-gray-950 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-100 transition-all"
          onClick={() => {
            setActiveSection('#contact');
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-100 transition-all cursor-pointer border border-black/10 dark:text-white/80 dark:bg-white/10 hover:dark:bg-white/20 hover:shadow-lg glass"
          href="/CV.pdf"
          download
        >
          Download CV <HiDownload className="opacity-60 group-hover:translate-y-1 transition " />
        </a>
        <div className="flex gap-2">
          <a
            className="bg-white text-gray-700 hover:text-blue-600 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition-all cursor-pointer border border-black/10 dark:text-white/80 dark:bg-white/10 hover:dark:bg-white/20 hover:shadow-lg glass"
            href="https://www.linkedin.com/in/bagus-kuncoro-851636275/"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            className="bg-white text-gray-700 hover:text-gray-950 dark:hover:text-gray-300 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition-all cursor-pointer border border-black/10 dark:text-white/80 dark:bg-white/10 hover:dark:bg-white/20 hover:shadow-lg glass"
            href="https://github.com/kunc03/"
            target="_blank"
          >
            <FaGitSquare />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
