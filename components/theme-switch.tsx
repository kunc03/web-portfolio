'use client';

import React, { useEffect, useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

type Theme = 'light' | 'dark';

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;

    const performThemeChange = (newTheme: Theme) => {
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      performThemeChange(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      performThemeChange(nextTheme);
    });

    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;

    if (localTheme) {
      setTheme(localTheme);

      if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button
      className="fixed bottom-10 right-10 bg-sky-50 w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 "
      onClick={toggleTheme}
    >
      {theme === 'light' ? <BsSun className="" /> : <BsMoon />}
    </button>
  );
}
