"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ErrorState from "@/components/shared/error-state";

export default function GlobalError({
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
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center space-y-4">
      <ErrorState
        title="Something Went Wrong"
        description="An unexpected error occurred. Please try again later or return to the homepage."
        onRetry={reset}
      />
      <Button asChild variant="outline" className="cursor-pointer">
        <Link href="/">← Back to Home</Link>
      </Button>
    </div>
  );
}
