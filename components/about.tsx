"use client";

import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      className="pb-20 sm:pb-0 max-w-[45rem] h-auto sm:h-screen text-center leading-4 sm:leading-8 md:scroll-mt-[130px] scroll-mt-28 sm:text-[16px] text-[2.286vw]"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3 text-justify">
        I'm a <span className="font-medium">Frontend Web Developer</span> with
        over
        <span className="font-medium">
          {" "}
          1.5 years of professional experience
        </span>{" "}
        at
        <span className="font-medium"> PT Dynamic Talenavi</span>, where I
        started as an intern and transitioned into a full-time role. My daily
        work revolves around building{" "}
        <span className="italic">interactive, responsive,</span> and
        <span className="italic"> accessible web applications</span> that
        prioritize user experience.
      </p>

      <p className="mb-3 text-justify">
        My journey into tech began after I graduated with a
        <span className="font-medium"> Bachelor's degree in Fisheries</span>{" "}
        from Pekalongan University. While my academic background isn't in
        computer science, my
        <span className="italic">passion for problem-solving</span> and
        continuous learning led me to explore programming— particularly{" "}
        <span className="font-medium">frontend development</span>. Since then,
        I’ve been committed to sharpening my skills in modern web technologies.
      </p>

      <p className="mb-3 text-justify">
        During my time at university, I participated in a <span className="font-medium">leadership-focused student organization</span> and served as a <span className="font-medium">teaching assistant</span> for two semesters. These experiences played a key role in building the discipline, teamwork, and communication skills I carry into my professional career today.
      </p>

      <p className="mb-3 text-justify">
        Whether it's collaborating with a team or working independently, I
        thrive on turning ideas into
        <span className="italic">functional</span> and{" "}
        <span className="italic">aesthetic digital experiences</span>.
      </p>
    </motion.section>
  );
}
function setActiveSection(arg0: string) {
  throw new Error("Function not implemented.");
}
