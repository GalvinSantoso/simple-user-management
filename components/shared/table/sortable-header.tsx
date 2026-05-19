"use client";

import cn from "@/libs/cn";
import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SortableHeaderProps<T> {
  column: Column<T>;
  label: string;
  className?: string;
}

export function SortableHeader<T>({ column, label, className }: SortableHeaderProps<T>) {
  const isSorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting()}
      className={cn("group flex items-center gap-1 select-none cursor-pointer", className)}
    >
      <span>{label}</span>

      <span
        className={cn(
          "transition-opacity",
          isSorted ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        {isSorted === "asc" && <ArrowUp className="w-3 h-3" />}
        {isSorted === "desc" && <ArrowDown className="w-3 h-3" />}
        {!isSorted && <ArrowDown className="w-3 h-3 opacity-60" />}
      </span>
    </button>
  );
}
