import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import SingleProduct from "../features/products/singleProduct";
import AllProducts from "../features/products/AllProducts";
import Cart from "../features/cart/cart";
import Profile from "../features/profile/Profile";
import EditProfile from "../features/profile/editProfile";
import UserDirectory from "../features/userDirectory/UserDirectory";
import PurchaseHistory from "../features/profile/purchaseHistory";
import NotFound from "../features/errorPages/notFound";
import ProductsPanel from "../features/admin/ProductsPanel";
import EditProduct from "../features/admin/EditProduct";

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
          <Route path="/cart" element={<Cart />} />
          {isAdmin === "ADMIN" ? (
            <>
              <Route path="/directory" element={<UserDirectory />} />
              <Route path="/panel" element={<ProductsPanel />} />
              <Route
                path="/edit-product/:productId"
                element={<EditProduct />}
              />
            </>
          ) : null}
          <Route path="/*" element={<NotFound />} />
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
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
