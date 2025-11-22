"use client";

import { memo, useCallback } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setSortConfig } from "@/store/slices/tokenSlice";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Token } from "@/types/token";
import { cn } from "@/lib/utils";

interface Column {
  key: keyof Token;
  label: string;
  tooltip: string;
  sortable: boolean;
  className?: string;
}

const columns: Column[] = [
  {
    key: "name",
    label: "Token",
    tooltip: "Token name and symbol",
    sortable: true,
    className: "min-w-[80px] xs:min-w-[100px] sm:min-w-[150px]",
  },
  {
    key: "price",
    label: "Price",
    tooltip: "Current token price in USD",
    sortable: true,
    className: "min-w-[70px] xs:min-w-[80px] sm:min-w-[120px]",
  },
  {
    key: "priceChange24h",
    label: "24h Change",
    tooltip: "Price change in the last 24 hours",
    sortable: true,
    className: "min-w-[75px] xs:min-w-[90px] sm:min-w-[120px]",
  },
  {
    key: "volume24h",
    label: "24h Volume",
    tooltip: "Trading volume in the last 24 hours",
    sortable: true,
    className: "min-w-[80px] xs:min-w-[90px] sm:min-w-[140px]",
  },
  {
    key: "liquidity",
    label: "Liquidity",
    tooltip: "Total liquidity pool size",
    sortable: true,
    className: "min-w-[90px] xs:min-w-[100px] sm:min-w-[120px]",
  },
  {
    key: "holders",
    label: "Holders",
    tooltip: "Number of token holders",
    sortable: true,
    className: "min-w-[70px] xs:min-w-[80px] sm:min-w-[100px]",
  },
  {
    key: "createdAt",
    label: "Created",
    tooltip: "Token creation date",
    sortable: true,
    className: "min-w-[90px] xs:min-w-[100px] sm:min-w-[120px]",
  },
  {
    key: "pairAddress",
    label: "Pair Address",
    tooltip: "Token pair contract address",
    sortable: false,
    className: "min-w-[120px] xs:min-w-[150px] sm:min-w-[200px]",
  },
];

/**
 * Table Header Component with sorting functionality
 */
export const TableHeader = memo(function TableHeader() {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.tokens.sortConfig);

  const handleSort = useCallback(
    (key: keyof Token) => {
      const isSameKey = sortConfig.key === key;
      const newDirection =
        isSameKey && sortConfig.direction === "asc" ? "desc" : "asc";

      dispatch(
        setSortConfig({
          key: isSameKey && newDirection === "desc" ? key : key,
          direction: newDirection,
        })
      );
    },
    [dispatch, sortConfig]
  );

  const getSortIcon = (columnKey: keyof Token) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <thead className="bg-muted/30 dark:bg-muted/20 border-b border-border/50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              "px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 text-left text-[9px] xs:text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider",
              column.className
            )}
          >
            {column.sortable ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold hover:bg-transparent text-[9px] xs:text-[10px] sm:text-xs"
                    onClick={() => handleSort(column.key)}
                  >
                    <span className="flex items-center gap-0.5 xs:gap-1">
                      <span className="truncate max-w-[60px] xs:max-w-none">{column.label}</span>
                      {getSortIcon(column.key)}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{column.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger>
                  <span className="font-semibold">{column.label}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{column.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </th>
        ))}
        <th className="px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 text-left text-[9px] xs:text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[60px] xs:min-w-[70px] sm:min-w-[80px] md:min-w-[100px]">
          Actions
        </th>
      </tr>
    </thead>
  );
});

