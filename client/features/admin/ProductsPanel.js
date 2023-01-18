import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../reducers/products";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../reducers/products";
import CreateProduct from "./CreateProduct";

// Admin-only panel for maintaining products.

const ProductsPanel = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.allProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const destroyProduct = (productId) => {
      dispatch(deleteProduct(productId));
      dispatch(getAllProducts());
    }

    const productsFormatter = () => { // List of products
        return (
            products.map((product) => (
                <div key={product.id}>
                    <h2> {product.title} </h2>
                    <h3>Brand: {product.brand}</h3>
                    <h3>Price: {product.price}</h3>
                    <p>SKU: {product.sku}</p>
                    <p>Availability: {product.availability}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Category: {product.primary_category}</p>
                    <img src={product.main_image} width="200" height="200" />
                    <Link to={`/editproduct/${product.id}`}>
                    <button>Edit Product</button>
                    </Link>
                    <button onClick={() => {destroyProduct(product.id)}}>Delete Product</button>
                  <div>
                  </div>
                </div>
              ))
        )
    }

    return (
        <div>
          <CreateProduct />
      <h1>Products Panel (admins only!)</h1>
      <div>
        {products[0] ? productsFormatter() : null}
      </div>
    </div>
    )
}

export default ProductsPanel;