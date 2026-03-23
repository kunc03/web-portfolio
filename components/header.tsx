'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { useActiveSectionContext } from '@/context/active-section';

type MenuLink = {
  id: number;
  name: string;
  href: string;
};

type IndicatorRect = { left: number; top: number; width: number; height: number };

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

  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [indicatorRect, setIndicatorRect] = useState<IndicatorRect | null>(null);

  // Fetch menu from API
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
    return () => { cancelled = true; };
  }, []);

  // Measure and update indicator position whenever activeSection or menuLinks change
  useEffect(() => {
    const activeEl = itemRefs.current.get(activeSection);
    if (!activeEl) return;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeEl;
    setIndicatorRect({ left: offsetLeft, top: offsetTop, width: offsetWidth, height: offsetHeight });
  }, [activeSection, menuLinks]);

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 overflow-hidden border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 rounded-2xl sm:rounded-full w-[90vw] sm:w-[35rem] sm:h-[3.5rem] h-auto py-1 sm:py-0 top-[1.35rem] sm:top-[.85rem] flex items-center justify-center"
        initial={{ y: -80, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
      >
        <nav className="w-full h-full py-1 sm:p-0 flex items-center justify-center">
          {/* Single sliding indicator — never unmounts, always tracks active item */}
          <ul className="relative flex w-full flex-wrap items-center justify-center gap-1 text-xs sm:text-[14px] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5 px-2 sm:px-0">
            {indicatorRect && (
              <motion.span
                className="absolute bg-gray-100 rounded-full -z-10 dark:bg-gray-800 pointer-events-none"
                animate={{
                  left: indicatorRect.left,
                  top: indicatorRect.top,
                  width: indicatorRect.width,
                  height: indicatorRect.height,
                }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.22 }}
              />
            )}

            {menuLinks.map((link) => (
              <li
                key={link.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(link.href, el);
                }}
                className="h-3/4 flex items-center justify-center"
              >
                <Link
                  className={clsx(
                    'flex w-full items-center justify-center px-2 py-1.5 sm:p-3 hover:text-gray-950 transition-colors duration-200 dark:text-gray-500 dark:hover:text-gray-300',
                    { 'text-gray-950 dark:text-gray-200': activeSection === link.href }
                  )}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.href);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
