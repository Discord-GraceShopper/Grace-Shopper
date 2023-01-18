import React from "react";
import { useSelector } from "react-redux";
import AllProducts from "../products/allProducts";

/**
 * COMPONENT
 */
const Home = (props) => {
  return (
    <div>
      <AllProducts />
    </div>
  );
};

export default Home;
