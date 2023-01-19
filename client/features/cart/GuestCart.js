import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GuestCart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, [cart.length]);

  const addQty = (product) => {
    product.productQuantity += 1;
    console.log(product.productQuantity);
  };

  // const subtractQty = (product) => {
  //   let productId = product.order_details.productId;
  //   let orderId = product.order_details.orderId;
  //   let item_quantity = product.order_details.item_quantity;
  //   let price = product.price;
  //   item_quantity--;
  //   const updatedQty = { id, productId, orderId, item_quantity, price };
  //   dispatch(editQuantity(updatedQty));
  // };

  const deleteItems = (item) => {
    let productId = item.productId;

    const updatedCart = cart.filter((product) => {
      if (product.productId !== productId) {
        return product;
      }
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(JSON.parse(localStorage.getItem("cart")));
  };

  let subTotal = Number(0);

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart &&
          cart.map((product) => {
            subTotal += Number(product.productPrice);
            return (
              <div key={product.id}>
                <h2>{product.productTitle}</h2>
                <Link to={`/products/${product.productId}`}>
                  <img src={product.productImg} width="200" height="200" />
                </Link>
                <h3>{product.productPrice}</h3>
                {/* <h3>Qty: {product.order_details.item_quantity}</h3> */}
                <div>
                  <button id="remove" onClick={() => deleteItems(product)}>
                    X
                  </button>
                  <button id="add" onClick={() => addQty(product)}>
                    +
                  </button>
                  <button id="subtract" onClick={() => subtractQty(product)}>
                    -
                  </button>
                </div>
              </div>
            );
          })}
        <h1>Order Summary</h1>
        <h3>{`Subtotal: ${subTotal.toFixed(2)}`} </h3>
        <h3>Delivery: </h3>
        <h3>{`Tax: ${(subTotal * 0.08).toFixed(2)}`}</h3>
        <h3>{`Total: ${(subTotal + subTotal * 0.08).toFixed(2)}`}</h3>
        <div>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestCart;
