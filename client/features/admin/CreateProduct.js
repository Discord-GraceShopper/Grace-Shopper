import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewProduct } from "../../reducers/products";

const CreateProduct = () => {

    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [primary_category, setPrimaryCategory] = useState('');
    const [main_image, setMainImage] = useState('');

    const dispatch = useDispatch();

    const createTheProduct = (e) => { // dispatch works
        e.preventDefault();
        dispatch(createNewProduct({title, brand, price, description, sku, quantity, primary_category, main_image}))
        setTitle('');
        setDescription('');
        setBrand('');
        setPrice('');
        setSku('');
        setQuantity('');
        setPrimaryCategory('');
        setMainImage('');
    }

    return (
        <div>
            <h2 className="create-product-header"> Create a New Product </h2>
            <form id='create-product' onSubmit={createTheProduct}>
                <label htmlFor="title">Title: </label>
                <input
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <label htmlFor='description'>Description: </label>
                <input
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                <label htmlFor="brand">Brand: </label>
                <input
                    name='brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    />
                <label htmlFor="price">Price: </label>
                <input
                    name='price'
                    value={price}
                    type='number'
                    min='0.25'
                    max='999'
                    step='0.01'
                    onChange={(e) => setPrice(e.target.value)}
                    />
                <label htmlFor="sku">SKU: </label>
                <input
                    name='sku'
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    />
                <label htmlFor="quantity">Quantity: </label>
                <input 
                    name='quantity'
                    value={quantity}
                    type='number'
                    min='0'
                    max='999'
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                <label htmlFor='category'>Category: </label>
                <input
                    name='category'
                    value={primary_category}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    />
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    name='img'
                    value={main_image}
                    onChange={(e) => setMainImage(e.target.value)}
                    />
            <button type='submit' id='admin-panel-btn'>Create Product</button>
            </form>
        </div>
    )
}

export default CreateProduct;