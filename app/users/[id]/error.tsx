"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ErrorState from "@/components/shared/error-state";

export default function UserDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-md py-16 px-4 flex flex-col items-center justify-center space-y-4">
      <ErrorState
        title="Something Went Wrong"
        description="An error occurred while loading this user's profile. Please try again later or contact support if the issue persists."
        onRetry={reset}
      />
      <Button asChild variant="outline" className="cursor-pointer">
        <Link href="/users">← Back to Users List</Link>
      </Button>
    </div>
  );
}
