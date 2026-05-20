"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserTodos } from "../actions/actions";

export const useUserTodos = (userId: string) => {
  return useQuery({
    queryKey: ["user-todos", userId],
    queryFn: () => getUserTodos(userId),
    enabled: !!userId,
  });
};
