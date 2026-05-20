import React from "react";

interface DetailFieldProps {
  label: string;
  children: React.ReactNode;
}

const DetailField = ({ label, children }: DetailFieldProps) => {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase text-muted-foreground tracking-wider font-medium">
        {label}
      </p>
      <div className="text-sm font-semibold text-foreground">
        {children}
      </div>
    </div>
  );
};

export default DetailField;
