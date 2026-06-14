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

        <Link href="/" className="text-xl font-bold text-gray-900">
          <Image
            src="/images/multihats.png"
            alt="Multi Hats Logo"
            width={40}
            height={40}
            priority={true}
            className="w-full object-cover"
          />
        </Link>

        {showSearch && (
          <input
            type="text"
            placeholder="Search city name"
            className="border px-4 py-2 rounded-lg shadow-sm w-64 mr-4 ml-4"
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
            <Youtube className="h-7 w-7 text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors" />
          </Link>
          <Link href="https://www.instagram.com/multi.hats/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-black dark:text-white hover:text-pink-400 dark:hover:text-pink-400 transition-colors" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header