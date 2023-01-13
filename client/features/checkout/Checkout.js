import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShippingBillingForm from './ShippingBillingForm';
import { useRef } from 'react';
import Collapsible from './Collapsible';

const Checkout = () => {

    // By submitting the order, we need to...
    // 1. Set 'purchased' on the order to TRUE.
    // 2. Send order details to purchase history.
    // 3. Reset the user's cart.
    // 4. Adjust each purchased item's stock in the db.

    
    const contentRef = useRef();
    if (contentRef.current) console.log(contentRef.current.scrollHeight);

    
    const sameAsBilling = (e) => { // should this be on the billing page to bring over shipping info?
        if (e.target.checked) {
            // Send shipping info to billing
        }
        // If not, clear billing info.
    }

    // return (
    //     <ShippingBillingForm />
    // )

    const ref = useRef([]);

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }
  
    return (
        <Collapsible section='Shipping Information'>
            <ShippingBillingForm />
        </Collapsible>
    )




    // return (
    //     <div>
    //         <button className='toggleButton' onClick={toggle}>Toggle</button>

    //         <div className={open ? "content-show" : "content-parent"}
    //             ref={contentRef}
    //             style={open ? { height: contentRef.current.scrollHeight + 'px' } : { height: '0px' }}>
    //                 <div className='content'> <ShippingBillingForm /> </div>
    //             </div>
    //     </div>
    // )
}
    


export default Checkout;