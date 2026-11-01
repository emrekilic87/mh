"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SEARCH_DEBOUNCE_MS = 300;
const inputClassName = "text-xs md:text-sm w-40 h-8 md:w-48 border dark:border-gray-500 px-4 py-2 rounded-lg shadow-sm mr-4 ml-4";

function SearchField() {
  const router = useRouter();
  const pathname = usePathname();
  const q = useSearchParams().get("q") ?? "";
  const [value, setValue] = useState(q);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Header sayfalar arasında mount'lu kaldığı için input URL ile eşitlenir; anasayfada yazarken gecikmeli gelen URL metni ezmesin
  useEffect(() => {
    if (pathname !== "/" || document.activeElement !== inputRef.current) setValue(q);
  }, [q, pathname]);

  const applySearch = (text: string) => {
    clearTimeout(timerRef.current);
    const query = text.trim();
    if (query === q) return;

    const href = query ? `/?q=${encodeURIComponent(query)}` : "/";
    // Detay sayfasından çıkış geçmişte kalsın, anasayfadaki her harf geçmişe yazılmasın
    if (pathname === "/") router.replace(href);
    else router.push(href);
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        applySearch(value);
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search city or country"
        aria-label="Search city or country"
        className={inputClassName}
        value={value}
        onChange={(e) => {
          const text = e.target.value;
          setValue(text);
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => applySearch(text), SEARCH_DEBOUNCE_MS);
        }}
        // Kullanıcı bir linke tıkladıysa bekleyen arama onu geri çekmesin
        onBlur={() => clearTimeout(timerRef.current)}
      />
    </form>
  );
}

// useSearchParams statik sayfalarda Suspense sınırı ister
export default function SearchInput() {
  return (
    <Suspense
      fallback={
        <input
          type="text"
          placeholder="Search city or country"
          aria-label="Search city or country"
          className={inputClassName}
          readOnly
        />
      }
    >
      <SearchField />
    </Suspense>
  );
}
