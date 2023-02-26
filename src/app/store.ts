import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import kinoReducer from '../features/kino/kinoSlice';

export const store = configureStore({
  reducer: {
    kino: kinoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
