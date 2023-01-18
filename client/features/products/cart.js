import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, editQuantity, deleteItem } from "../../reducers/cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);
  const id = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    dispatch(getCart(id));
  }, [dispatch]);

  const addQty = (product) => {
    let productId = product.order_details.productId;
    let orderId = product.order_details.orderId;
    let item_quantity = product.order_details.item_quantity;
    let price = product.price;
    item_quantity++;
    const updatedQty = { id, productId, orderId, item_quantity, price };
    dispatch(editQuantity(updatedQty));
  };

  const subtractQty = (product) => {
    let productId = product.order_details.productId;
    let orderId = product.order_details.orderId;
    let item_quantity = product.order_details.item_quantity;
    let price = product.price;
    item_quantity--;
    const updatedQty = { id, productId, orderId, item_quantity, price };
    dispatch(editQuantity(updatedQty));
  };

  const deleteItems = (product) => {
    let productId = product.order_details.productId;
    let orderId = product.order_details.orderId;

    dispatch(deleteItem({ productId, orderId }));
  };

  let subTotal = Number(0);
  // let tax = subTotal * 0.15;

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {carts &&
          carts.map((product) => {
            subTotal += Number(product.order_details.total_price);
            return (
              <div key={product.id}>
                <h2>{product.title}</h2>
                <Link to={`/products/${product.id}`}>
                  <img src={product.main_image} width="200" height="200" />
                </Link>
                <h3>{product.price}</h3>
                <h3>Qty: {product.order_details.item_quantity}</h3>
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

export default Cart;
