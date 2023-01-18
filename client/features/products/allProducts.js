import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../reducers/products";
import { addToCart } from "../../reducers/cart";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Items = ({ currentItems }) => {
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
              <button
                className="add-cart-btn"
                onClick={(event) =>
                  dispatch(addToCart(product.name, product.price))
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

const AllProducts = ({ itemsPerPage }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  console.log(products);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="all-product-container">
      <h1 className="all-product-header">Products</h1>
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

export default AllProducts;
