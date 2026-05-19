"use client";

import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useUserTable } from "../hooks/useUserTable";
import UserToolbar from "./user-toolbar";
import { userColumns } from "./column";
import { Table } from "@/components/shared/table";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const {
    data: users,
    isLoading: isUsersLoading,
    error,
  } = useUserTable({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search,
    sorting,
    filter
  });

  const columns = userColumns();

  return (
    <div className="space-y-4">
      <UserToolbar
        search={search}
        onSearchChange={(val: string) => setSearch(val.trim())}
        onFilterChange={(val: string[]) => setFilter(val ?? [])}
      />
      <Table
        data={users?.data ?? []}
        columns={columns}
        totalCount={users?.totalCount ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        globalFilter={search}
        onGlobalFilterChange={setSearch}
        isLoading={isUsersLoading}
      />
    </div>
  );
};

export default UserTable;
