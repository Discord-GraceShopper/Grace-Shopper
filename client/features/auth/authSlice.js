import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/
export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ first_name, last_name, email, password, method }, thunkAPI) => {
    try {
      if (method === "signup") {
        const res = await axios.post(`/auth/${method}`, {
          first_name,
          last_name,
          email,
          password,
        });
        window.localStorage.setItem(TOKEN, res.data.token);
        thunkAPI.dispatch(me());
      } else {
        const res = await axios.post(`/auth/${method}`, {
          email,
          password,
        });
        window.localStorage.setItem(TOKEN, res.data.token);
        thunkAPI.dispatch(me());
      }
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

export const update = createAsyncThunk(
  "auth/update",
  async ({ id, first_name, last_name, email }) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.put(`/auth/${id}`, {
          authorization: token,
          first_name,
          last_name,
          email,
        });
        return res.data;
      }
    } catch (err) {
      return err;
    }
  }
);

export const fetchUserPurchaseHistory = createAsyncThunk(
  "users/fetchPurchaseHistory",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/purchase-history`, {});
      return data;
    } catch (err) {
      return err;
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    purchaseHistory: [],
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.purchaseHistory = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(update.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(fetchUserPurchaseHistory.fulfilled, (state, action) => {
      state.purchaseHistory = action.payload;
    });
    builder.addCase(fetchUserPurchaseHistory.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

/*
  REDUCER
*/
export default authSlice.reducer;
