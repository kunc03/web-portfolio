"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About({ paragraphs = [] }: { paragraphs?: string[] }) {
  const { ref } = useSectionInView("#about");

  return (
    <motion.section
      className="mb-20 sm:mb-28 max-w-[48rem] mx-auto text-center scroll-mt-28 relative px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      id="about"
      ref={ref}
    >
      <SectionHeading className="mb-10 text-gray-900 dark:text-white">About me</SectionHeading>
      
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow text-gray-700 dark:text-gray-300">
        <div className="text-base sm:text-lg font-sans leading-relaxed tracking-wide text-justify sm:text-center space-y-5">
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
          {paragraphs.length === 0 && (
            <p className="italic text-gray-500">No about information provided.</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
