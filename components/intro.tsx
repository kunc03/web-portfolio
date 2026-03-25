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
    <section ref={ref} className="mb-28 max-w-[55rem] text-center sm:mb-0 scroll-mt-[100rem]" id="home">
      <div className="flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }} 
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
          transition={{ type: 'spring', stiffness: 125, damping: 15, duration: 0.5 }}
          className="relative"
        >
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl scale-110 -z-10 animate-pulse-slow"></div>
          <Image width={192} height={192} quality={95} priority={true} src={profile} alt="Kunc portrait" className="h-32 w-32 rounded-full object-cover border-[0.25rem] border-white/80 dark:border-white/20 shadow-2xl" />
        </motion.div>
      </div>
      
      <motion.h1 
        className="mb-10 w-full mt-6 px-4 text-3xl font-medium !leading-[1.4] sm:text-5xl" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="font-heading font-bold text-gray-900 dark:text-white">
          Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500 dark:from-primary-400 dark:to-teal-300">Bagus Kuncoro Aziz.</span>
        </span>
        <br className="hidden sm:block" />
        <span className="text-gray-600 dark:text-gray-300 text-2xl sm:text-4xl">
          A passionate <span className="font-heading font-semibold text-gray-800 dark:text-gray-100 italic">Frontend Developer</span> based in Indonesia.
        </span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-base font-medium"
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3.5 flex items-center gap-2 rounded-full outline-none focus:ring-4 focus:ring-gray-900/20 hover:bg-gray-800 hover:-translate-y-1 shadow-xl hover:shadow-2xl active:scale-95 transition-all dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-white"
          onClick={() => {
            setActiveSection('#contact');
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here
          <BsArrowRight className="opacity-70 group-hover:translate-x-1.5 transition-transform" />
        </Link>
        
        <a
          className="group glass-card px-7 py-3.5 flex items-center gap-2 rounded-full outline-none focus:ring-4 focus:ring-black/5 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/10 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer text-gray-700 dark:text-gray-200"
          href="/CV.pdf"
          download
        >
          Download CV <HiDownload className="opacity-60 group-hover:translate-y-1 text-lg transition-transform" />
        </a>
        
        <div className="flex gap-3">
          <a
            className="glass-card text-gray-700 hover:text-primary-600 dark:hover:text-primary-400 p-4 flex items-center gap-2 rounded-full focus:ring-4 focus:ring-black/5 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/10 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer dark:text-gray-200"
            href="https://www.linkedin.com/in/bagus-kuncoro-851636275/"
            target="_blank"
            aria-label="LinkedIn"
          >
            <BsLinkedin className="text-xl" />
          </a>
          <a
            className="glass-card text-gray-700 hover:text-gray-950 dark:hover:text-white p-4 flex items-center gap-2 rounded-full focus:ring-4 focus:ring-black/5 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/10 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer dark:text-gray-200"
            href="https://github.com/kunc03/"
            target="_blank"
            aria-label="GitHub"
          >
            <FaGitSquare className="text-xl" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
