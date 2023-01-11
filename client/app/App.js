import React from "react";
import AllProducts from "../features/products/allProducts";
import SingleProduct from "../features/products/singleProduct";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
