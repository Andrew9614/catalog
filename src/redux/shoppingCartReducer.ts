import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';

type InitialStateType = {
  products: { product: ProductType; count: number }[];
};

const initialState: InitialStateType = {
  products: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push({ product: action.payload, count: 1 });
    },
    deleteProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.products = state.products.filter(
        (el) => el.product.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, deleteProduct } = shoppingCartSlice.actions;
