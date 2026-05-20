"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../actions/actions";

export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};
