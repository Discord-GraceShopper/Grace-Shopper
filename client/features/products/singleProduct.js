import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, selectSingleProduct } from '../../reducers/singleProduct';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectSingleProduct);
    let productName = null;

    // Product title is currently: BRAND | Product_Name 
    // ^ This has to be fixed on All Products view as well

    if (product.title) {
        if (product.title.startsWith(product.brand)) {
            productName = product.title.slice(product.brand.length + 1);
        } else {
            productName = product.title
        }
    }

    const isStockAvailable = () => {
        if (product.quantity > 0) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch])
    
    const addToCart = () => { // Updates redux cart reducer
        console.log('BUTTON PRESSED')
         // dispatch(addToCart(name, price))
        // Once added to cart, make post request to current user's cart via async thunk on cart reducer
    }

    // Add button that redirects to main products page
    // See if this button can return to previous placement on page

    return (
        <div>
        {product.title ? <div className='single-product'>
            <div className='single-product-img'>
                <img src={product.main_image}></img>
            </div>
            <div className='single-product-details'> 
            <h2>{productName} <span className='single-product-brand'>by {product.brand}</span></h2>
            <h3> {product.description} </h3> 
            <h2> ${product.price} </h2>
            {isStockAvailable ? <h3 style={{fontSize: '20px'}}> In Stock </h3> : <h3> Out of Stock </h3>}
            <button className='single-product-addToCart btn'onClick={addToCart()}>Add to Cart</button>
            </div>
            </div>
            : <h1> Loading... </h1>}
        </div>
    )
}


export default SingleProduct;