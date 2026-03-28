"use client";

import { useSpring, useMotionValue, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { StaticImageData } from "next/image";
import { BsArrowRight } from "react-icons/bs";

export type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
  linkUrl: string;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  linkUrl,
}: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <Link href={linkUrl} target="_blank" className="block w-full">
      <motion.section
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex flex-col sm:flex-row sm:items-center justify-between py-10 px-6 sm:px-12 border-b border-black/5 dark:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-300 overflow-visible bg-white/40 dark:bg-transparent backdrop-blur-sm sm:backdrop-blur-none"
      >
        <div className="z-10">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tighter text-gray-950 dark:text-white group-hover:translate-x-3 transition-transform duration-500">
            {title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-3 group-hover:translate-x-3 transition-transform duration-500 delay-75">
            {tags.slice(0, 4).map((tag, index) => (
              <span key={index} className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-0 flex items-center gap-2 text-gray-400 group-hover:text-gray-950 dark:group-hover:text-white transition-colors duration-300 z-10">
          <span className="text-sm font-semibold uppercase tracking-widest">Visit Project</span>
          <BsArrowRight className="text-2xl group-hover:translate-x-2 transition-transform duration-300" />
        </div>

        {/* Floating Image Reveal */}
        <motion.div
          style={{ 
            x, 
            y, 
            translateX: "-50%", 
            translateY: "-50%", 
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0
          }}
          className="z-50 hidden sm:block w-[350px] h-[220px] pointer-events-none rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/40 dark:border-white/20"
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.5,
            rotate: isHovered ? 0 : -5
          }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            quality={95}
          />
        </motion.div>
      </motion.section>
    </Link>
  );
}
