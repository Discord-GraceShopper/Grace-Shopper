import { combineReducers } from "redux";
import productReducer from "./products";
import cartReducer from "./cart";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
