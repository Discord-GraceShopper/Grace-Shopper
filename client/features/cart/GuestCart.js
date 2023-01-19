import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editQuantity, deleteItem } from "../../reducers/cart";

const GuestCart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, [cart.length]);

  const addQty = (product) => {
    product.productQuantity += 1;
  };

  const subtractQty = (product) => {
    product.productQuantity -= 1;
    if (product.productQuantity < 1) {
      deleteItems(product);
    }
  };

  const deleteItems = (item) => {
    let productId = item.productId;

    const updatedCart = cart.filter((product) => {
      if (product.productId !== productId) {
        return product;
      }
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  };

  let subTotal = Number(0);

  return (
    <div className="cart-container">
      <h1 className="cart-header">Guest Cart</h1>
      <div>
        {cart &&
          cart.map((product) => {
            subTotal += Number(product.productPrice);
            return (
              <div key={product.productId} className="cart-details">
                <Link to={`/products/${product.productId}`}>
                  <div className="cart-image">
                    <img src={product.productImg} width="200" height="200" />
                  </div>
                </Link>
                <h2 className="cart-product-details">{product.productTitle}</h2>
                <h3 className="cart-product-details">
                  ${product.productPrice}
                </h3>
                <h3 className="cart-product-details">
                  Qty:{" "}
                  <button
                    className="cart-subtract-qty"
                    onClick={() => subtractQty(product)}
                  >
                    -
                  </button>
                  {product.productQuantity}
                  <button
                    className="cart-add-qty"
                    onClick={() => addQty(product)}
                  >
                    +
                  </button>
                </h3>
                <div>
                  <button
                    className="cart-remove-button"
                    onClick={() => deleteItems(product)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        <div className="ordersummary-container">
          <h1>Order Summary</h1>
          <h3>{`Subtotal: $${subTotal.toFixed(2)}`} </h3>
          <h3>Delivery: </h3>
          <h3>{`Tax: $${(subTotal * 0.08).toFixed(2)}`}</h3>
          <h3>{`Total: $${(subTotal + subTotal * 0.08).toFixed(2)}`}</h3>
          <div>
            <Link to="/checkout">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCart;
