import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

const SingleProduct = (product) => {
    const { id } = useParams(); // grabbing product id
    const dispatch = useDispatch();
    // const singleProduct = useSelector(singleProduct);

    const dumbData = {
        name: 'testProduct',
        description: 'testDesc',
        image: 'testImg',
        price: 100,
    };
    // displays name, description, image, price
    // integrate w/ fetch single prod route
    // update redux cart reducer
    // add to cart button

    useEffect(() => {
        // dispatch(fetchSingleProductAsync(id))
    }, [dispatch])

    const addToCart = (e) => {
        console.log(e);
        // Update redux cart reducer here
    }

    return (
        <div>
            <h2>Product name: {dumbData.name}</h2>
            Description: {dumbData.description}
            Image: {dumbData.image}
            Price: {dumbData.price}
            <button onClick={addToCart(e)}>Add to Cart</button>
        </div>
    )
}


export default SingleProduct;