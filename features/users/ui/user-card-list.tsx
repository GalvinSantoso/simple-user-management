"use client";

import { PaginationState, OnChangeFn } from "@tanstack/react-table";
import { UserTableData } from "../schema";
import UserCard from "./user-card";
import PaginationControl from "@/components/shared/table/pagination-control";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/shared/error-state";
import { Card, CardContent } from "@/components/ui/card";

interface UserCardListProps {
  data: UserTableData[];
  totalCount: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  isLoading: boolean;
  error?: Error | null;
}

const UserCardList = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  isLoading,
  error = null,
}: UserCardListProps) => {
  if (error) {
    return (
      <div className="py-8">
        <ErrorState
          title="Failed to Load Data"
          description={
            error.message || "An error occurred while loading the users. Please try again."
          }
        />
      </div>
    );
  }

  const startIndex = pagination.pageIndex * pagination.pageSize;
  const totalPages = Math.ceil(totalCount / pagination.pageSize) || 1;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: pagination.pageSize }).map((_, i) => (
            <Card key={`skeleton-${i}`} className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="space-y-2 w-1/2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
                <hr className="border-border/60" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-10" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-10" />
                    <Skeleton className="h-4 w-[60%]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {data.map((user, i) => (
            <UserCard key={user.userId} user={user} index={startIndex + i + 1} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground bg-card border rounded-lg">
          No results found.
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
          <span className="text-sm text-muted-foreground">
            Page {pagination.pageIndex + 1} of {totalPages}
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
      )}
    </div>
  );
};

export default UserCardList;
