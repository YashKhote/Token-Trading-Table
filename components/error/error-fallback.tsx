"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Failed to load tokens</h2>
        <p className="text-muted-foreground mb-4 max-w-md">
          {error.message || "Unable to fetch token data. Please try again."}
        </p>
        <Button onClick={resetErrorBoundary}>Retry</Button>
      </div>
    </div>
  );
}

