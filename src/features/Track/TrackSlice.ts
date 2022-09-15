import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ITrackSlice {
  value: number | undefined
}

export const initialState: ITrackSlice = {
  value: undefined
}

export const trackSlice = createSlice({
  name: 'activeTrackId',
  initialState,
  reducers: {
    setActiveTrackId: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
});

export const { setActiveTrackId } = trackSlice.actions;

export const selectActiveTrackId = (state: RootState) => state.activeTrackId;

export default trackSlice.reducer;
