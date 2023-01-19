import React, { useEffect } from "react";
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
    if (item_quantity <= product.quantity) dispatch(editQuantity(updatedQty));
  };

  const subtractQty = (product) => {
    let productId = product.order_details.productId;
    let orderId = product.order_details.orderId;
    let item_quantity = product.order_details.item_quantity;
    let price = product.price;
    if (item_quantity === 1) {
      dispatch(deleteItem({ productId, orderId }));
    } else {
      item_quantity--;
      const updatedQty = { id, productId, orderId, item_quantity, price };
      dispatch(editQuantity(updatedQty));
    }
  };

  const deleteItems = (product) => {
    let productId = product.order_details.productId;
    let orderId = product.order_details.orderId;

    dispatch(deleteItem({ productId, orderId }));
  };

  let subTotal = Number(0);

  return (
    <div className="cart-container">
      <h1 className="cart-header">Cart</h1>
      <div>
        {carts &&
          carts.map((product) => {
            subTotal += Number(product.order_details.total_price);
            return (
              <div key={product.id} className="cart-details">
                <Link to={`/products/${product.id}`}>
                  <div className="cart-image">
                    <img src={product.main_image} width="200" height="200" />
                  </div>
                </Link>
                <h2 className="cart-product-details">{product.title}</h2>
                <h3 className="cart-product-details">${product.price}</h3>
                <h3 className="cart-product-details">
                  Qty:{" "}
                  <button
                    className="cart-subtract-qty"
                    onClick={() => subtractQty(product)}
                  >
                    -
                  </button>
                  {product.order_details.item_quantity}
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

export default Cart;
