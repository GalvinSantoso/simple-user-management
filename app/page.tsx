import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
      <Badge variant="outline" className="text-foreground py-4 px-6">
        ✨ Easy Management
      </Badge>

      <div className="flex flex-col items-center gap-y-6">
        <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight md:text-7xl">
          One tool to{" "}
          <span className="text-primary underline decoration-primary/30 underline-offset-8">
            manage users
          </span>{" "}
          and your team
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed text-center sm:text-xl">
          UserOps helps admins work faster, smarter, and more efficiently, delivering the visibility
          and data-driven insights to mitigate risk and ensure compliance.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/users">
          <Button size="xl">Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
