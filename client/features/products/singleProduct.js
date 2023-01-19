import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleProduct, selectSingleProduct } from '../../reducers/singleProduct';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectSingleProduct);
    let productName = null;

    if (product.title) {
        if (product.title.startsWith(product.brand)) {
            productName = product.title.slice(product.brand.length + 1);
        } else {
            productName = product.title
        }
    }

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch])
    
    const addToCart = () => { 
        console.log('BUTTON PRESSED')
    }

    return (
        <div>
            <div className='single-product-back-btn'>
            <Link to='/'>
            <img style={{height:'60px', width:'60px'}} src="../left-arrow.svg"/>
            </Link>
            </div>
        {product.title ? <div className='single-product'>
            <div className='single-product-img'>
                <img src={product.main_image}></img>
            </div>
            <div className='single-product-details'> 
            <h2>{productName} <span className='single-product-brand'>by {product.brand}</span></h2>
            <h3> {product.description} </h3> 
            <h2> ${product.price} </h2>
            {product.quantity > 0 ? <h3 style={{fontSize: '24px'}}> In Stock </h3> : null}
            <button className={product.quantity > 0 ? 'single-product-addToCart btn' : "out-of-stock-btn"} 
            onClick={addToCart()}>{product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</button>
            </div>
            </div>
            : <h1> Loading... </h1>}
        </div>
    )
}

export default SingleProduct;