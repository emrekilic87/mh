import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
};

export default function Header({ showSearch = false }: { showSearch?: boolean }) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 border-b border-gray-200 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link href="/" className="text-xl font-bold text-gray-900">
          Multi Hats
        </Link>

        {showSearch && (
          <input
            type="text"
            placeholder="Search post..."
            className="border px-4 py-2 rounded-lg shadow-sm w-64 mr-4"
            onChange={(e) => {
              const event = new CustomEvent("search-change", {
                detail: e.target.value,
              });
              window.dispatchEvent(event);
            }}
          />
        )}

        <div className="flex space-x-2">
          <Link href="https://www.youtube.com/@multihatsvideo" target="_blank" aria-label="YouTube">
            <Youtube className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors" />
          </Link>
          <Link href="https://www.instagram.com/multi.hats" target="_blank" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-gray-600 hover:text-pink-500 transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
}
