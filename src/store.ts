import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlice';
import filterReducer from './features/Filter/FilterSlice';
import trackReducer from './slices/trackSlice';
import playerReducer from './features/Player/PlayerSlice';
import { musicPlayerApi } from './slices/music-player.api';

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
