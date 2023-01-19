import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../reducers/products";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { addToCart, getOrder } from "../../reducers/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Items = ({ currentItems, isLoggedIn, id }) => {
  const dispatch = useDispatch();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart"))) || [];
  }, [dispatch, cart.length]);

  const handleAddToCart = async (product) => {
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

  return (
    <>
      {currentItems &&
        currentItems.map((product) => (
          <div className="all-products-product" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.main_image} width="300" height="300" />
              <h2>{product.title}</h2>
            </Link>
            <div className="product-actions">
              <h2>${product.price}</h2>
              <button
                className={
                  product.quantity > 0 ? "add-cart-btn" : "out-of-stock-btn"
                }
                onClick={() => handleAddToCart(product)} // Add to Cart only works if quantity > 0, otherwise don't add to cart
              >
                {product.quantity > 0 ? "Add to cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

const AllProducts = () => {
  const itemsPerPage = 16;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.allProducts);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const id = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    dispatch(getAllProducts());
    if (!JSON.parse(localStorage.getItem("cart"))) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="all-product-container">
      <h1 className="all-product-header">Products</h1>
      <div className="all-products">
        <Items currentItems={currentItems} isLoggedIn={isLoggedIn} id={id} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      <ToastContainer />
    </div>
  );
};

export default AllProducts;
