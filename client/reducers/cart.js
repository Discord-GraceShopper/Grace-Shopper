import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getAll", async () => {
  try {
    const { data } = await axios.get("/api/cart");
    return data;
  } catch (error) {
    return error;
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ name, price }) => {
    try {
      const { data } = await axios.post("/api/cart", (name, price));
      return data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  items: [],
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default cartSlice.reducer;
