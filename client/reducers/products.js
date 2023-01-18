import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    return error;
  }
});

export const createNewProduct = createAsyncThunk(
  "products/create", 
  async ({ title, brand, price, description, sku, quantity, primary_category, main_image }) => {
    const availability = true;
  try {
    console.log(primary_category);
    const { data } = await axios.post('/api/products', {
      title,
      brand,
      sku,
      description,
      price,
      quantity, // same order
      primary_category,
      main_image,
      availability,
    })
      return data;
  } catch (error) {
    return error;
  }
})

export const updateProduct = createAsyncThunk(
  "products/update", 
  async ({ productId, title, brand, sku, description, price, quantity, primary_category, main_image }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        title,
        brand,
        sku,
        description,
        price,
        quantity,
        primary_category,
        main_image,
      });
      return data;
    } catch (error) {
      return error;
    }
})

export const deleteProduct = createAsyncThunk("products/delete", async (productId) => {
  try {
    const { data } = await axios.delete(`/api/products/${productId}`);
    return data;
  } catch (error) {
    return error;
  }
})

const initialState = {
  allProducts: [],
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.allProducts = action.error;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allProducts.push(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productToDelete = action.payload;
        const indexFinder = (product) => product.id === productToDelete.id;
        const indexOfProduct = state.allProducts.findIndex(indexFinder);
        state.allProducts.splice(indexOfProduct, 1);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log('error:', action.error);
        state.error = action.error;
      })
  },
});

export default productSlice.reducer;
