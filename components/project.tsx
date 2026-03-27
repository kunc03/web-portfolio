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
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-white/40 dark:bg-white/5 max-w-[42rem] border border-black/5 dark:border-white/10 backdrop-blur-sm overflow-hidden sm:pr-0 relative sm:h-[20rem] even:pl-8 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition sm:group-even:pl-8 text-gray-950 dark:text-white">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <Link
            href={linkUrl}
            target="_blank"
            className="text-xl sm:text-2xl font-semibold"
          >
            {title}
          </Link>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300 text-sm sm:text-[16px]">
            {description}
          </p>
          <ul className="flex flex-wrap mt-2 sm:mt-4 gap-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="bg-black/[0.7] px-3 py-1 text-xs sm:text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={imageUrl}
          alt={title}
          quality={95}
          className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:scale-[1.04]group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 
        
        group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2

        group-even:right-[initial] group-even:-left-40"
        />
      </section>
    </motion.div>
  );
}
