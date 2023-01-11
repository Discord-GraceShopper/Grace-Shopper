import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, selectSingleProduct } from '../reducers/singleProduct';

const SingleProduct = () => {
    console.log('SINGLE PRODUCT COMPONENT INVOKED')
    const { productId } = useParams();
    console.log('Product ID: ', productId);
    const dispatch = useDispatch();
    const product = useSelector(selectSingleProduct);
    const test = useSelector((state) => console.log(state));

    console.log('selectSingleProduct results ------------', product)

    // console.log(product);

    const dumbData = {
        name: 'testProduct',
        description: 'testDesc',
        image: 'testImg',
        price: 100,
    };

    // displays name, description, image, price [yes, w/ dummy data]
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
            <h2>Product name: {dumbData.name}</h2>
            Description: {dumbData.description}
            Image: {dumbData.image}
            Price: {dumbData.price}
            <button onClick={addToCart()}>Add to Cart</button>
        </div>
    )
}


export default SingleProduct;