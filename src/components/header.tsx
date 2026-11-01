import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
};

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path
      fillRule="evenodd"
      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zM12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10zM12 9a3 3 0 1 1 0 6a3 3 0 1 1 0-6zM17.3 5.5a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 1 0 0-2.4z"
    />
  </svg>
);

const Header = ({ showSearch = false, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 border-b border-gray-300 bg-background dark:border-gray-500 dark:bg-background">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link href="/" className="font-bold text-gray-900">
          <Image
            src="/images/multihats.png"
            alt="Multi Hats Logo"
            width={32}
            height={32}
            priority={true}
            className="w-6 h-6 md:w-8 md:h-8 object-cover"
          />
        </Link>

        {showSearch && (
          <input
            type="text"
            placeholder="Search city name"
            className="text-xs md:text-sm w-40 h-8 md:w-48 border dark:border-gray-500 px-4 py-2 rounded-lg shadow-sm mr-4 ml-4"
            onChange={(e) => {
              const event = new CustomEvent("search-change", {
                detail: e.target.value,
              });
              window.dispatchEvent(event);
            }}
          />
        )}

        <div className="flex items-center space-x-2">
          <Link href="https://www.youtube.com/@multihatsvideo" target="_blank" aria-label="YouTube">
            <YoutubeIcon className="h-4 w-4 md:h-6 md:w-6 text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors" />
          </Link>
          <Link href="https://www.instagram.com/multi.hats/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon className="h-4 w-4 md:h-6 md:w-6 text-black dark:text-white hover:text-pink-400 dark:hover:text-pink-400 transition-colors" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header