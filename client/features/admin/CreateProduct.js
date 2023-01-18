import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewProduct } from "../../reducers/products";

const CreateProduct = () => {

    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [main_image, setMainImage] = useState('');

    const dispatch = useDispatch();

    const createTheProduct = (e) => {
        e.preventDefault();
        dispatch(createNewProduct({title, brand, price, description, sku, quantity, category, main_image}))
        setTitle('');
        setDescription('');
        setBrand('');
        setPrice('');
        setSku('');
        setQuantity('');
        setCategory('');
        setMainImage('');
    }

    return (
        <div>
            <form id='create-product' onSubmit={createTheProduct}>
                <label htmlFor="title">Title: </label>
                <input
                    name='title'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <label htmlFor='description'>Description: </label>
                <input
                    name='description'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                <label htmlFor="brand">Brand: </label>
                <input
                    name='brand'
                    placeholder='Brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    />
                <label htmlFor="price">Price: </label>
                <input
                    name='price'
                    placeholder='Price'
                    value={price}
                    type='number'
                    min='1'
                    max='999'
                    onChange={(e) => setPrice(e.target.value)}
                    />
                <label htmlFor="sku">SKU: </label>
                <input
                    name='sku'
                    placeholder='SKU'
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    />
                <label htmlFor="quantity">Quantity: </label>
                <input 
                    name='quantity'
                    placeholder='QTY'
                    value={quantity}
                    type='number'
                    min='0'
                    max='999'
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                <label htmlFor='category'>Category: </label>
                <input
                    name='category'
                    placeholder='Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    />
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    name='img'
                    value={main_image}
                    onChange={(e) => setMainImage(e.target.value)}
                    />
            <button type='submit'>Create Product</button>
            </form>
        </div>
    )
}

export default CreateProduct;