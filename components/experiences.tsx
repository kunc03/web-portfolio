"use client";

import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { Timeline } from "primereact/timeline";
import type { ExperienceItem } from "@/lib/experiences";

const Experiences = ({ experiences }: { experiences: ExperienceItem[] }) => {
  const { ref } = useSectionInView("#experiences");

  return (
    <section
      ref={ref}
      id="experiences"
      className="mb-28 max-w-[121.143vw] sm:max-w-[65rem] mx-auto scroll-mt-28 text-center pb-20 relative px-4 sm:px-0"
    >
      <SectionHeading className="mb-20">My Journey</SectionHeading>

      <div className="mt-12 text-left">
        <Timeline
          value={experiences}
          align="alternate"
          className="pl-[1.143vw] sm:pl-2 customized-timeline"
          opposite={(item) => (
            <div className="text-sm sm:text-lg text-gray-400 dark:text-gray-500 font-mono tracking-widest mt-2">{item.date}</div>
          )}
          content={(item) => (
            <div className="px-6 sm:px-10 py-1 pb-16 group">
              <span className="text-primary-600 dark:text-primary-500 font-mono font-bold tracking-widest text-xs sm:text-sm uppercase mb-3 block">
                {item.company} • {item.location}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-base sm:text-[17px] leading-relaxed text-gray-600 dark:text-gray-400 mb-6 font-sans">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {(item.techStack as string[]).filter((tech: string, idx: number, arr: string[]) => arr.indexOf(tech) === idx).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase border border-gray-300 text-gray-600 dark:border-white/10 dark:text-white/50 rounded-none bg-transparent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          marker={(item) => (
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10 mt-3 transform group-hover:scale-150 transition-transform"></div>
          )}
        />
      </div>
    </section>
  );
};

export default Experiences;
