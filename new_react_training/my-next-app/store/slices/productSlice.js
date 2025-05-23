import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
const DB_ID = process.env.DATABASE_ID;
const COLLECTION_ID= process.env.COLLECTION_ID;
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await databases.listDocuments(DB_ID, COLLECTION_ID);
  console.log(response,'resposssssss')
  return response.documents;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(state, 'statat')
        state.items = action.payload;
        state.loading = false;
      });
  }
});

export default productSlice;

