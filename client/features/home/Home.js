import React from "react";
import AllProducts from "../products/allProducts";

/**
 * COMPONENT
 */
const Home = () => {
  return (
    <div>
      <AllProducts itemsPerPage={16} />
    </div>
  );
};

export default Home;
