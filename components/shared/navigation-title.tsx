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
      <Link
        className="p-2 border-2 border-primary rounded-full transition duration-100 hover:bg-gray-100"
        href="/"
      >
        <ArrowLeft />
      </Link>
      <div className="space-y-1">
        <h3 className="text-brand-primary">Add Form</h3>
        <p className="text-foreground-200">
          A simple form template to add new records to the system.
        </p>
      </div>
    </div>
  );
};

export default NavigationTitle;
