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
      className="mb-28 max-w-[121.143vw] sm:max-w-[53rem] scroll-mt-28 text-center pb-20"
    >
      <SectionHeading>My Experiences</SectionHeading>

      <Timeline
        value={experiences}
        align="alternate"
        className="pl-[1.143vw] sm:pl-2"
        opposite={(item) => (
          <div className="text-[2vw] sm:text-sm text-gray-500 min-w-[14.286vw] sm:min-w-[100px]">{item.date}</div>
        )}
        content={(item) => (
          <div className="p-[2.286vw] text-start sm:p-4 rounded-2xl shadow-black/10 dark:shadow-white/10 shadow-lg border border-gray-200 border-black/[0.1] dark:bg-white/10 bg-white mb-[1.714vw] sm:mb-3">
            <h3 className="text-[2.571vw] sm:text-lg font-semibold text-gray-700 dark:text-white/70">
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
                  className="px-[1.143vw] py-[0.571vw] sm:px-2 sm:py-1 text-[1.714vw] sm:text-xs dark:bg-white/10 bg-white dark:bg-zinc-800 border border-gray-200 border-black/[0.1] text-gray-700 dark:text-white/70 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        marker={(item) => <i className={`p-icon ${item.icon}`} />}
      />
    </section>
  );
};

export default Experiences;
