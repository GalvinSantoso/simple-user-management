"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  TableBody,
  TableCell,
  Table as TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import PaginationControl from "./pagination-control";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/shared/error-state";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalCount: number;

  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;

  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;

  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;

  isLoading: boolean;
  error?: Error | null;
}

const Table = <T,>({
  data,
  columns,
  totalCount,
  pagination,
  onPaginationChange,

  sorting,
  onSortingChange,

  globalFilter,
  onGlobalFilterChange,

  isLoading,
  error = null,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    onPaginationChange,
    onSortingChange,
    onGlobalFilterChange,
  });

  if (error) {
    return (
      <div className="grid grid-cols-1 gap-y-4 py-8">
        <ErrorState
          title="Failed to Load Data"
          description={
            error.message || "An error occurred while loading the data. Please try again."
          }
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <TableContainer>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="bg-primary/10 py-4" key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: pagination.pageSize }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {columns.map((_, j) => (
                  <TableCell key={`skeleton-cell-${i}-${j}`} className="py-4">
                    <Skeleton className="h-4 w-[85%]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableContainer>
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Page {pagination.pageIndex + 1} of {Math.ceil(totalCount / pagination.pageSize) || 1}
        </span>

        <PaginationControl
          currentPage={pagination.pageIndex + 1}
          totalItems={totalCount}
          itemsPerPage={pagination.pageSize}
          onPageChange={(page) => {
            onPaginationChange({
              ...pagination,
              pageIndex: page - 1,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Table;
