import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getAll", async (id) => {
  try {
    const { data } = await axios.get(`/api/order/${id}`, {
      headers: {
        authorization: "axios-request",
      },
    });
    const cart = data.cart;
    return cart;
  } catch (error) {
    return error;
  }
});

export const getOrder = createAsyncThunk("order/getOrder", async (id) => {
  try {
    const { data } = await axios.get(`/api/order/${id}`, {
      headers: {
        authorization: "axios-request",
      },
    });
    const cart = data;
    // console.log("-------------------------", cart);
    return cart;
  } catch (error) {
    return error;
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ item_quantity, total_price, orderId, productId }) => {
    try {
      console.log(
        "----------------------------",
        item_quantity,
        total_price,
        orderId,
        productId
      );
      const { data } = await axios.post("/api/addItem", {
        item_quantity,
        total_price,
        orderId,
        productId,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const editQuantity = createAsyncThunk("cart/edit", async (product) => {
  try {
    const { id, productId, orderId, item_quantity, price } = product;
    const updatedQty = { id, productId, orderId, item_quantity, price };
    const { data } = await axios.put(`/api/order/editItem`, updatedQty);
    return data.cart;
  } catch (error) {
    return error;
  }
});

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ productId, orderId }) => {
    try {
      const data = axios.put(`/api/order/deleteItem`, {
        productId,
        orderId,
      });
      console.log("updated", data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  items: {},
  orderId: null,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("INSIDE BUILDER CASE");
        state.items.push(action.payload);
        // state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderId = action.payload;
      })
      .addCase(editQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(editQuantity.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items.splice(
          state.items.findIndex(
            (item) =>
              item.order_details.productId === action.payload.data.productId &&
              item.order_details.orderId === action.payload.data.orderId
          ),
          1
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default cartSlice.reducer;
