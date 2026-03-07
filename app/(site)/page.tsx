import Intro from '@/components/intro';
import About from '@/components/about';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Projects from '@/components/projects';
import Experiences from '@/components/experiences';
import SectionDivider from '@/components/section-divider';
import { getExperiences } from '@/lib/experiences';
import { getProjects } from '@/lib/projects';
import { getSkills } from '@/lib/skills';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, skills, experiences] = await Promise.all([getProjects(), getSkills(), getExperiences()]);

  return (
    <div className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects projects={projects} />
      <Skills skills={skills.map((s) => s.name)} />
      <Experiences experiences={experiences} />
      <Contact />
    </div>
  );
}
