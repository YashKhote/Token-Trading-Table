import type { Token } from "@/types/token";

export interface SortConfig {
  key: keyof Token | null;
  direction: "asc" | "desc";
}

/**
 * Utility function to sort tokens based on sort configuration
 */
export function sortTokens(
  tokens: Token[],
  sortConfig: SortConfig
): Token[] {
  if (!sortConfig.key) {
    return tokens;
  }

  const sorted = [...tokens].sort((a, b) => {
    const aValue = a[sortConfig.key!];
    const bValue = b[sortConfig.key!];

    // Handle different value types
    if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    }

    // Handle Date objects
    if (
      typeof aValue === "object" &&
      aValue !== null &&
      typeof bValue === "object" &&
      bValue !== null &&
      "getTime" in aValue &&
      "getTime" in bValue
    ) {
      const aDate = aValue as { getTime: () => number };
      const bDate = bValue as { getTime: () => number };
      return aDate.getTime() - bDate.getTime();
    }

    // Fallback to string comparison
    return String(aValue).localeCompare(String(bValue));
  });

  return sortConfig.direction === "desc" ? sorted.reverse() : sorted;
}

