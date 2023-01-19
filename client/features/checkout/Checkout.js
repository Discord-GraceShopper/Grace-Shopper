import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Redirect } from 'react-router-dom';
import { getCart, processOrder } from '../../reducers/cart';
import Collapsible from './Collapsible';

const Checkout = () => {

    const dispatch = useDispatch();
    const productArray = useSelector((state) => state.cart.items);
    const userId = useSelector((state) => state.auth.me.id);
    let orderId = null;

    if (productArray[0]) { // WORKS
        orderId = productArray[0].order_details.orderId
    }

    useEffect(() => {
        dispatch(getCart(userId));
    }, [dispatch])
    
    const [shipName, setShipName] = useState('');
    const [billName, setBillName] = useState('');
    const [shipPhoneNum, setShipPhoneNum] = useState('');
    const [billPhoneNum, setBillPhoneNum] = useState('');
    const [shipAddress, setShipAddress] = useState('');
    const [billAddress, setBillAddress] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [billCity, setBillCity] = useState('');
    const [shipState, setShipState] = useState('AK');
    const [billState, setBillState] = useState('AK');
    const [shipZip, setShipZip] = useState('');
    const [billZip, setBillZip] = useState('');
    
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formStatus, setFormStatus] = useState(false);

    const stateAbbreviations = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    const stateList = stateAbbreviations.map((state) => {
        return (
            <option value={state} key={state}>{state}</option>
            )
        })

    const saveShippingForm = (evt) => {
        evt.preventDefault();
        // Saves shipping information to user.    
    }

    const saveBillingForm = (evt) => {
        evt.preventDefault();
        // Saves billing information to user.
    }

    const [orderDone, setOrderDone] = useState(false);

    const placeOrder = async () => {
        await dispatch(processOrder({userId, orderId, productArray}))
        setOrderPlaced(true);
    }
    
    const sameAsShipping = () => {
        setBillName(shipName);
        setBillPhoneNum(shipPhoneNum);
        setBillAddress(shipAddress);
        setBillCity(shipCity);
        setBillState(shipState);
        setBillZip(shipZip);
    }

    const initialValue = 0;

    const subTotal = productArray.reduce((acc, currVal) => {
        let price = parseFloat(currVal.order_details.total_price);
        return acc + price;
    }, initialValue).toFixed(2);

    const taxCosts = ((subTotal * 1.0888) - subTotal).toFixed(2);
    const totalCost = (parseFloat(taxCosts) + parseFloat(subTotal)).toFixed(2);

    return (
        <div>
        <Collapsible section='Shipping Information'>
            <div>
        <form id="shipping-billing-info" onSubmit={saveShippingForm}>
            <h2>Shipping Information</h2>
            <label htmlFor='fullName'> Full name: </label>
            <input
                name="fullName"
                value={shipName}
                required={true}
                placeholder='First and Last name'
                onChange={(e) => setShipName(e.target.value)}
                />
            <label htmlFor='phoneNum'> Phone Number: </label>
            <input
                name="phoneNum"
                value={shipPhoneNum}
                required={true}
                onChange={(e) => setShipPhoneNum(e.target.value)}
                />
            <label htmlFor='address'> Address: </label>
            <input
                name="address"
                value={shipAddress}
                required={true}
                placeholder='Street address or P.O. Box'
                onChange={(e) => setShipAddress(e.target.value)}
                />
            <label htmlFor='city'> City: </label>
            <input
                name="city"
                value={shipCity}
                required={true}
                onChange={(e) => setShipCity(e.target.value)}
                />
            <select value={shipState} onChange={(e) => (setShipState(e.target.value))}>
                {stateList}
            </select>
            <label htmlFor='zip'> Zip Code: </label>
            <input
                name="zip"
                value={shipZip}
                required={true}
                // Valid zipcode/numbers only 
                onChange={(e) => setShipZip(e.target.value)}
                />
            <button type='submit'>Save Shipping Information</button>
        </form>
        </div>
        </Collapsible>

        <Collapsible section='Billing Information'>
        <div>
            {/* onSubmit = close out billing tab, populate 'delivering to' fields(?), add a 'Confirm Order' button to place it, backend stuff */}
        <form id="shipping-billing-info" onSubmit={saveBillingForm}>
            <h2>Billing Information</h2>
            <button type='button' onClick={sameAsShipping}>Same as Shipping?</button>
            <label htmlFor='fullName'> Full name: </label>
            <input
                name="fullName"
                value={billName}
                required={true}
                placeholder='First and Last name'
                onChange={(e) => setBillName(e.target.value)}
                />
            <label htmlFor='phoneNum'> Phone Number: </label>
            <input
                name="phoneNum"
                value={billPhoneNum}
                required={true}
                onChange={(e) => setBillPhoneNum(e.target.value)}
                />
            <label htmlFor='address'> Address: </label>
            <input
                name="address"
                value={billAddress}
                required={true}
                placeholder='Street address or P.O. Box'
                onChange={(e) => setBillAddress(e.target.value)}
                />
            <label htmlFor='city'> City: </label>
            <input
                name="city"
                value={billCity}
                required={true}
                onChange={(e) => setBillCity(e.target.value)}
                />
            <select value={billState} onChange={(e) => setBillState(e.target.value)}>
                {stateList}
            </select>
            <label htmlFor='zip'> Zip Code: </label>
            <input
                name="zip"
                value={billZip}
                required={true}
                // Valid zipcode/numbers only 
                onChange={(e) => setBillZip(e.target.value)}
                />
            <>
            <label htmlFor='cardName'>Name on Card:</label>
            <input
                name='cardName'
                value={cardName}
                required={true}
                onChange={(e) => setCardName(e.target.value)}
                />
            <label htmlFor='cardNumber'>Card Number:</label>
            <input
                name='cardNumber'
                value={cardNumber}
                required={true}
                type='number'
                onChange={(e) => setCardNumber(e.target.value)}
                />
            <label htmlFor='expDate'>Expiration Date:</label>
            <input
                name='expDate'
                value={expDate}
                required={true}
                onChange={(e) => setExpDate(e.target.value)}
                />
            <button type='submit' onClick={() => {setFormStatus(true)}}>Save Billing Information</button>
        </>
        </form>
        </div>
        </Collapsible>
        <div id='checkout-bottom'>
        <div className='total-costs'>
            <h3>Subtotal: ${subTotal}</h3> 
            <h3>Tax: ${taxCosts}</h3>
            <h2>Total: ${totalCost}</h2>
        </div>
        {formStatus ? ( <>
            <p>Shipping to: {shipName}</p>
            <p>{shipAddress}</p>
            <p>{shipPhoneNum}</p>
            <p>{shipCity}, {shipZip}</p>
            </>
        ) : null}
            <button onClick={() => {placeOrder()}}>Confirm Order</button>
            {orderPlaced ? (<>
                <h2>Your order has been placed!</h2>
            </>
            ) : null}
        </div>
        </div>
    )
}

export default Checkout;
