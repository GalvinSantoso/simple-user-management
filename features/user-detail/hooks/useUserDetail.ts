"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../actions/actions";

export const useUserDetail = (userId: string) => {
  return useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => getUserDetail(userId),
    enabled: !!userId,
  });
};
