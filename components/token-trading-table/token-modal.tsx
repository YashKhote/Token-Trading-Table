"use client";

import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice, formatPercent, formatLargeNumber, getPriceChangeColor } from "@/lib/utils";
import { ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Token } from "@/types/token";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TokenModalProps {
  token: Token;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Token Details Modal Component
 * Shows comprehensive token information
 */
export const TokenModal = memo(function TokenModal({
  token,
  open,
  onOpenChange,
}: TokenModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(token.pairAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "new-pairs":
        return "New Pairs";
      case "final-stretch":
        return "Final Stretch";
      case "migrated":
        return "Migrated";
      default:
        return category;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-1rem)] xs:max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto border-border/50 shadow-2xl mx-2 xs:mx-4">
        <DialogHeader>
          <DialogTitle className="text-lg xs:text-xl sm:text-2xl flex items-center gap-2 xs:gap-3">
            <div className="flex-shrink-0 h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg ring-1 xs:ring-2 ring-primary/20 dark:ring-primary/30">
              <span className="text-base xs:text-lg font-bold text-primary-foreground">
                {token.symbol.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-bold truncate">{token.name}</div>
              <div className="text-xs xs:text-sm font-normal text-muted-foreground">
                {token.symbol}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Detailed information about {token.name} ({token.symbol})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 xs:space-y-5 sm:space-y-6 mt-3 xs:mt-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs xs:text-sm text-muted-foreground">Category:</span>
              <span className="px-2 xs:px-3 py-0.5 xs:py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs xs:text-sm font-semibold border border-primary/20">
              {getCategoryLabel(token.category)}
            </span>
          </div>

          {/* Price Information */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
            <div className="space-y-1 p-3 xs:p-4 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/50">
              <p className="text-xs xs:text-sm text-muted-foreground font-medium">Current Price</p>
              <p className="text-lg xs:text-xl sm:text-2xl font-bold text-foreground tabular-nums truncate">{formatPrice(token.price)}</p>
            </div>
            <div className={cn(
              "space-y-1 p-3 xs:p-4 rounded-lg border",
              token.priceChange24h > 0 
                ? "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20"
                : token.priceChange24h < 0
                ? "bg-red-500/10 dark:bg-red-500/20 border-red-500/20"
                : "bg-muted/30 dark:bg-muted/20 border-border/50"
            )}>
              <p className="text-xs xs:text-sm text-muted-foreground font-medium">24h Change</p>
              <p
                className={cn(
                  "text-lg xs:text-xl sm:text-2xl font-bold tabular-nums",
                  getPriceChangeColor(token.priceChange24h)
                )}
              >
                {formatPercent(token.priceChange24h)}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
            <div className="space-y-1 p-3 xs:p-4 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border/50">
              <p className="text-xs xs:text-sm text-muted-foreground">24h Volume</p>
              <p className="text-base xs:text-lg font-bold text-foreground truncate">
                {formatLargeNumber(token.volume24h)}
              </p>
            </div>
            <div className="space-y-1 p-3 xs:p-4 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border/50">
              <p className="text-xs xs:text-sm text-muted-foreground">Liquidity</p>
              <p className="text-base xs:text-lg font-bold text-foreground truncate">
                {formatLargeNumber(token.liquidity)}
              </p>
            </div>
            <div className="space-y-1 p-3 xs:p-4 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border/50">
              <p className="text-xs xs:text-sm text-muted-foreground">Holders</p>
              <p className="text-base xs:text-lg font-bold text-foreground">
                {token.holders.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1 p-3 xs:p-4 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border/50">
              <p className="text-xs xs:text-sm text-muted-foreground">Created</p>
              <p className="text-sm xs:text-base sm:text-lg font-bold text-foreground">
                {formatDate(token.createdAt)}
              </p>
            </div>
          </div>

          {/* Pair Address */}
          <div className="space-y-2">
            <p className="text-xs xs:text-sm font-medium">Pair Address</p>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <code className="flex-1 text-[10px] xs:text-xs bg-muted/50 dark:bg-muted/30 p-2 xs:p-3 rounded-md break-all font-mono border border-border/50 min-w-0">
                {token.pairAddress}
              </code>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 xs:h-8 xs:w-8 flex-shrink-0"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy address"}</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 xs:h-8 xs:w-8 flex-shrink-0"
                onClick={() =>
                  window.open(
                    `https://etherscan.io/address/${token.pairAddress}`,
                    "_blank"
                  )
                }
              >
                <ExternalLink className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-2 pt-3 xs:pt-4">
            <Button
              className="flex-1 text-xs xs:text-sm"
              onClick={() =>
                window.open(
                  `https://etherscan.io/address/${token.pairAddress}`,
                  "_blank"
                )
              }
            >
              <ExternalLink className="mr-1.5 xs:mr-2 h-3.5 w-3.5 xs:h-4 xs:w-4" />
              <span className="truncate">View on Etherscan</span>
            </Button>
            <Button variant="outline" className="text-xs xs:text-sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

