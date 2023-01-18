import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const { data } = await axios.get("/api/products", {
      headers: {
        authorization: "axios-request",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
});

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
      });
  },
});

export default productSlice.reducer;
