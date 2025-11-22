"use client";

import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  width?: string;
}

export function Shimmer({ className, width = "w-full" }: ShimmerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        width,
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer-slide bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="h-full w-full bg-muted" />
    </div>
  );
}

export function ShimmerRow() {
  return (
    <div className="flex items-center gap-4 border-b p-4">
      <Shimmer className="h-4 w-32" />
      <Shimmer className="h-4 w-16" />
      <Shimmer className="h-4 w-24" />
      <Shimmer className="h-4 w-20" />
      <Shimmer className="h-4 w-20" />
      <Shimmer className="h-4 w-16" />
      <Shimmer className="h-4 w-20" />
      <Shimmer className="h-4 w-16" />
      <Shimmer className="h-4 w-16" />
    </div>
  );
}

