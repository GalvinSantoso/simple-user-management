"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersTableData, GetUserTableParams } from "../actions/actions";

export const useUserTable = (params: GetUserTableParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersTableData(params),
  });
};
