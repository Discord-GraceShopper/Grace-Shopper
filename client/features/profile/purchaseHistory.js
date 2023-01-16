import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchUserPurchaseHistory } from "../auth/authSlice";

const PurchaseHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.me.id);
  const history = useSelector((state) => state.auth.purchaseHistory);

  useEffect(() => {
    dispatch(fetchUserPurchaseHistory(id));
  }, [dispatch]);

  return (
    <div className="purchase-history-container">
      <h2>Purchase History</h2>
      <div>
        {history.map((order) => {
          let total = Number(0);
          return (
            <div key={order.id} className="purchase-history-order-container">
              <h2>Date placed: {order.updatedAt.slice(0, 10)}</h2>
              <h3>Items in order:</h3>
              {order.cart.map((product) => {
                {
                  total += Number(product.price);
                }
                return (
                  <div key={product.id}>
                    <span>
                      <img src={product.main_image} width="75" height="75" />
                      <h4>{product.title}</h4>
                    </span>
                    <h4>${product.price}</h4>
                  </div>
                );
              })}
              <h2 className="purchase-history-total">Total: ${total}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseHistory;
