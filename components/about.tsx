"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About({ paragraphs = [] }: { paragraphs?: string[] }) {
  const { ref } = useSectionInView("#about");

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-4 sm:leading-8 scroll-mt-28 sm:text-[16px] text-[2.286vw] relative"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      viewport={{ once: true, margin: "-100px" }}
      id="about"
      ref={ref}
    >
      <div className="glass p-8 sm:p-12 rounded-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <SectionHeading>About me</SectionHeading>
        <div className="relative z-10">
          {paragraphs.map((text, idx) => (
            <motion.p 
              key={idx} 
              className="mb-4 text-justify text-gray-700 dark:text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.2 }}
              viewport={{ once: true }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
