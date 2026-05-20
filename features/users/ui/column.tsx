import Link from "next/link";
import { Eye, SquareArrowUpRight } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/shared/table/sortable-header";
import { Badge } from "@/components/ui/badge";
import { UserTableData } from "../schema";

export const userColumns = (): ColumnDef<UserTableData>[] => [
  {
    id: "index",
    header: "No",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return pageIndex * pageSize + row.index + 1;
    },
    size: 50,
  },
  {
    id: "name",
    header: ({ column }) => <SortableHeader column={column} label="Name" />,
    accessorKey: "name",
    size: 250,
    cell: ({ row }) => (
      <span className="block truncate max-w-[220px]" title={row.original.name}>
        {row.original.name}
      </span>
    ),
  },
  {
    id: "email",
    header: ({ column }) => <SortableHeader column={column} label="Email" />,
    accessorKey: "email",
    size: 250,
    cell: ({ row }) => (
      <span className="block truncate max-w-[220px]" title={row.original.email}>
        {row.original.email}
      </span>
    ),
  },
  {
    id: "website",
    header: ({ column }) => <SortableHeader column={column} label="Website" />,
    accessorKey: "website",
    cell: ({ row }) => {
      const { website } = row.original;
      return (
        <Link
          href={`https://${website}`}
          target="_blank"
          className="text-secondary underline font-medium cursor-pointer transition duration-150 hover:opacity-80"
        >
          {website}
        </Link>
      );
    },
    size: 250,
  },
  {
    id: "post",
    header: ({ column }) => <SortableHeader column={column} label="Posts" />,
    accessorKey: "post",
    cell: ({ row }) => <span>{row.original.post} posts</span>,
  },
  {
    id: "todo",
    header: "Todos",
    accessorKey: "todo",
    cell: ({ row }) => {
      const { completed, pending } = row.original.todo;
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{completed} Completed</Badge>
          <Badge variant="outline">{pending} Pending</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => {
      const { userId } = row.original;
      return (
        <Link className="" href={`/users/${userId}`}>
          <Badge variant="default" className="rounded-sm hover:opacity-80">
            <SquareArrowUpRight className="w-4 aspect-square" />
          </Badge>
        </Link>
      );
    },
  },
];
