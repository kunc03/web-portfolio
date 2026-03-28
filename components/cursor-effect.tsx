'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
  const [isDark, setIsDark] = useState(false);
  
  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* The Glow/Flashlight */}
      <div 
        className={`w-[150px] h-[150px] rounded-full transition-colors duration-1000 ${
          isDark 
            ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_60%)]'
            : 'bg-[radial-gradient(circle,rgba(255,210,50,0.5)_0%,rgba(255,255,255,0)_60%)]'
        }`}
        style={{
          mixBlendMode: isDark ? 'soft-light' : 'multiply'
        }}
      />
    </motion.div>
  );
}
