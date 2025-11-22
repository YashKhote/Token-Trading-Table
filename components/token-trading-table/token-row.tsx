"use client";

import { memo, useState } from "react";
import { ExternalLink, Copy } from "lucide-react";
import { formatPrice, formatPercent, formatLargeNumber, getPriceChangeColor } from "@/lib/utils";
import { TokenModal } from "./token-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Token } from "@/types/token";
import { cn } from "@/lib/utils";
import { PriceCell } from "./price-cell";

interface TokenRowProps {
  token: Token;
}

/**
 * Individual Token Row Component
 * Memoized for performance optimization
 */
export const TokenRow = memo(function TokenRow({ token }: TokenRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <tr
        className={cn(
          "border-b border-border/30 transition-all duration-200 hover:bg-muted/50 dark:hover:bg-muted/30 cursor-pointer group",
          token.previousPrice !== undefined &&
            token.previousPrice !== token.price &&
            (token.price > token.previousPrice
              ? "animate-price-up bg-emerald-500/5 dark:bg-emerald-500/10"
              : "animate-price-down bg-red-500/5 dark:bg-red-500/10")
        )}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Token Name */}
        <td className="px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 whitespace-nowrap">
          <div className="flex items-center min-w-0">
            <div className="flex-shrink-0 h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center mr-1.5 xs:mr-2 sm:mr-3 shadow-lg ring-1 xs:ring-2 ring-primary/20 dark:ring-primary/30">
              <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-primary-foreground">
                {token.symbol.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] xs:text-xs sm:text-sm font-semibold text-foreground truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none group-hover:text-primary transition-colors">
                {token.name}
              </div>
              <div className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground font-medium truncate">
                {token.symbol}
              </div>
            </div>
          </div>
        </td>

        {/* Price */}
        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
          <PriceCell price={token.price} previousPrice={token.previousPrice} />
        </td>

        {/* 24h Change */}
        <td
          className={cn(
            "px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 whitespace-nowrap text-[10px] xs:text-xs sm:text-sm font-semibold"
          )}
        >
          <span className={cn(
            "inline-flex items-center gap-0.5 xs:gap-1 px-1 xs:px-1.5 sm:px-2 py-0.5 rounded text-[9px] xs:text-[10px] sm:text-xs",
            token.priceChange24h > 0 
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
              : token.priceChange24h < 0
              ? "bg-red-500/10 text-red-600 dark:text-red-400"
              : "bg-muted text-muted-foreground"
          )}>
            <span className="hidden xs:inline">{token.priceChange24h > 0 && "↑"}{token.priceChange24h < 0 && "↓"}</span>
            {formatPercent(token.priceChange24h)}
          </span>
        </td>

        {/* 24h Volume */}
        <td className="px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 whitespace-nowrap text-[10px] xs:text-xs sm:text-sm text-foreground">
          <span className="truncate block max-w-[80px] xs:max-w-none">{formatLargeNumber(token.volume24h)}</span>
        </td>

        {/* Liquidity */}
        <td className="px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 whitespace-nowrap text-[10px] xs:text-xs sm:text-sm text-foreground">
          <span className="truncate block">{formatLargeNumber(token.liquidity)}</span>
        </td>

        {/* Holders */}
        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">
                {token.holders.toLocaleString()}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{token.holders.toLocaleString()} token holders</p>
            </TooltipContent>
          </Tooltip>
        </td>

        {/* Created At */}
        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted-foreground">
          {formatDate(token.createdAt)}
        </td>

        {/* Pair Address */}
        <td className="px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 whitespace-nowrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-[9px] xs:text-[10px] sm:text-xs h-auto py-1">
                <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[120px] block">
                  {token.pairAddress.slice(0, 6)}...{token.pairAddress.slice(-4)}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-1rem)] xs:w-80 max-w-[calc(100vw-2rem)] border-border/50 shadow-xl">
              <div className="space-y-3">
                <div>
                  <p className="text-xs xs:text-sm font-semibold mb-2">Pair Address</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[10px] xs:text-xs bg-muted/50 dark:bg-muted/30 p-2 xs:p-2.5 rounded-md break-all border border-border/50">
                      {token.pairAddress}
                    </code>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyAddress();
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copied!" : "Copy address"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://etherscan.io/address/${token.pairAddress}`,
                      "_blank"
                    );
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Etherscan
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </td>

        {/* Actions */}
        <td className="px-1 xs:px-1.5 sm:px-2 lg:px-4 xl:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 whitespace-nowrap min-w-[60px] xs:min-w-[70px] sm:min-w-[80px] md:min-w-[100px]">
          <div className="flex items-center gap-1 xs:gap-2">
            <Button
              variant="default"
              size="sm"
              className="h-7 xs:h-8 sm:h-9 text-[9px] xs:text-[10px] sm:text-xs px-2 xs:px-3 w-full xs:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              Trade
            </Button>
          </div>
        </td>
      </tr>

      <TokenModal
        token={token}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
});

