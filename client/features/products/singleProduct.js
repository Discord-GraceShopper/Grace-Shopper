import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
} from "../../reducers/singleProduct";
import { addToCart, getOrder } from "../../reducers/cart";

const SingleProduct = () => {
  const id = useSelector((state) => state.auth.me.id);
  //   const [orderId, setOrderId] = useState("");
  const test = useSelector((state) => state.cart.orderId);
  console.log(test);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectSingleProduct);
  let productName = null;

  // Product title is currently: BRAND | Product_Name
  // ^ This has to be fixed on All Products view as well

  if (product.title) {
    if (product.title.startsWith(product.brand)) {
      productName = product.title.slice(product.brand.length + 1);
    } else {
      productName = product.title;
    }
  }

  const isStockAvailable = () => {
    if (product.quantity > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(getOrder(1));
  }, [dispatch]);

  const addToCart = async () => {
    const item_quantity = 1;

    // const orderId = await dispatch(getOrder(id));
    // console.log("ORDERID: ", orderId.payload);
    // console.log(item_quantity, product.price, orderId.payload, product.id);
    await dispatch(
      addToCart({
        item_quantity,
        total_price: product.price,
        orderId: test,
        productId: product.id,
      })
    );
    // dispatch(addToCart(name, price))
    // Once added to cart, make post request to current user's cart via async thunk on cart reducer
  };

  // Add button that redirects to main products page
  // See if this button can return to previous placement on page

  return (
    <div>
      <img
        onClick={() => navigate(-1)}
        className="back-arrow"
        src="/img/left-arrow.svg"
      />
      {product.title ? (
        <div className="single-product">
          <div className="single-product-img">
            <img src={product.main_image}></img>
          </div>
          <div className="single-product-details">
            <h2>
              {productName}{" "}
              <span className="single-product-brand">by {product.brand}</span>
            </h2>
            <h3> {product.description} </h3>
            <h2> ${product.price} </h2>
            {isStockAvailable ? (
              <h3 style={{ fontSize: "20px" }}> In Stock </h3>
            ) : (
              <h3> Out of Stock </h3>
            )}
            <button
              className="single-product-addToCart btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </div>
  );
};

export default SingleProduct;
