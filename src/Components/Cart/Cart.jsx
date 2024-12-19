import React from "react";
import styles from "../Cart/Cart.module.css";
import { useCartContext } from "../contexts/cartContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const CartComponent = () => {
  const {
    cart,
    updateQuantity,
    totalItems,
    totalPrice,
    removeCartItem,
    addOrder,
  } = useCartContext();

  const { currentUser } = useAuthContext();

  console.log(totalPrice);

  return (
    <div className={styles.cartContainer}>
      {currentUser ? (
        <>
          <div className={styles.summary}>
            <p>
              Total Items:{" "}
              <span className={styles.totalItems}>{totalItems}</span>
            </p>
            <p>
              Total Price: <i class="fa-solid fa-indian-rupee-sign"></i>
              <span className={styles.totalPrice}>{Number(totalPrice)}</span>
            </p>
            <Link to="/orders">
              <button
                className={styles.purchaseButton}
                onClick={() => addOrder(cart)}
              >
                Purchase
              </button>
            </Link>
          </div>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.cartItemId} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemPrice}>
                    {" "}
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {item.price.toFixed(2)}
                  </p>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeCartItem(item.cartItemId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.emptyCart}>Your cart is empty.</p>
          )}
        </>
      ) : (
        <p className={styles.loginPrompt}>Please log in to view your cart.</p>
      )}
    </div>
  );
};

export default CartComponent;
