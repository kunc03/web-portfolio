'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden -z-10 select-none pointer-events-none bg-surface-light dark:bg-surface-dark transition-colors duration-700" aria-hidden="true">
      {/* 1. Primary Emerald Top Left */}
      <motion.div
        className="bg-primary-300 absolute top-[-10%] left-[-10%] h-[45rem] w-[45rem] rounded-full blur-[12rem] sm:w-[60rem] dark:bg-primary-900 opacity-40 dark:opacity-20"
        animate={{
          x: ['-5vw', '5vw', '-5vw'],
          y: ['-5vh', '5vh', '-5vh'],
          scale: [1, 1.05, 1],
        }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
      />
      
      {/* 2. Soft Violet / Indigo Top Right */}
      <motion.div
        className="bg-indigo-300 absolute top-[10%] right-[-15%] h-[40rem] w-[40rem] rounded-full blur-[12rem] sm:w-[55rem] dark:bg-indigo-900 opacity-30 dark:opacity-20"
        animate={{
          x: ['5vw', '-5vw', '5vw'],
          y: ['5vh', '-5vh', '5vh'],
          scale: [1.02, 0.98, 1.02],
        }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
      />

      {/* 3. Deep Blue / Teal Bottom Center */}
      <motion.div
        className="bg-teal-200 absolute top-[60%] left-[20%] h-[50rem] w-[50rem] rounded-full blur-[14rem] sm:w-[65rem] dark:bg-teal-950 opacity-30 dark:opacity-20"
        animate={{
          x: ['-8vw', '8vw', '-8vw'],
          y: ['-8vh', '8vh', '-8vh'],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ repeat: Infinity, duration: 35, ease: 'easeInOut' }}
      />
      
      {/* Noise Texture Overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
