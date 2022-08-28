import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tokenReducer from '../app/Auth/tokenSlice';
import filterReducer from '../app/slices/FilterAuthorsSlice';
import { musicPlayerApi } from './MusicPlayer/music-player.api';

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      token: tokenReducer,
      filter: filterReducer,
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
