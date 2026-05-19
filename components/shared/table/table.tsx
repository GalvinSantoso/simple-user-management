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
          {table.getRowModel().rows?.length ? (
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
          Page {pagination.pageIndex + 1} of {Math.ceil(totalCount / pagination.pageSize)}
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
