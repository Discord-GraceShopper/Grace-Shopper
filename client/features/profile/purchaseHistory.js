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
            <div key={order.id}>
              <h3>Date placed: {order.updatedAt.slice(0, 10)}</h3>
              {order.cart.map((product) => {
                {
                  total += Number(product.price);
                }
                return (
                  <div key={product.id}>
                    <h4>{product.title}</h4>
                    <h4>{product.price}</h4>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseHistory;
