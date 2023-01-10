import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import allproducts from backend

const allProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getallProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h2>
                {product.name} {product.price}
              </h2>
              <img src={product.imageUrl} width="200" height="200" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default allProducts;
