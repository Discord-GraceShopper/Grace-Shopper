import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, selectAllProducts } from "../../reducers/products";
import { Link } from "react-router-dom";

// Admin-only panel for maintaining products.

const ProductsPanel = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.allProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    console.log(products);

    const productsFormatter = () => {
        return (
            products.map((product) => (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h2>
                      {product.title} {product.price}
                    </h2>
                    <img src={product.main_image} width="200" height="200" />
                  </Link>
                  <div>
                    <button id="add" onClick={(event) => dispatch(addToCart(product.name, product.price))}>Add to cart</button>
                  </div>
                </div>
              ))
        )
    }

    return (
        <div>
      <h1>Products</h1>
      <div>
        {products[0] ? productsFormatter() : null}
      </div>
    </div>
    )
}

export default ProductsPanel;