import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, editQuantity, deleteItem } from "../../reducers/cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);
  const id = useSelector((state) => state.auth.me.id);
  const total = 1;

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
  console.log(carts);
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {carts &&
          carts.map((product) => (
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
          ))}
        <h1>Order Summary</h1>
        <h3>Subtotal: </h3>
        <h3>Delivery: </h3>
        <h3>Tax: </h3>
        <h3>{`Total: ${total}`}</h3>
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
