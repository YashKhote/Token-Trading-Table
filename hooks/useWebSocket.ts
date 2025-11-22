import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateToken } from "@/store/slices/tokenSlice";
import type { Token } from "@/types/token";

/**
 * Custom hook for mocking WebSocket connection for real-time price updates
 * In production, this would connect to an actual WebSocket server
 */
export function useWebSocket(
  tokens: Token[],
  enabled: boolean = true
): void {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updatePrices = useCallback(() => {
    tokens.forEach((token) => {
      // Simulate price changes with random fluctuations
      const changePercent = (Math.random() - 0.5) * 4; // -2% to +2%
      const newPrice = token.price * (1 + changePercent / 100);

      const updatedToken: Token = {
        ...token,
        previousPrice: token.price,
        price: Math.max(0.000001, newPrice), // Ensure price doesn't go negative
        priceChange24h: token.priceChange24h + changePercent * 0.1, // Gradually update 24h change
      };

      dispatch(updateToken(updatedToken));
    });
  }, [tokens, dispatch]);

  useEffect(() => {
    if (!enabled || tokens.length === 0) return;

    // Mock WebSocket: Update prices every 2-5 seconds
    const updateInterval = () => {
      const delay = 2000 + Math.random() * 3000; // Random delay between 2-5 seconds
      intervalRef.current = setTimeout(() => {
        updatePrices();
        updateInterval();
      }, delay);
    };

    updateInterval();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [enabled, tokens.length, updatePrices]);
}

