"use client";

import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { useUserTable } from "../hooks/useUserTable";
import UserToolbar from "./user-toolbar";
import { userColumns } from "./column";
import { Table } from "@/components/shared/table";
import UserCardList from "./user-card-list";
import { toast } from "sonner";

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
    filter,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load user list", {
        description: error.message || "An error occurred while fetching users.",
      });
    }
  }, [error]);

  const columns = userColumns();

  return (
    <div className="space-y-4">
      <UserToolbar
        search={search}
        onSearchChange={(val: string) => setSearch(val.trim())}
        onFilterChange={(val: string[]) => setFilter(val ?? [])}
      />

      <div className="hidden md:block xl:block">
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
          error={error}
        />
      </div>

      <div className="block md:hidden xl:hidden">
        <UserCardList
          data={users?.data ?? []}
          totalCount={users?.totalCount ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isUsersLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default UserTable;
