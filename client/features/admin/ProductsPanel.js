import React, { useEffect, useState } from "react";
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

    const editProduct = (e) => {
      console.log(e);
      // Make edit fields visible for only this product
      // Include save button (that becomes visible too) that registers all changes
    }

     // ******* add delete buttons !!
     // ***** add create product fields!

    const productsFormatter = () => {
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
                    <button onClick={editProduct} product={product.id}>Edit Product</button>
                    </Link>
                  <div>
                  </div>
                </div>
              ))
        )
    }

    return (
        <div>
      <h1>Products Panel (admins only!)</h1>
      <div>
        {products[0] ? productsFormatter() : null}
      </div>
    </div>
    )
}

export default ProductsPanel;