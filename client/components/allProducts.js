import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../reducers/products";
import { Link } from "react-router-dom";

const allProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
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
            <div>
              <button
                id="add"
                onClick={(event) => dispatch(addToCart(product.id))}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default allProducts;
