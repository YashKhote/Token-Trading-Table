import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/useRedux";
import { setTokens } from "@/store/slices/tokenSlice";
import { useEffect } from "react";
import type { Token } from "@/types/token";
import { mockTokenData } from "@/lib/mockData";

/**
 * Custom hook for fetching token data using React Query
 */
export function useTokenData() {
  const dispatch = useAppDispatch();

  const { data, isLoading, error, isError } = useQuery<Token[]>({
    queryKey: ["tokens"],
    queryFn: async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mockTokenData;
      } catch (err) {
        console.error("Error fetching token data:", err);
        throw err;
      }
    },
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  return { data, isLoading, error: error || (isError ? new Error("Failed to fetch tokens") : null) };
}

