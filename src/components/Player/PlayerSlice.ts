import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface PlayerState {
  volume: number;
}

const initialState: PlayerState = {
  volume: 25
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setVolume } = playerSlice.actions;

export const selectVolume = (state: RootState) => state.player.volume;

export default playerSlice.reducer;
