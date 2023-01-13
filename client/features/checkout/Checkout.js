import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShippingBillingForm from './ShippingBillingForm';

const Checkout = () => {

    // By submitting the order, we need to...
    // 1. Set 'purchased' on the order to TRUE.
    // 2. Send order details to purchase history.
    // 3. Reset the user's cart.
    // 4. Adjust each purchased item's stock in the db.

    
    const sameAsBilling = (e) => { // should this be on the billing page to bring over shipping info?
        if (e.target.checked) {
            // Send shipping info to billing
        }
        // If not, clear billing info.
    }

    return (
        <ShippingBillingForm />
    )
    
}

export default Checkout;