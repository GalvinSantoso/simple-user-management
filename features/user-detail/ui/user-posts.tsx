"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/shared/error-state";
import { useUserPosts } from "../hooks/useUserPosts";

interface UserPostsProps {
  userId: string;
}

const UserPosts = ({ userId }: UserPostsProps) => {
  const { data: posts, isLoading, error, refetch } = useUserPosts(userId);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load posts", {
        description: error.message || "Could not retrieve user articles.",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-[70%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !posts) {
    return (
      <Card>
        <CardContent className="py-12">
          <ErrorState
            title="Error Loading Posts"
            description="Could not load post list for this user. Please check your connection and try again."
            onRetry={refetch}
          />
        </CardContent>
      </Card>
    );
  }

  const displayPosts = isExpanded ? posts : posts.slice(0, 3);

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Posts</CardTitle>
            <CardDescription>User-published articles and updates</CardDescription>
          </div>
          <Badge
            variant="default"
            className="bg-primary/10 text-primary hover:bg-primary/10 border-primary/20"
          >
            {posts.length} Posts
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/60">
            {displayPosts.map((post) => (
              <article key={post.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <h4 className="text-sm font-semibold text-foreground line-clamp-1 leading-snug">
                  {capitalize(post.title)}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {post.body}
                </p>
              </article>
            ))}
          </div>
        </CardContent>
      </div>
      {posts.length > 3 && (
        <div className="px-4 pb-4 pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-secondary hover:underline w-full text-center transition duration-150 cursor-pointer"
          >
            {isExpanded ? "Show Less ←" : `Show All ${posts.length} Posts →`}
          </button>
        </div>
      )}
    </Card>
  );
};

export default UserPosts;
