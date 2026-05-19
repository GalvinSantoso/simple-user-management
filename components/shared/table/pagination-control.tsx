"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControl = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationControlProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisible = 5;

  const getVisiblePages = () => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="flex items-center justify-center md:justify-end">
      <div className="flex border border-primary/50 text-foreground items-center rounded-full gap-2 py-2 px-4">
        <button
          className="cursor-pointer disabled:opacity-60 disabled:cursor-default"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-5 aspect-square" />
        </button>

        {pages.map((page, i) =>
          typeof page === "number" ? (
            <button
              key={i}
              className={`w-6 h-6 flex items-center justify-center rounded-full font-inter text-xs transition ${
                currentPage === page
                  ? "bg-primary text-primary-foreground cursor-default"
                  : "text-foreground cursor-pointer hover:text-foreground/80 hover:bg-primary/80"
              }`}
              onClick={() => onPageChange(page)}
            >
              <span>{page}</span>
            </button>
          ) : (
            <span key={i} className="px-2 text-zinc-500">
              …
            </span>
          ),
        )}

        <button
          className="cursor-pointer disabled:opacity-60 disabled:cursor-default"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="w-5 aspect-square" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControl;
