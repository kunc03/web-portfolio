import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bagus Kunc | Personal Portfolio',
  description: 'Bagus Kuncoro Aziz is a web developer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} bg-transparent text-gray-950 px-4 relative dark:text-gray-50 dark:text-opacity-90 transition-all duration-300`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
