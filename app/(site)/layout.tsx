import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeSwitch from '@/components/theme-switch';
import ActiveSectionContextProvider from '@/context/active-section';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pt-28 sm:pt-36">
      <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
      <ActiveSectionContextProvider>
        <Header />
        {children}
        <Footer />
      </ActiveSectionContextProvider>
      <ThemeSwitch />
    </div>
  );
}
