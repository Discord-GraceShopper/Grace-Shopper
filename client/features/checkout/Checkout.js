import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Checkout = () => {

    const stateAbbreviations = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    const stateList = stateAbbreviations.map((state) => {
        return (
            <option value={state} key={state}>{state}</option>
        )
    })

    const submitOrder = (evt) => {
        evt.preventDefault();
        console.log('Order submitted!');
        console.log('Order details:')
        console.log(fullName, phoneNum, address, city, state, zip)
        // By submitting the order, we need to...
        // 1. Set 'purchased' on the order to TRUE.
        // 2. Send order details to purchase history.
        // 3. Reset the user's cart.
        // 4. Adjust each purchased item's stock in the db.
    }

    // Shipping form details:
    // Full name (First and Last name)
    // Phone number
    // Address [Street address or P.O. Box] & [Apt, suite, unit, building, floor, etc]
    // City
    // State (select, dropdown)
    // ZIP Code

    // Billing form is the same, but with payment method inputs

    const changeState = (e) => {
        setState(e.target.value);
    }

    const [fullName, setFullName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    return (
        <div>
            <h1>Checkout</h1>
        <form id="shipping-billing-info" onSubmit={submitOrder}>
            <label htmlFor='fullName'> Full name: </label>
            <input
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
            <label htmlFor='phoneNum'> Phone Number: </label>
            <input
                name="phoneNum"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                />
            <label htmlFor='address'> Address: </label>
            <input
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            <label htmlFor='city'> City: </label>
            <input
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            <select value={state} onChange={changeState}>
                {stateList}
            </select>
            <label htmlFor='zip'> Zip Code: </label>
            <input
                name="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                />
                <button type='submit'>Submit Order</button>
        </form>
        </div>
    )
}

export default Checkout;