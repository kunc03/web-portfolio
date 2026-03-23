import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeSwitch from '@/components/theme-switch';
import ActiveSectionContextProvider from '@/context/active-section';

import BackgroundBlobs from '@/components/background-blobs';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pt-28 sm:pt-36">
      <BackgroundBlobs />
      <ActiveSectionContextProvider>
        <Header />
        {children}
        <Footer />
      </ActiveSectionContextProvider>
      <ThemeSwitch />
    </div>
  );
}
