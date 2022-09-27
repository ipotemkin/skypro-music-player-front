import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tokenReducer from '../app/Auth/tokenSlice';
import userReducer from '../app/Auth/userSlice';
import filterReducer from '../features/Filter/FilterSlice';
import trackReducer from '../features/Track/TrackSlice';
import playerReducer from '../features/Player/PlayerSlice';
import { musicPlayerApi } from './MusicPlayer/music-player.api';

export const store = configureStore({
  reducer: {
      token: tokenReducer,
      filter: filterReducer,
      track: trackReducer,
      user: userReducer,
      player: playerReducer,
      [musicPlayerApi.reducerPath]: musicPlayerApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
    .concat(musicPlayerApi.middleware)
  )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
