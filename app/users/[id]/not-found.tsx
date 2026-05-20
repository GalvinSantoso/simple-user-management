import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserNotFound() {
  return (
    <div className="container  mx-auto py-16 px-4">
      <Card className="text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">User Not Found</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            The user you are trying to view does not exist or has been deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Button asChild className="w-full cursor-pointer">
            <Link href="/users">Back to Users List</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
