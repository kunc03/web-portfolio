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
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group mb-16 sm:mb-32 last:mb-0 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:group-even:flex-row-reverse items-center gap-8 sm:gap-16 w-full">
        {/* Image Side */}
        <div className="w-full sm:w-1/2 relative overflow-hidden rounded-2xl shadow-2xl">
          <Link href={linkUrl} target="_blank" className="block w-full h-full">
            <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
            <Image
              src={imageUrl}
              alt={title}
              quality={95}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Content Side */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center text-left">
          <Link
            href={linkUrl}
            target="_blank"
            className="text-3xl sm:text-5xl font-heading font-extrabold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors tracking-tight mb-4"
          >
            {title}
          </Link>
          <div className="w-16 h-1 bg-primary-500 mb-6"></div>
          <p className="leading-relaxed text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8">
            {description}
          </p>
          <ul className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-semibold tracking-wide rounded-none uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
