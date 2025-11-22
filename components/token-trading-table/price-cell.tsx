"use client";

import { memo, useEffect, useState } from "react";
import { formatPrice, getPriceChangeColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceCellProps {
  price: number;
  previousPrice?: number;
}

/**
 * Price Cell Component with smooth color transitions
 * Shows price change animation when price updates
 */
export const PriceCell = memo(function PriceCell({
  price,
  previousPrice,
}: PriceCellProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(price);

  useEffect(() => {
    if (previousPrice !== undefined && previousPrice !== price) {
      setIsUpdating(true);
      // Smooth price transition
      const interval = setInterval(() => {
        const diff = price - displayPrice;
        if (Math.abs(diff) < 0.01) {
          setDisplayPrice(price);
          clearInterval(interval);
          setTimeout(() => setIsUpdating(false), 800);
        } else {
          setDisplayPrice((prev) => prev + diff * 0.1);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [price, previousPrice, displayPrice]);

  const priceIncreased = previousPrice !== undefined && price > previousPrice;
  const priceDecreased = previousPrice !== undefined && price < previousPrice;

  return (
    <div
      className={cn(
        "text-[10px] xs:text-xs sm:text-sm font-semibold transition-all duration-300",
        isUpdating &&
          (priceIncreased
            ? "text-emerald-600 dark:text-emerald-400 animate-price-up"
            : priceDecreased
            ? "text-red-600 dark:text-red-400 animate-price-down"
            : "text-foreground"),
        !isUpdating && "text-foreground"
      )}
    >
      <span className="tabular-nums truncate block max-w-[80px] xs:max-w-none">{formatPrice(displayPrice)}</span>
    </div>
  );
});

