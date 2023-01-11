import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, selectSingleProduct } from '../reducers/singleProduct';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.singleProduct.product);

    // update redux cart reducer [waiting for store merge]
    // add to cart button [Update redux store, see above]

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
            {/* <i>{product.main_image}</h3> */}
            <h3> Price: {product.price} </h3>
            <button onClick={addToCart()}>Add to Cart</button>
        </div>
    )
}


export default SingleProduct;