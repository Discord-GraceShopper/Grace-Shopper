import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ShippingBillingForm = () => {

    


    const [fullName, setFullName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const changeUserState = (e) => {
        setState(e.target.value);
    }

    const saveShippingInfo = (evt) => {
        evt.preventDefault();
        console.log('Shipping details saved!');
        // Dispatch shipping info to user profile.
        // Clear out shipping info.
        setFullName('');
        setPhoneNum('')
        setAddress('')
        setCity('')
        setState('')
        setZip('')
        // POST request to User to save shipping info
    }

    const stateAbbreviations = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    const stateList = stateAbbreviations.map((state) => {
        return (
            <option value={state} key={state}>{state}</option>
        )
    })


    return (
        <div>
            <h1>Checkout</h1>
        <form id="shipping-billing-info" onSubmit={saveShippingInfo}>
            <h2>ship/bill info</h2>
            <label htmlFor='fullName'> Full name: </label>
            <input
                name="fullName"
                value={fullName}
                required={true}
                placeholder='First and Last name'
                onChange={(e) => setFullName(e.target.value)}
                />
            <label htmlFor='phoneNum'> Phone Number: </label>
            <input
                name="phoneNum"
                value={phoneNum}
                required={true}
                onChange={(e) => setPhoneNum(e.target.value)}
                />
            <label htmlFor='address'> Address: </label>
            <input
                name="address"
                value={address}
                required={true}
                placeholder='Street address or P.O. Box'
                onChange={(e) => setAddress(e.target.value)}
                />
            <label htmlFor='city'> City: </label>
            <input
                name="city"
                value={city}
                required={true}
                onChange={(e) => setCity(e.target.value)}
                />
            <select value={state} onChange={changeUserState}>
                {stateList}
            </select>
            <label htmlFor='zip'> Zip Code: </label>
            <input
                name="zip"
                value={zip}
                required={true}
                // Valid zipcode/numbers only 
                onChange={(e) => setZip(e.target.value)}
                />
            {/* <label htmlFor='cardName'>Name on Card:</label>
            <input
                name='cardName'
                value={cardName}
                // required={true}
                hidden={billingVisible}
                onChange={(e) => setCardName(e.target.value)}
                />
                 */}
                {/* <label htmlFor="billingInfo"> Same as billing? </label> */}
                {/* <input type="checkbox" id="billingInfo" value="billingInfoSame" onClick={sameAsBilling}/> */}
                <button type='submit'>Submit Order</button>
        </form>
        </div>
    )

}

export default ShippingBillingForm;