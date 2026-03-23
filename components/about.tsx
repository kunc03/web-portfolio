"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About({ paragraphs = [] }: { paragraphs?: string[] }) {
  const { ref } = useSectionInView("#about");

  return (
    <motion.section
      className="pb-20 sm:pb-0 max-w-[45rem] h-auto sm:h-screen text-center leading-4 sm:leading-8 scroll-mt-28 sm:text-[16px] text-[2.286vw] relative"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About me</SectionHeading>
      {paragraphs.map((text, idx) => (
        <p key={idx} className="mb-3 text-justify">
          {text}
        </p>
      ))}
    </motion.section>
  );
}
