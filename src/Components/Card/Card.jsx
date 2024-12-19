import React from "react";
import styles from "../Card/Card.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

// THIS IS THE CARD FUNCTION

const Card = ({ product, addToCart }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    addToCart(product);
  };
  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.products}>
          <div className={styles.productimage}>
            <img src={product.image} alt="Product" width="100%" height="100%" />
          </div>
          <div className={styles.productDetails}>
            <div className={styles.productName}>
              <p>{product.title}</p>
            </div>
            <div className={styles.productPrice}>
              <p>₹ {product.price}</p>
            </div>
            <button
              className={styles.addToCart}
              title="Add to Cart"
              onClick={() => handleAdd(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
