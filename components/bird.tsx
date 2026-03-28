'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BirdProps {
  id: string;
  isDark: boolean;
  startX: number;
  startY: number;
  speedX: number;
  size: number;
  onComplete: (id: string) => void;
}

const Bird: React.FC<BirdProps> = ({ id, isDark, startX, startY, speedX, size, onComplete }) => {
  const isGoingRight = speedX > 0;
  
  // Perspektif: burung kecil lebih transparan (jauh), burung besar lebih pekat (dekat)
  const baseOpacity = size > 45 ? 1 : size > 35 ? 0.7 : 0.4;
  
  return (
    <motion.div
      initial={{ x: startX, y: startY, opacity: isDark ? 0 : baseOpacity }}
      animate={{ 
        x: isGoingRight ? window.innerWidth + 200 : -200,
        opacity: isDark ? 0 : baseOpacity
      }}
      transition={{ 
        x: { duration: Math.abs(window.innerWidth / Math.abs(speedX)) / 58, ease: "linear" },
        opacity: { duration: 0.3 }
      }}
      onAnimationComplete={() => onComplete(id)}
      className="fixed z-[-15] pointer-events-none"
    >
      <div 
        style={{ 
          transform: `scaleX(${isGoingRight ? 1 : -1})`,
          width: `${size}px`,
          height: `${size}px`,
          position: 'relative'
        }}
      >
        <Image
          src="/bird.gif"
          alt="Flying bird"
          width={size}
          height={size}
          unoptimized // GIFs work better unoptimized in Next.js
          className="object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Bird;
