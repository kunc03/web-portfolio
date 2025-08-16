import Intro from '@/components/intro';
import About from '@/components/about';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Projects from '@/components/projects';
import Experiences from '@/components/experiences';
import SectionDivider from '@/components/section-divider';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



export default function Home() {
  return (
    <div className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experiences />
      <Contact />
    </div>
  );
}
