import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, editQuantity, deleteItem } from "../../reducers/cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  //   const carts = useSelector((state) => state.cart.items);
  const carts = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {carts.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>

            <img src={product.main_image} width="200" height="200" />
            <h3>{product.price}</h3>
            <h3>Qty: {product.quantity}</h3>
            <div>
              <button
                id="remove"
                onClick={(event) => dispatch(deleteItem(product.id))}
              >
                X
              </button>
              <button
                id="add"
                onClick={(event) =>
                  dispatch(editQuantity(product.id, product.quantity + 1))
                }
              >
                +
              </button>
              <button
                id="subtract"
                onClick={(event) =>
                  dispatch(editQuantity(product.id, product.quantity - 1))
                }
              >
                -
              </button>
            </div>
          </div>
        ))}
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
