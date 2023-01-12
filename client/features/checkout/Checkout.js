import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Checkout = () => {


    const submitOrder = (evt) => {
        evt.preventDefault();
        // By submitting the order, we need to...
        // 1. Set 'purchased' on the order to TRUE.
        // 2. Send order details to purchase history.
        // 3. Reset the user's cart.
        // 4. Adjust each purchased item's stock in the db.
    }


    // Changing the QTY of a product should adjust the value in OrderDetails.

    return (
        <div>
            <h1>Checkout</h1>
            <h2>Put list of items here!</h2> 
        <form id="shipping-billing-info" onSubmit={submitOrder}>
        
        </form>
        </div>
    )
}

export default Checkout;