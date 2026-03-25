"use client";

import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { StaticImageData } from "next/image";

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group h-full"
    >
      <motion.section 
        className="glass flex flex-col h-full border-black/5 overflow-hidden relative rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] dark:text-white dark:hover:border-purple-500/30"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative h-48 sm:h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            quality={95}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <Link
            href={linkUrl}
            target="_blank"
            className="text-xl sm:text-2xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all"
          >
            {title}
          </Link>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70 text-sm flex-grow">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-800/50 px-3 py-1 text-[0.7rem] uppercase tracking-wider rounded-full"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </motion.div>
  );
}
