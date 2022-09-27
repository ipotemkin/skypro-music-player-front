import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ITrackSlice {
  id: number | undefined
}

const initialState: ITrackSlice = {
  id: undefined
}

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setActiveTrackId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    }
  }
});

export const { setActiveTrackId } = trackSlice.actions;

export const selectActiveTrackId = (state: RootState) => state.track.id;

export default trackSlice.reducer;
