'use client';

import { useEffect, useRef, useState } from 'react';
import { PROJECT_IMAGE_KEYS } from '@/lib/project-images';

type ProjectImageKey = (typeof PROJECT_IMAGE_KEYS)[number];

// Mapping key → path file gambar di /public
const IMAGE_PATHS: Record<ProjectImageKey, string> = {
  aichiGurutto: '/aichi-gurutto.png',
  gachaRogaining: '/rogaining.png',
  gachaEndoji: '/gacha-endoji.png',
  manrisk: '/manrisk.png',
  dclinic: '/dclinic.png',
  jprefund: '/jprefund.png',
  store: '/store.png',
  shopper: '/shopper.png',
  rentCar: '/rentCar.png',
  kopiq: '/kopiQ.png',
};

interface ImageKeySelectProps {
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export default function ImageKeySelect({ name = 'imageKey', defaultValue = PROJECT_IMAGE_KEYS[0], disabled }: ImageKeySelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(
    PROJECT_IMAGE_KEYS.includes(defaultValue as ProjectImageKey) ? defaultValue : PROJECT_IMAGE_KEYS[0]
  );
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const selectedPath = IMAGE_PATHS[selected as ProjectImageKey];

  return (
    <div ref={ref} className="relative w-64" aria-disabled={disabled}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected} />

      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={[
          'w-full h-10 flex items-center gap-2.5 px-3 rounded-lg text-sm',
          'bg-white dark:bg-black/20',
          'ring-1 ring-inset ring-black/10 dark:ring-white/10',
          'hover:ring-black/20 dark:hover:ring-white/20',
          'focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20',
          'transition-shadow duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          open ? 'ring-2 ring-black/20 dark:ring-white/20' : '',
        ].join(' ')}
      >
        {/* Thumbnail */}
        {selectedPath && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selectedPath}
            alt={selected}
            className="h-6 w-9 rounded object-cover shrink-0 ring-1 ring-black/10"
          />
        )}
        <span className="flex-1 text-left text-gray-800 dark:text-white/90 truncate">{selected}</span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 dark:text-white/40 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className={[
            'absolute z-50 mt-1.5 w-full',
            'bg-white dark:bg-gray-900',
            'rounded-xl shadow-lg shadow-black/10 dark:shadow-black/40',
            'ring-1 ring-black/8 dark:ring-white/10',
            'overflow-hidden',
            'animate-in fade-in slide-in-from-top-1 duration-150',
          ].join(' ')}
        >
          <ul className="max-h-64 overflow-y-auto py-1">
            {PROJECT_IMAGE_KEYS.map((key) => {
              const isActive = key === selected;
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(key);
                      setOpen(false);
                    }}
                    className={[
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                      'transition-colors duration-100',
                      isActive
                        ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium'
                        : 'text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/5',
                    ].join(' ')}
                  >
                    {/* Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={IMAGE_PATHS[key]}
                      alt={key}
                      className="h-7 w-11 rounded object-cover shrink-0 ring-1 ring-black/10 dark:ring-white/10"
                    />
                    <span className="truncate">{key}</span>
                    {/* Check mark for active */}
                    {isActive && (
                      <svg className="ml-auto w-4 h-4 text-gray-600 dark:text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
