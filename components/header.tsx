'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { useActiveSectionContext } from '@/context/active-section';

type MenuLink = {
  id: number;
  name: string;
  href: string;
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [menuLinks, setMenuLinks] = useState<MenuLink[]>(() => [
    { id: -1, name: 'Home', href: '#home' },
    { id: -2, name: 'About', href: '#about' },
    { id: -3, name: 'Projects', href: '#projects' },
    { id: -4, name: 'Skills', href: '#skills' },
    { id: -5, name: 'Experiences', href: '#experiences' },
    { id: -6, name: 'Contact', href: '#contact' },
  ]);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/menu')
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as MenuLink[];
      })
      .then((data) => {
        if (!data || cancelled) return;
        setMenuLinks(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 first-line:rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 rounded-full w-[85vw] sm:w-[35rem] sm:h-[3.5rem] h-[3rem] top-[1.35rem] sm:top-[.85rem]"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      ></motion.div>

      <nav className="fixed left-1/2 h-12 -translate-x-1/2 py-2 top-[1.2rem] sm:h-[initial] sm:p-0 sm:w-[90%]">
        <ul className="flex w-[85vw] flex-wrap items-center justify-center gap-y-1 text-[2vw] sm:text-[14px] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {menuLinks.map((link) => (
            <motion.li className="h-3/4 flex items-center justify-center relative" key={link.id} initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Link
                className={clsx('flex w-full items-enter justify-center p-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300', {
                  'text-gray-950 dark:text-gray-200': activeSection === link.href,
                })}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.href);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.href === activeSection && (
                  <motion.span
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
