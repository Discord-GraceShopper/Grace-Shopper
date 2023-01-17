import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import SingleProduct from "../features/products/singleProduct";
import AllProducts from "../features/products/allProducts";
import Profile from "../features/profile/Profile";
import EditProfile from "../features/profile/editProfile";
import UserDirectory from "../features/userDirectory/UserDirectory";
import PurchaseHistory from "../features/profile/purchaseHistory";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.account_type);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          {isAdmin === "ADMIN" ? (
            <Route path="/directory" element={<UserDirectory />} />
          ) : null}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products/:productId" element={<SingleProduct />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
