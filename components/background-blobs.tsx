'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden -z-10 select-none pointer-events-none" aria-hidden="true">
      {/* 1. Top Right - Pink */}
      <motion.div
        className="bg-[#fbe2e3] absolute top-[5%] right-[-10%] h-[35rem] w-[35rem] rounded-full blur-3xl sm:w-[50rem] dark:bg-[#946263] opacity-60"
        animate={{
          x: ['-15vw', '15vw', '-10vw', '10vw', '-15vw'],
          y: ['-5vh', '5vh', '-3vh', '3vh', '-5vh'],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
      />
      
      {/* 2. Top Left - Purple */}
      <motion.div
        className="bg-[#dbd5ff] absolute top-[15%] left-[-15%] h-[35rem] w-[35rem] rounded-full blur-3xl sm:w-[50rem] dark:bg-[#676394] opacity-60"
        animate={{
          x: ['-10vw', '20vw', '-5vw', '10vw', '-10vw'],
          y: ['5vh', '-10vh', '5vh', '-3vh', '5vh'],
          scale: [1, 0.94, 1.06, 0.98, 1],
        }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
      />

      {/* 3. Mid Right - Amber */}
      <motion.div
        className="bg-amber-100 absolute top-[30%] right-[-15%] h-[30rem] w-[30rem] rounded-full blur-3xl sm:w-[45rem] dark:bg-amber-900 opacity-40 dark:opacity-25"
        animate={{
          x: ['-20vw', '10vw', '-15vw', '5vw', '-20vw'],
          y: ['-8vh', '8vh', '-4vh', '4vh', '-8vh'],
          scale: [1, 1.07, 0.93, 1.04, 1],
        }}
        transition={{ repeat: Infinity, duration: 27, ease: 'easeInOut' }}
      />

      {/* 4. Mid Left - Cyan */}
      <motion.div
        className="bg-cyan-100 absolute top-[42%] left-[-15%] h-[30rem] w-[30rem] rounded-full blur-3xl sm:w-[45rem] dark:bg-cyan-900 opacity-40 dark:opacity-25"
        animate={{
          x: ['-5vw', '25vw', '-10vw', '15vw', '-5vw'],
          y: ['8vh', '-8vh', '4vh', '-4vh', '8vh'],
          scale: [1, 0.92, 1.08, 0.94, 1],
        }}
        transition={{ repeat: Infinity, duration: 32, ease: 'easeInOut' }}
      />

      {/* 5. Mid Right - Teal */}
      <motion.div
        className="bg-teal-100 absolute top-[55%] right-[-10%] h-[35rem] w-[35rem] rounded-full blur-3xl sm:w-[45rem] dark:bg-emerald-900 opacity-40 dark:opacity-25"
        animate={{
          x: ['-15vw', '15vw', '-8vw', '8vw', '-15vw'],
          y: ['-10vh', '10vh', '-5vh', '5vh', '-10vh'],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{ repeat: Infinity, duration: 28, ease: 'easeInOut' }}
      />

      {/* 6. Mid Left - Indigo */}
      <motion.div
        className="bg-indigo-100 absolute top-[68%] left-[-10%] h-[30rem] w-[30rem] rounded-full blur-3xl sm:w-[40rem] dark:bg-indigo-950 opacity-40 dark:opacity-25"
        animate={{
          x: ['-12vw', '12vw', '-6vw', '6vw', '-12vw'],
          y: ['8vh', '-8vh', '4vh', '-4vh', '8vh'],
          scale: [1, 0.95, 1.05, 0.97, 1],
        }}
        transition={{ repeat: Infinity, duration: 31, ease: 'easeInOut' }}
      />

      {/* 7. Bottom Right - Pink/Rose */}
      <motion.div
        className="bg-rose-100 absolute top-[78%] right-[-15%] h-[30rem] w-[30rem] rounded-full blur-3xl sm:w-[45rem] dark:bg-rose-900 opacity-35 dark:opacity-20"
        animate={{
          x: ['-20vw', '10vw', '-12vw', '8vw', '-20vw'],
          y: ['-8vh', '8vh', '-4vh', '4vh', '-8vh'],
          scale: [1, 1.06, 0.94, 1.03, 1],
        }}
        transition={{ repeat: Infinity, duration: 29, ease: 'easeInOut' }}
      />

      {/* 8. Bottom Left - Emerald */}
      <motion.div
        className="bg-emerald-100 absolute top-[85%] left-[-15%] h-[30rem] w-[30rem] rounded-full blur-3xl sm:w-[40rem] dark:bg-teal-900 opacity-35 dark:opacity-20"
        animate={{
          x: ['-8vw', '18vw', '-4vw', '10vw', '-8vw'],
          y: ['6vh', '-6vh', '3vh', '-3vh', '6vh'],
          scale: [1, 0.93, 1.07, 0.96, 1],
        }}
        transition={{ repeat: Infinity, duration: 33, ease: 'easeInOut' }}
      />

      {/* 9. Bottom Right - Deep Blue */}
      <motion.div
        className="bg-blue-100 absolute top-[92%] right-[-10%] h-[35rem] w-[35rem] rounded-full blur-3xl sm:w-[45rem] dark:bg-blue-950 opacity-40 dark:opacity-25"
        animate={{
          x: ['-15vw', '15vw', '-10vw', '10vw', '-15vw'],
          y: ['-5vh', '7vh', '-3vh', '3vh', '-5vh'],
          scale: [1, 1.04, 0.96, 1.01, 1],
        }}
        transition={{ repeat: Infinity, duration: 26, ease: 'easeInOut' }}
      />

      {/* 10. Bottom Center-Left - Violet */}
      <motion.div
        className="bg-[#dbd5ff] absolute top-[97%] left-[-10%] h-[30rem] w-[30rem] rounded-full blur-3xl sm:w-[40rem] dark:bg-[#676394] opacity-40 dark:opacity-25"
        animate={{
          x: ['-10vw', '20vw', '-5vw', '15vw', '-10vw'],
          y: ['7vh', '-7vh', '4vh', '-4vh', '7vh'],
          scale: [1, 0.95, 1.05, 0.98, 1],
        }}
        transition={{ repeat: Infinity, duration: 32, ease: 'easeInOut' }}
      />
    </div>
  );
}
