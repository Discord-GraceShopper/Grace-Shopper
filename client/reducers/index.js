import { combineReducers } from "redux";
import productReducer from "./products";
import singleProductReducer from "./singleProduct";
import cartReducer from "./cart";
import authReducer from "../features/auth/authSlice";
import userReducer from "./usersSlice";

const rootReducer = combineReducers({
  product: productReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  auth: authReducer,
  users: userReducer,
});

export default rootReducer;
