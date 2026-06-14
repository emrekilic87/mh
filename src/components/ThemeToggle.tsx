'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="
        relative flex items-center gap-2 px-1 py-0
        rounded-full border border-border
        bg-background text-foreground
        dark:bg-background dark:text-foreground
        hover:bg-black transition-colors
        dark:hover:bg-white
        text-sm font-normal
      "
    >
      <span className="text-base cursor-pointer">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}