import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getAll", async () => {
  try {
    const { data } = await axios.get("/api/orderdetails", {
      params: { orderId: 1 },
    });
    return data;
  } catch (error) {
    return error;
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ id, price, quantity }) => {
    try {
      const { data } = await axios.post("/api/orderdetails", {
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

export const editQuantity = createAsyncThunk(
  "cart/edit",
  async (id, quantity) => {
    try {
      const { data } = await axios.put(`/api/orderdetails/${id}`, { quantity });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteItem = createAsyncThunk("cart/deleteItem", async (id) => {
  try {
    const { data } = axios.delete(`/api/orderdetails/${id}`);
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
        state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity,
            };
          }
          return item;
        });
      })
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
