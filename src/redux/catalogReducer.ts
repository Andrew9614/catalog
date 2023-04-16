import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productsType';
import { catalogAPI } from '../api/api';
import { BrandsType } from '../types/brandsType';
import { AppDispatch, RootState } from './store';

type InitialStateType = {
  isCatalogLoading: boolean;
  products: ProductType[];
  productsFull: ProductType[];
  brands: BrandsType[];
  pageCount: number;
  activePage: number;
  cardPerPage: number;
  sortByPrice: 'ascending' | 'descending' | 'default';
};

const initialState: InitialStateType = {
  isCatalogLoading: false,
  products: [],
  brands: [],
  productsFull: [],
  pageCount: 0,
  cardPerPage: 6,
  activePage: 1,
  sortByPrice: 'default',
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setActiveFilter: (
      state,
      action: PayloadAction<{ checked: boolean; id: number }>
    ) => {
      state.brands.find((brand) => brand.id === action.payload.id)!.active =
        action.payload.checked;
    },
    setSortByPriceType: (
      state,
      action: PayloadAction<{ type: 'ascending' | 'descending' | 'default' }>
    ) => {
      state.sortByPrice = action.payload.type;
    },
    applyFilters: (state) => {
      const activeFilter = state.brands.filter((el) => el.active);
      if (activeFilter.length) {
        state.products = state.productsFull.filter((product) =>
          activeFilter.find((brand) => brand.id === product.brand)
        );
      } else {
        state.products = [...state.productsFull];
      }
      switch (state.sortByPrice) {
        case 'ascending':
          state.products.sort(
            (a, b) => a.regular_price.value - b.regular_price.value
          );
          break;
        case 'descending':
          state.products.sort(
            (a, b) => b.regular_price.value - a.regular_price.value
          );
          break;
      }

      state.pageCount =
        Math.ceil(state.products.length / state.cardPerPage) || 1;
      if (state.pageCount < state.activePage) {
        state.activePage = state.pageCount;
      }
      state.products = state.products.slice(
        state.cardPerPage * (state.activePage - 1),
        state.cardPerPage * state.activePage
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.fulfilled, (state, action) => {
        state.productsFull = [...action.payload[0]];
        state.products = [...action.payload[0]];
        state.pageCount = Math.ceil(
          action.payload[0].length / state.cardPerPage
        );
        state.brands = action.payload[1];
        state.isCatalogLoading = false;
      })
      .addCase(getCatalog.pending, (state) => {
        state.isCatalogLoading = true;
      })
      .addCase(getCatalog.rejected, (state) => {
        state.isCatalogLoading = false;
      });
  },
});

export const {
  setActiveFilter,
  setActivePage,
  applyFilters,
  setSortByPriceType,
} = catalogSlice.actions;

export const getCatalog = createAsyncThunk<[ProductType[], BrandsType[]], void>(
  'catalog/getProducts',
  async () => {
    const catalog = await Promise.all([
      catalogAPI.getProducts(),
      catalogAPI.getBrands(),
    ]);
    return catalog;
  }
);

export const clearFilter = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('catalog/clearFilter', async (arg, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  const state = thunkAPI.getState();
  dispatch(setActivePage(1));
  state.catalog.brands.forEach((el) =>
    dispatch(setActiveFilter({ checked: false, id: el.id }))
  );
  dispatch(setSortByPriceType({ type: 'default' }));
  dispatch(applyFilters());
});
