import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '.';

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    return (await response.json()).products as ProductData[];
  },
);

export const productsAdapter = createEntityAdapter<ProductData>();

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export default productsSlice.reducer;
