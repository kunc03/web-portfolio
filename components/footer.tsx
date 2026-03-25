import React from 'react';

export default function Footer() {
  return (
    <footer className="pb-8 mb-0 px-4 text-center text-gray-500 dark:text-gray-400">
      <small className="mb-3 block text-sm font-medium tracking-wide">
        &copy; {new Date().getFullYear()} Kunc. <span className="opacity-80">All rights reserved.</span>
      </small>
      <p className="text-xs max-w-xl mx-auto leading-relaxed">
        <span className="font-semibold text-gray-600 dark:text-gray-300">About this website:</span> built with React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS, Framer Motion, React Email, Resend, and hosted on Vercel.
      </p>
    </footer>
  );
}
