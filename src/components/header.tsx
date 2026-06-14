import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
};
const Header = ({ showSearch = false, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 border-b border-gray-300 bg-background dark:border-gray-500 dark:bg-background">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link href="/" className="font-bold text-gray-900">
          <Image
            src="/images/multihats.png"
            alt="Multi Hats Logo"
            width={0}
            height={0}
            sizes="100vw"
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
            <Youtube className="h-4 w-4 md:h-7 md:w-7 text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors" />
          </Link>
          <Link href="https://www.instagram.com/multi.hats/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-4 w-4 md:h-6 md:w-6 text-black dark:text-white hover:text-pink-400 dark:hover:text-pink-400 transition-colors" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header