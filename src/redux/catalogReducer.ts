import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';
import { catalogAPI } from '../api/api';

type InitialStateType = {
  isCatalogLoading: boolean;
  products: ProductType[];
};

const initialState: InitialStateType = {
  isCatalogLoading: false,
  products: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isCatalogLoading = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.isCatalogLoading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isCatalogLoading = false;
      });
  },
});

export const { setProducts } = catalogSlice.actions;

export const getProducts = createAsyncThunk<ProductType[], void>(
  'catalog/getProducts',
  async () => {
    const products = await catalogAPI.getProducts();
    return products;
  }
);
