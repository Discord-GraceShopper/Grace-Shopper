import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, selectSingleProduct } from '../reducers/singleProduct';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectSingleProduct);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch])
    
    const addToCart = () => { // Updates redux cart reducer
         // dispatch(addToCart(name, price))
        // Once added to cart, make post request to current user's cart via async thunk on cart reducer
    }

    return (
        <div>
            <h2>Product name: {product.title}</h2>
            <h3> Description: {product.description} </h3> 
            <img src={product.main_image}></img>
            <h3> Price: {product.price} </h3>
            <button onClick={addToCart()}>Add to Cart</button>
        </div>
    )
}


export default SingleProduct;