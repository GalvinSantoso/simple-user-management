import React from "react";
import Link from "next/link";
import { UserTableData } from "../schema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SquareArrowUpRight } from "lucide-react";

interface UserCardProps {
  user: UserTableData;
  index: number;
}

const UserCard = ({ user, index }: UserCardProps) => {
  const { userId, name, email, website, post, todo } = user;
  const { completed, pending } = todo;

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground bg-primary/10 rounded px-1.5 py-0.5">
              {index}
            </span>
            <h4 className="text-sm font-bold text-foreground line-clamp-1">{name}</h4>
          </div>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
        <Link href={`/users/${userId}`}>
          <Badge
            variant="default"
            className="rounded-sm hover:opacity-80 p-1.5 cursor-pointer shrink-0"
          >
            <SquareArrowUpRight className="w-4 h-4" />
          </Badge>
        </Link>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <hr className="border-border/60" />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">
              Website
            </p>
            <p className="font-medium">
              <Link
                href={`https://${website}`}
                target="_blank"
                className="text-secondary underline hover:opacity-80 transition break-all"
              >
                {website}
              </Link>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">
              Posts
            </p>
            <p className="font-semibold text-foreground">{post} posts</p>
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">
            Todos Summary
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {completed} Completed
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {pending} Pending
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
