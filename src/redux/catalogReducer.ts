import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';
import { catalogAPI } from '../api/api';

type InitialStateType = {
  isCatalogLoading: boolean;
  products: ProductType[];
  productsSorted: ProductType[];
  activePage: number;
  pageCount: number;
};

const initialState: InitialStateType = {
  isCatalogLoading: false,
  products: [],
  productsSorted: [],
  activePage: 1,
  pageCount: 0,
};

const cardPerPage = 6;

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        activePage: action.payload,
        products: state.productsSorted.slice(
          cardPerPage * (action.payload - 1),
          cardPerPage * action.payload
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsSorted = action.payload;
        state.pageCount = Math.ceil(action.payload.length / cardPerPage);
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

export const { setActivePage } = catalogSlice.actions;
export const getProducts = createAsyncThunk<ProductType[], void>(
  'catalog/getProducts',
  async () => {
    const products = await catalogAPI.getProducts();
    return products;
  }
);
