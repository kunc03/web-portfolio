'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
};

export default function AdminSidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="p-2">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'group relative block rounded-xl px-3 py-2.5 text-sm font-medium text-center sm:text-left',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20',
                  isActive
                    ? 'bg-gray-900 text-white dark:bg-white/15 dark:text-white'
                    : 'text-gray-800 dark:text-white/85 hover:bg-black/5 dark:hover:bg-white/10',
                ].join(' ')}
              >
                <span
                  className={[
                    'pointer-events-none absolute left-2 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full sm:block',
                    isActive ? 'bg-white dark:bg-white' : 'bg-transparent',
                  ].join(' ')}
                />
                <span className="sm:pl-3">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

