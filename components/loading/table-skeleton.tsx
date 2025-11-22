"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

export const TableSkeleton = memo(function TableSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      {/* New Pairs Section Skeleton */}
      <div className="border-b bg-muted/30">
        <div className="px-3 sm:px-6 py-3">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {Array.from({ length: 9 }).map((_, i) => (
                  <th key={i} className="px-2 sm:px-4 lg:px-6 py-3">
                    <Skeleton className="h-4 w-16 sm:w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </td>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <Skeleton className="h-4 w-16 sm:w-20" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Stretch Section Skeleton */}
      <div className="border-b bg-muted/20">
        <div className="px-3 sm:px-6 py-3">
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {Array.from({ length: 9 }).map((_, i) => (
                  <th key={i} className="px-2 sm:px-4 lg:px-6 py-3">
                    <Skeleton className="h-4 w-16 sm:w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </td>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <Skeleton className="h-4 w-16 sm:w-20" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Migrated Section Skeleton */}
      <div>
        <div className="px-3 sm:px-6 py-3">
          <Skeleton className="h-6 w-20 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {Array.from({ length: 9 }).map((_, i) => (
                  <th key={i} className="px-2 sm:px-4 lg:px-6 py-3">
                    <Skeleton className="h-4 w-16 sm:w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </td>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <Skeleton className="h-4 w-16 sm:w-20" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

