import { configureStore } from '@reduxjs/toolkit';
import { catalogSlice } from './catalogReducer';
import { shoppingCartSlice } from './shoppingCartReducer';

const reducers = {
  catalog: catalogSlice.reducer,
	shoppingCart: shoppingCartSlice.reducer
};

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
