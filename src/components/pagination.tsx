import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  search?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  search = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageHref = (page: number) =>
    `/?page=${page}${search ? `&q=${encodeURIComponent(search)}` : ""}`;

  const visiblePages = [];
  const start = Math.max(currentPage - 2, 1);
  const end = Math.min(currentPage + 2, totalPages);

  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="flex justify-center mt-8 mb-6 space-x-2 items-center">
      {currentPage > 1 && (
        <Link
          href={getPageHref(1)}
          className="px-3 py-1 rounded-md border bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
        >
          <ChevronLeft size={24} />
        </Link>
      )}

      {visiblePages.map((page) => (
        <Link
          key={page}
          href={getPageHref(page)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === page
              ? "bg-gray-700 dark:bg-white text-white dark:text-gray-700"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={getPageHref(totalPages)}
          className="px-3 py-1 rounded-md border bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
        >
          <ChevronRight size={24} />
        </Link>
      )}
    </div>
  );
}
