import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
} from "../../reducers/singleProduct";
import { Link } from "react-router-dom";
import { updateProduct } from "../../reducers/products";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  let productName = null;

  const [title, setTitle] = useState(product.title);
  const [brand, setBrand] = useState(product.brand);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [sku, setSku] = useState(product.sku);
  const [quantity, setQuantity] = useState(product.quantity);
  const [category, setCategory] = useState(product.primary_category);
  const [main_image, setMainImage] = useState(product.main_image);

  if (product.title) {
    if (product.title.startsWith(product.brand)) {
      productName = product.title.slice(product.brand.length + 1);
    } else {
      productName = product.title;
    }
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, product.updatedAt]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(
      updateProduct({
        productId,
        title,
        brand,
        description,
        price,
        sku,
        quantity,
        category,
        main_image,
      })
    );
    dispatch(fetchSingleProduct(productId));
  };

  return (
    <div>
      <div className="single-product-back-btn">
        <Link to="/panel">
          <img
            className="back-arrow"
            style={{ height: "60px", width: "60px" }}
            src="/img/left-arrow.svg"
          />
        </Link>
      </div>
      {product.title ? (
        <div className="single-product-editor">
          <div className="single-product-img">
            <img
              src={product.main_image}
              style={{ maxHeight: 500, maxWidth: 300 }}
            ></img>
          </div>
          <div className="single-product-details">
            <h2>
              {productName}{" "}
              <span className="single-product-brand">by {product.brand}</span>
            </h2>
            <h3> {product.description} </h3>
            <h2> ${product.price} </h2>
            <h2>SKU: {product.sku}</h2>
            <h2>QTY available: {product.quantity}</h2>
            <h2>Category: {product.primary_category}</h2>
            {product.quantity > 0 ? (
              <h2 style={{ fontSize: "20px" }}> In Stock </h2>
            ) : (
              <h2 style={{ fontSize: "20px" }}> Out of Stock </h2>
            )}
          </div>
          <div>
            <form id="edit-product" onSubmit={handleSubmit}>
              <label htmlFor="title">Product Title: </label>
              <input
                name="title"
                placeholder="Title"
                defaultValue={product.title}
                required={true}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="description">Product Description: </label>
              <input
                name="description"
                placeholder="Description"
                defaultValue={product.description}
                required={true}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="brand">Product Brand: </label>
              <input
                name="brand"
                placeholder="Brand"
                defaultValue={product.brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label htmlFor="price">Product Price: </label>
              <input
                name="price"
                placeholder="Price"
                defaultValue={product.price}
                required={true}
                type="number"
                min="1"
                max="999"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="sku">Product SKU: </label>
              <input
                name="sku"
                placeholder="SKU"
                required={true}
                defaultValue={product.sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <label htmlFor="quantity">Product Quantity: </label>
              <input
                name="quantity"
                placeholder="QTY"
                defaultValue={product.quantity}
                required={true}
                type="number"
                min="0"
                max="999"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label htmlFor="category">Product Category: </label>
              <input
                name="category"
                placeholder="Category"
                required={true}
                defaultValue={product.primary_category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="imageUrl">Product Image URL:</label>
              <input
                name="img"
                defaultValue={product.main_image}
                onChange={(e) => setMainImage(e.target.value)}
              />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </div>
  );
};

export default EditProduct;
