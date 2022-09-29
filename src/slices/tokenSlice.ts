import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface TokenState {
  access: string | undefined;
  refresh: string | undefined;
}

const initialState: TokenState = {
  access: undefined,
  refresh: undefined,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export const selectAccessToken = (state: RootState) => state.token.access;

export const selectRefreshToken = (state: RootState) => state.token.refresh;

export const selectTokens = (state: RootState) => { 
  console.log('selectTokens');
  console.log(state.token);
  return state.token;
}

export default tokenSlice.reducer;
