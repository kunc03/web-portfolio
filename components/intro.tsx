'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import profile from '@/public/Bisa2.png';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGitSquare } from 'react-icons/fa';
import { useSectionInView } from '@/lib/hooks';
import { useActiveSectionContext } from '@/context/active-section';

export default function Intro() {
  const { ref } = useSectionInView('Home', 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section ref={ref} className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]" id="home">
      <div className="flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'tween', duration: 0.2 }}>
          <Image width={192} height={192} quality={95} priority={true} src={profile} alt="Kunc portrait" className="h-28 w-28 rounded-full object-cover border-[0.35rem] border-white shadow-xl" />
        </motion.div>
      </div>
      {/* I'm a <span className="font-bold">Frontend Developer</span> */}
      {/*  Fokus saya sekarang di
        <span className="underline">Ms Word, Ms Excel dan React (Next.js)</span>. */}
      <motion.h1 className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-bold">Hello, I'm Bagus Kuncoro Aziz.</span> A passionate <span className="italic">front-end React (Next.js) Developer </span>dan <span className="italic">admin</span> based in Pekalongan, Indonesia.
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium">
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-105 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection('Contact');
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-105 active:scale-105 transition cursor-pointer border border-black/10 dark:text-white/60 dark:bg-white/10 "
          href="/CV.pdf"
          download
        >
          Download CV <HiDownload className="opacity-60 group-hover:translate-y-1 transition " />
        </a>
        <div className="flex gap-2">
          <a
            className="bg-white text-gray-700 hover:text-gray-950 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15]  active:scale-105 transition cursor-pointer border border-black/10 dark:text-white/60 dark:bg-white/10 "
            href="https://www.linkedin.com/in/bagus-kuncoro-aziz-851636275/"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            className="bg-white text-gray-700 hover:text-gray-950 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15]  active:scale-105 transition cursor-pointer border border-black/10 dark:text-white/60 dark:bg-white/10 "
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
