"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrollTop > 300);
      setProgress(maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`group fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 active:scale-95 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white dark:focus-visible:ring-white/40 ${
        show
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          className="stroke-black/10 dark:stroke-white/10"
        />
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="stroke-current transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      <span className="relative h-5 w-5 overflow-hidden">
        <ArrowUp className="absolute inset-0 h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-full" />
        <ArrowUp className="absolute inset-0 h-5 w-5 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
      </span>
    </button>
  );
}
