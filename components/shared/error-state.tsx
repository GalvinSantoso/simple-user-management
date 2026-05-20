import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState = ({
  title = "Something Went Wrong",
  description = "An error occurred. Please try again later.",
  onRetry,
  className = "",
}: ErrorStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md mx-auto ${className}`}
    >
      <div className="bg-destructive/10 text-destructive rounded-full p-3 w-16 h-16 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="default" className="cursor-pointer gap-2 mt-2">
          <RefreshCcw className="w-4 h-4" />
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
