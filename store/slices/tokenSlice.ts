import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token } from "@/types/token";

interface TokenState {
  tokens: Token[];
  sortConfig: {
    key: keyof Token | null;
    direction: "asc" | "desc";
  };
  selectedToken: Token | null;
}

const initialState: TokenState = {
  tokens: [],
  sortConfig: {
    key: null,
    direction: "asc",
  },
  selectedToken: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    updateToken: (state, action: PayloadAction<Token>) => {
      const index = state.tokens.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.tokens[index] = action.payload;
      }
    },
    setSortConfig: (
      state,
      action: PayloadAction<{ key: keyof Token; direction: "asc" | "desc" }>
    ) => {
      state.sortConfig = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
  },
});

export const { setTokens, updateToken, setSortConfig, setSelectedToken } =
  tokenSlice.actions;
export default tokenSlice.reducer;

