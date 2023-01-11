import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk("products/getOne", async (productId) => {
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        return data;
    } catch (error) {
        return error;
    }
});

const initialState = {
    product: {},
    error: null,
}

export const singleProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.product = action.payload;
        })
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.product = action.error; // should this reassign state.error instead?
        });
    },
});

export default singleProductSlice.reducer;