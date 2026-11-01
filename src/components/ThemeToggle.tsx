'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const iconClassName = 'h-4 w-4 md:h-6 md:w-6';

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
    <circle cx="12" cy="12" r="5" />
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
    <path d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" />
  </svg>
);

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className={iconClassName} aria-hidden="true" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        flex items-center cursor-pointer
        text-indigo-600 hover:text-indigo-400
        dark:text-amber-400 dark:hover:text-amber-200
        transition-colors
      "
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
