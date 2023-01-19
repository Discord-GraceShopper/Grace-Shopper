import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
} from "../../reducers/singleProduct";
import { addToCart, getOrder } from "../../reducers/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const id = useSelector((state) => state.auth.me.id);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectSingleProduct);
  let productName = null;

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

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
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    setCart(JSON.parse(localStorage.getItem("cart"))) || [];
  }, [dispatch, cart.length]);

  const handleAddToCart = async () => {
    if (isLoggedIn) {
      const order = await dispatch(getOrder(id));
      const orderId = order.payload.id;
      const item_quantity = 1;
      dispatch(
        addToCart({
          id,
          item_quantity,
          total_price: product.price,
          orderId,
          productId: product.id,
        })
      );
      toast.success("Added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Grabs cart on localStorage
      let a = [];
      a = JSON.parse(localStorage.getItem("cart")) || [];

      // Pushes product info into cart
      a.push({
        productId: product.id,
        productImg: product.main_image,
        productPrice: product.price,
        productTitle: product.title,
        productQuantity: 1,
      });
      // Sets the cart on the localStorage
      localStorage.setItem("cart", JSON.stringify(a));
      toast.success("Added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Add button that redirects to main products page
  // See if this button can return to previous placement on page

  return (
    <div>
      <div className="single-product-back-btn">
        <img
          className="back-arrow"
          onClick={() => navigate(-1)}
          style={{ height: "60px", width: "60px" }}
          src="/img/left-arrow.svg"
        />
      </div>
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
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </div>
  );
};

export default SingleProduct;
