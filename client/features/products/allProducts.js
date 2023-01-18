import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../reducers/products";
import { addToCart } from "../../reducers/cart";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="all-product-container">
      <h1 className="all-product-header">Products</h1>
      <div className="all-products">
        {products.map((product) => (
          <div className="all-products-product" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.main_image} width="300" height="300" />
              <h2>{product.title}</h2>
            </Link>
            <div className="product-actions">
              <h2>{product.price}</h2>
              <button
                className="add-cart-btn"
                onClick={(event) =>
                  dispatch(addToCart(product.name, product.price))
                }
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

export default AllProducts;
