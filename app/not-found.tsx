import Link from "next/link";
import { Button } from "@/components/ui/button";
import ErrorState from "@/components/shared/error-state";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center space-y-4">
      <ErrorState
        title="Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
      />
      <Button asChild variant="outline" className="cursor-pointer">
        <Link href="/">← Back to Home</Link>
      </Button>
    </div>
  );
}
