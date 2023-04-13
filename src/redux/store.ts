import { configureStore } from '@reduxjs/toolkit';
import { catalogSlice } from './catalogReducer';

const reducers = {
  catalog: catalogSlice.reducer,
};

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
