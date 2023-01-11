import React from "react";
import AllProducts from "../components/allProducts";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <AllProducts />
    </div>
  );
};

export default App;
