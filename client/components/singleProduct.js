import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
    const { id } = useParams(); // grabs singleProduct ID
    const dispatch = useDispatch();
    // const product = useSelector(selectSingleProduct); // grabs single prod, uncomment when store is available

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
        // dispatch(fetchSingleProductAsync(id));
    }, [dispatch])
    
    const addToCart = (e) => { // Updates redux cart reducer
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