import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "interfaces/index";

// 管理するstateの型定義
type AuthState = {
  isSignedIn: boolean;
  isLoading: boolean;
  user: User | null;
  tokens: {
    accessToken: string,
    client: string,
    uid: string,
  } | null
};

const initialState: AuthState = {
  isSignedIn: false,
  isLoading: false,
  user: null,
  tokens: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; tokens: AuthState['tokens'] }>) {
      state.isSignedIn = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    clearUser(state) {
      state.isSignedIn = false,
      state.isLoading = false;
      state.user = null,
      state.tokens = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
