import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';
import { shoppingCartAPI } from '../api/api';
import { AppDispatch, RootState } from './store';

type InitialStateType = {
  products: { product: ProductType; count: number }[];
  isOrdersSending: boolean;
};

const initialState: InitialStateType = {
  products: [],
  isOrdersSending: false,
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
    clearShoppingCard: (state) => {
      state.products = [];
    },
    setCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const product = state.products.find(
        (el) => el.product.id === action.payload.id
      );
      if (product) {
        product.count += action.payload.count;
        if (product.count < 1) product.count = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrders.fulfilled, (state) => {
        state.isOrdersSending = false;
        shoppingCartSlice.caseReducers.clearShoppingCard(state);
      })
      .addCase(sendOrders.pending, (state) => {
        state.isOrdersSending = true;
      })
      .addCase(sendOrders.rejected, (state) => {
        state.isOrdersSending = false;
      });
  },
});

export const { addProduct, deleteProduct, setCount, clearShoppingCard } =
  shoppingCartSlice.actions;

export const sendOrders = createAsyncThunk<
  any,
  void,
  { dispatch: AppDispatch; state: RootState }
>('shoppingCart/sendOrders', async (arg, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    const res = await shoppingCartAPI.postOrders(state.shoppingCart.products);
    return res.data;
  } catch (error) {
    console.error(error);
		return {response: 'error'}
  }
});
