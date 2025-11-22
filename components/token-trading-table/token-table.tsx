"use client";

import { memo, useMemo } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { TokenRow } from "./token-row";
import { TableHeader } from "./table-header";
import type { Token } from "@/types/token";
import { sortTokens } from "@/lib/sortUtils";

interface TokenTableProps {
  tokens: Token[];
}

/**
 * Token Table Component with sorting support
 * Memoized for performance optimization
 */
export const TokenTable = memo(function TokenTable({
  tokens,
}: TokenTableProps) {
  const sortConfig = useAppSelector((state) => state.tokens.sortConfig);

  // Sort tokens based on current sort configuration
  const sortedTokens = useMemo(() => {
    return sortTokens(tokens, sortConfig);
  }, [tokens, sortConfig]);

  // Group tokens by category
  const groupedTokens = useMemo(() => {
    const groups: Record<string, Token[]> = {
      "new-pairs": [],
      "final-stretch": [],
      migrated: [],
    };

    sortedTokens.forEach((token) => {
      if (groups[token.category]) {
        groups[token.category].push(token);
      }
    });

    return groups;
  }, [sortedTokens]);

  return (
    <>
      {/* New Pairs Section */}
      <section id="new-pairs" className="scroll-mt-48 mb-8">
        <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg backdrop-blur-sm">
          <div className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5">
            <div className="px-2 xs:px-3 sm:px-4 lg:px-6 py-2.5 xs:py-3 sm:py-4 border-b border-border/50">
              <div className="flex items-center gap-1.5 xs:gap-2 mb-0.5 xs:mb-1">
                <div className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></div>
                <h2 className="text-sm xs:text-base sm:text-lg font-bold text-foreground truncate">New Pairs</h2>
              </div>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground ml-3.5 xs:ml-4">
                Recently added token pairs
              </p>
            </div>
        <div className="overflow-x-auto -mx-1 xs:-mx-2 sm:-mx-4 lg:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-visible">
              <table className="w-full min-w-[900px] sm:min-w-[1100px] lg:min-w-full">
                <TableHeader />
                <tbody>
                  {groupedTokens["new-pairs"].map((token) => (
                    <TokenRow key={token.id} token={token} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Final Stretch Section */}
      <section id="final-stretch" className="scroll-mt-48 mb-8">
        <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg backdrop-blur-sm">
          <div className="border-b border-border/50 bg-gradient-to-r from-orange-500/5 via-orange-500/3 to-transparent dark:from-orange-500/10 dark:via-orange-500/5">
            <div className="px-2 xs:px-3 sm:px-4 lg:px-6 py-2.5 xs:py-3 sm:py-4 border-b border-border/50">
              <div className="flex items-center gap-1.5 xs:gap-2 mb-0.5 xs:mb-1">
                <div className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                <h2 className="text-sm xs:text-base sm:text-lg font-bold text-foreground truncate">Final Stretch</h2>
              </div>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground ml-3.5 xs:ml-4">
                Tokens approaching final milestones
              </p>
            </div>
        <div className="overflow-x-auto -mx-1 xs:-mx-2 sm:-mx-4 lg:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-visible">
              <table className="w-full min-w-[900px] sm:min-w-[1100px] lg:min-w-full">
                <TableHeader />
                <tbody>
                  {groupedTokens["final-stretch"].map((token) => (
                    <TokenRow key={token.id} token={token} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Migrated Section */}
      <section id="migrated" className="scroll-mt-48 mb-8">
        <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg backdrop-blur-sm">
          <div className="bg-gradient-to-r from-blue-500/5 via-blue-500/3 to-transparent dark:from-blue-500/10 dark:via-blue-500/5">
            <div className="px-2 xs:px-3 sm:px-4 lg:px-6 py-2.5 xs:py-3 sm:py-4 border-b border-border/50">
              <div className="flex items-center gap-1.5 xs:gap-2 mb-0.5 xs:mb-1">
                <div className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <h2 className="text-sm xs:text-base sm:text-lg font-bold text-foreground truncate">Migrated</h2>
              </div>
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground ml-3.5 xs:ml-4">
                Tokens that have been migrated
              </p>
            </div>
        <div className="overflow-x-auto -mx-1 xs:-mx-2 sm:-mx-4 lg:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-visible">
              <table className="w-full min-w-[900px] sm:min-w-[1100px] lg:min-w-full">
                <TableHeader />
                <tbody>
                  {groupedTokens["migrated"].map((token) => (
                    <TokenRow key={token.id} token={token} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>
    </>
  );
});

