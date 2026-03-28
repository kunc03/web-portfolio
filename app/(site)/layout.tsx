import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeSwitch from '@/components/theme-switch';
import ActiveSectionContextProvider from '@/context/active-section';

import StarryBackground from '@/components/starry-background';
import CursorEffect from '@/components/cursor-effect';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pt-28 sm:pt-36 min-h-screen">
      <StarryBackground />
      <CursorEffect />
      <ActiveSectionContextProvider>
        <Header />
        {children}
        <Footer />
      </ActiveSectionContextProvider>
      <ThemeSwitch />
    </div>
  );
}
