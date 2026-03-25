import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Bagus Kunc | Personal Portfolio',
  description: 'Bagus Kuncoro Aziz is a web developer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`!scroll-smooth ${outfit.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className={`${jakarta.className} bg-surface-light text-gray-900 relative dark:bg-surface-dark dark:text-gray-50 dark:text-opacity-90 antialiased selection:bg-emerald-500/30`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
