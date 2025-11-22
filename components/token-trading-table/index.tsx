"use client";

import { memo, useMemo } from "react";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { ErrorFallback } from "@/components/error/error-fallback";
import { TableSkeleton } from "@/components/loading/table-skeleton";
import { useTokenData } from "@/hooks/useTokenData";
import { useWebSocket } from "@/hooks/useWebSocket";
import { TokenTable } from "./token-table";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Main Token Trading Table Component
 * Handles data fetching, WebSocket updates, and error boundaries
 */
export const TokenTradingTable = memo(function TokenTradingTable() {
  const { data: tokens, isLoading, error } = useTokenData();
  const enabled = !isLoading && tokens !== undefined && tokens.length > 0;

  // Enable WebSocket updates when data is loaded
  useWebSocket(tokens ?? [], enabled);

  // Show loading skeleton
  if (isLoading) {
    return <TableSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorFallback
        error={error as Error}
        resetErrorBoundary={() => window.location.reload()}
      />
    );
  }

  // Show empty state
  if (!tokens || tokens.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">No tokens available</p>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          error={new Error("Failed to render table")}
          resetErrorBoundary={() => window.location.reload()}
        />
      }
    >
      <TooltipProvider>
        <TokenTable tokens={tokens} />
      </TooltipProvider>
    </ErrorBoundary>
  );
});

