"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/shared/error-state";
import { useUserTodos } from "../hooks/useUserTodos";

interface UserTodosProps {
  userId: string;
}

const UserTodos = ({ userId }: UserTodosProps) => {
  const { data: todos, isLoading, error, refetch } = useUserTodos(userId);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load todos", {
        description: error.message || "Could not retrieve user tasks.",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-[75%]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !todos) {
    return (
      <Card>
        <CardContent className="py-12">
          <ErrorState
            title="Error Loading Todos"
            description="Could not load todo list for this user. Please check your connection and try again."
            onRetry={refetch}
          />
        </CardContent>
      </Card>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const displayTodos = isExpanded ? sortedTodos : sortedTodos.slice(0, 5);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Todos</CardTitle>
            <CardDescription>Tasks assignment checklist</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
            >
              {completedCount} Done
            </Badge>
            <Badge
              variant="outline"
              className="text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20"
            >
              {pendingCount} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border/60">
            {displayTodos.map((todo) => (
              <li key={todo.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                {todo.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                )}
                <span
                  className={`text-sm leading-relaxed ${
                    todo.completed
                      ? "line-through text-secondary font-normal"
                      : "text-foreground font-medium"
                  }`}
                >
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      {todos.length > 5 && (
        <div className="px-4 pb-4 pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-secondary hover:underline w-full text-center transition duration-150 cursor-pointer"
          >
            {isExpanded ? "Show Less ←" : `Show All ${todos.length} Todos →`}
          </button>
        </div>
      )}
    </Card>
  );
};

export default UserTodos;
