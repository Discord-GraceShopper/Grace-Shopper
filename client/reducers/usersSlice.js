import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  try {
    const { data } = await axios.get("/api/users/directory", {
      headers: {
        authorization: "axios-request",
      },
    });
    return data;
  } catch (error) {
    return data;
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.error = action.payload; // or action.error can't remember, will fix when edge cases are run
    });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
