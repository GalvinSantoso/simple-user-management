import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavigationTitleProps {
  title: string;
  desc: string;
  backUrl?: string;
}

const NavigationTitle = ({ title, desc, backUrl }: NavigationTitleProps) => {
  return (
    <div className="flex items-center gap-4">
      {!!backUrl && (
        <Link
          className="p-2 border-2 border-primary rounded-full transition duration-100 hover:bg-gray-100"
          href={backUrl}
        >
          <ArrowLeft />
        </Link>
      )}
      <div className="space-y-1">
        <h3 className="text-foreground text-lg md:text-xl xl:text-2xl">{title}</h3>
        <p className="text-muted-foreground text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
};

export default NavigationTitle;
