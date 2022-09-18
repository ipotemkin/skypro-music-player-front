import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models';
import { musicPlayerApi } from '../MusicPlayer/music-player.api';
import { RootState } from '../store';

const initialState: IUser = {
  id: -1,
  username: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      musicPlayerApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.email
      }
    );
    builder.addMatcher(
      musicPlayerApi.endpoints.getCurrentUser.matchRejected,
      (state, { payload }) => {
        console.log('!!!rejected!!!');
      }
    );
  }
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
