import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getAll", async (id) => {
  try {
    const { data } = await axios.get(`/api/order/${id}`);
    const cart = data.cart;
    return cart;
  } catch (error) {
    return error;
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ id, price, quantity }) => {
    try {
      const { data } = await axios.post("/api/additem", {
        id,
        price,
        quantity,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const editQuantity = createAsyncThunk("cart/edit", async (product) => {
  try {
    const { productId, orderId, item_quantity, price } = product;
    const updatedQty = { productId, orderId, item_quantity, price };
    await axios.put(`/api/order/${id}`, { cart: updatedQty });
    const { data } = await axios.get(`/api/order/${id}`);
    return data.cart;
  } catch (error) {
    return error;
  }
});

export const deleteItem = createAsyncThunk("cart/deleteItem", async (id) => {
  try {
    const { data } = axios.delete(`/api/order//${id}`);
    return data;
  } catch (error) {
    return error;
  }
});

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
      })
      .addCase(editQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      //   state.items.map((item) => {
      //     if (item.order_details.productId === action.payload.productId) {
      //       return {
      //         ...item,
      //         item_quantity: action.payload.quantity,
      //       };
      //     }
      //     return item;
      //   });
      // })
      // .addCase(editQuantity.fulfilled, (state, action) => {
      //   state.items.map((item) => (if (item.id === payload.id) return quantity: payload: quantity))
      // })
      .addCase(editQuantity.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default cartSlice.reducer;
