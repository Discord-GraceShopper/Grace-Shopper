import React from "react";
import AllProducts from "../products/AllProducts";

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
