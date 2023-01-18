import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../reducers/products";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../reducers/products";
import CreateProduct from "./CreateProduct";
import ReactPaginate from "react-paginate";


// Admin-only panel for maintaining products.

    const Items = ({ currentItems }) => {
      const dispatch = useDispatch();

      const destroyProduct = (productId) => {
        dispatch(deleteProduct(productId));
        // dispatch(getAllProducts());
      }

      return (
        <>
          {currentItems &&
            currentItems.map((product) => (
              <div className="all-products-product" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.main_image} width="300" height="300" />
                  <h2>{product.title}</h2>
                </Link>
                <div className="product-actions">
                  <h2>${product.price}</h2>
                  <Link to={`/edit-product/${product.id}`}>
                        <button id='admin-panel-btn'>Edit Product</button>
                  </Link>
                  <button id='admin-panel-btn' onClick={() => {destroyProduct(product.id)}}>Delete Product</button>
                </div>
              </div>
            ))}
        </>
      );
    };
    
    const ProductsPanel = () => {
      const itemsPerPage = 16;
      const dispatch = useDispatch();
      const products = useSelector((state) => state.product.allProducts);
    
      useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);
    
      const [itemOffset, setItemOffset] = useState(0);
    
      const endOffset = itemOffset + itemsPerPage;
      const currentItems = products.slice(itemOffset, endOffset);
      const pageCount = Math.ceil(products.length / itemsPerPage);
    
      const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
      };
    
      return (
        <div className="all-product-container">
          <CreateProduct />
          <h1 className="all-product-header">Products Panel (admins only)</h1>
          <div className="all-products">
            <Items currentItems={currentItems} />
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      );
    };

export default ProductsPanel;