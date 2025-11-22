"use client";

import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";
import { formatLargeNumber } from "@/lib/utils";
import { useMemo } from "react";

export function HeroSection() {
  const tokens = useAppSelector((state) => state.tokens.tokens);

  const stats = useMemo(() => {
    const totalVolume = tokens.reduce((sum, token) => sum + token.volume24h, 0);
    const totalLiquidity = tokens.reduce((sum, token) => sum + token.liquidity, 0);
    const positiveChange = tokens.filter((token) => token.priceChange24h > 0).length;
    const totalHolders = tokens.reduce((sum, token) => sum + token.holders, 0);

    return {
      totalVolume,
      totalLiquidity,
      positiveChange,
      totalHolders,
      totalTokens: tokens.length,
    };
  }, [tokens]);

  return (
    <div className="relative w-full overflow-hidden border-b border-border/50 bg-gradient-to-b from-background via-background to-muted/10 dark:from-background dark:via-background dark:to-muted/5">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 opacity-50"></div>
      
      <div className="relative container mx-auto px-1 xs:px-2 sm:px-3 md:px-4 lg:px-8 py-4 xs:py-6 sm:py-8 md:py-12 lg:py-16">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {/* Total Volume */}
          <div className="bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-blue-500/5 dark:from-blue-500/30 dark:via-blue-500/20 dark:to-blue-500/10 backdrop-blur-md border border-blue-500/30 dark:border-blue-500/40 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 lg:p-6 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start xs:items-center gap-1.5 xs:gap-2 sm:gap-3 mb-1.5 xs:mb-2">
              <div className="p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg bg-blue-500/20 dark:bg-blue-500/30 group-hover:bg-blue-500/30 dark:group-hover:bg-blue-500/40 transition-colors flex-shrink-0">
                <DollarSign className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium truncate leading-tight">Total Volume</p>
                <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground tabular-nums truncate leading-tight mt-0.5">
                  {formatLargeNumber(stats.totalVolume)}
                </p>
              </div>
            </div>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground leading-tight mt-1 xs:mt-1.5">24h trading volume</p>
          </div>

          {/* Total Liquidity */}
          <div className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-purple-500/5 dark:from-purple-500/30 dark:via-purple-500/20 dark:to-purple-500/10 backdrop-blur-md border border-purple-500/30 dark:border-purple-500/40 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 lg:p-6 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start xs:items-center gap-1.5 xs:gap-2 sm:gap-3 mb-1.5 xs:mb-2">
              <div className="p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg bg-purple-500/20 dark:bg-purple-500/30 group-hover:bg-purple-500/30 dark:group-hover:bg-purple-500/40 transition-colors flex-shrink-0">
                <TrendingUp className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium truncate leading-tight">Total Liquidity</p>
                <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground tabular-nums truncate leading-tight mt-0.5">
                  {formatLargeNumber(stats.totalLiquidity)}
                </p>
              </div>
            </div>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground leading-tight mt-1 xs:mt-1.5">Total pool size</p>
          </div>

          {/* Positive Tokens */}
          <div className="bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-orange-500/5 dark:from-orange-500/30 dark:via-orange-500/20 dark:to-orange-500/10 backdrop-blur-md border border-orange-500/30 dark:border-orange-500/40 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 lg:p-6 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start xs:items-center gap-1.5 xs:gap-2 sm:gap-3 mb-1.5 xs:mb-2">
              <div className="p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg bg-orange-500/20 dark:bg-orange-500/30 group-hover:bg-orange-500/30 dark:group-hover:bg-orange-500/40 transition-colors flex-shrink-0">
                <TrendingUp className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium truncate leading-tight">In Profit</p>
                <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground tabular-nums leading-tight mt-0.5">
                  {stats.positiveChange}
                </p>
              </div>
            </div>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground leading-tight mt-1 xs:mt-1.5">Tokens up 24h</p>
          </div>

          {/* Total Holders */}
          <div className="bg-gradient-to-br from-pink-500/20 via-pink-500/10 to-pink-500/5 dark:from-pink-500/30 dark:via-pink-500/20 dark:to-pink-500/10 backdrop-blur-md border border-pink-500/30 dark:border-pink-500/40 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 lg:p-6 hover:border-pink-500/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start xs:items-center gap-1.5 xs:gap-2 sm:gap-3 mb-1.5 xs:mb-2">
              <div className="p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg bg-pink-500/20 dark:bg-pink-500/30 group-hover:bg-pink-500/30 dark:group-hover:bg-pink-500/40 transition-colors flex-shrink-0">
                <Users className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium truncate leading-tight">Total Holders</p>
                <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground tabular-nums truncate leading-tight mt-0.5">
                  {formatLargeNumber(stats.totalHolders)}
                </p>
              </div>
            </div>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground leading-tight mt-1 xs:mt-1.5">Active holders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

