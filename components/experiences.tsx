"use client";

import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { Timeline } from "primereact/timeline";
import { Tag } from "primereact/tag";
import type { ExperienceItem } from "@/lib/experiences";

const Experiences = ({ experiences }: { experiences: ExperienceItem[] }) => {
  const { ref } = useSectionInView("#experiences");

  return (
    <section
      ref={ref}
      id="experiences"
      className="mb-28 max-w-[121.143vw] sm:max-w-[53rem] scroll-mt-28 text-center pb-20 relative"
    >
      <SectionHeading>My Timeline</SectionHeading>

      <Timeline
        value={experiences}
        align="alternate"
        className="pl-[1.143vw] sm:pl-2"
        opposite={(item) => (
          <div className="text-[2vw] sm:text-sm text-gray-500 min-w-[14.286vw] sm:min-w-[100px]">{item.date}</div>
        )}
        content={(item) => (
          <div className="p-[2.286vw] text-start sm:p-4 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/10 mb-[1.714vw] sm:mb-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-500/50 group relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
            <h3 className="text-[2.571vw] sm:text-lg font-semibold text-gray-700 dark:text-white/90 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-[2vw] sm:text-sm font-semibold text-gray-700 dark:text-white/70 mb-[0.571vw] sm:mb-1">
              {item.company} · {item.location}
            </p>
            <p className="text-[2vw] sm:text-sm text-justify text-gray-700 dark:text-white/70 mb-[1.143vw] sm:mb-2">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-[1.143vw] sm:gap-2 mt-[1.143vw] sm:mt-2">
              {(item.techStack as string[]).filter((tech: string, idx: number, arr: string[]) => arr.indexOf(tech) === idx).map((tech: string) => (
                <span
                  key={tech}
                  className="px-[1.143vw] py-[0.571vw] sm:px-2 sm:py-1 text-[1.714vw] sm:text-xs bg-gray-50 dark:bg-white/5 border border-black/[0.1] dark:border-white/10 text-gray-700 dark:text-white/70 rounded-full group-hover:border-purple-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            </div>
          </div>
        )}
        marker={(item) => <i className={`p-icon ${item.icon}`} />}
      />
    </section>
  );
};

export default Experiences;
