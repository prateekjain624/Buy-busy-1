import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";

import { db } from "../../firebaseConfig";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import moment from "moment";
import toast from "react-hot-toast";

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuthContext();

  const fetchCartItem = async () => {
    if (!currentUser) {
      setCart([]);
      return;
    }

    console.log("fetch cart");

    try {
      const cartRef = collection(db, "cart");
      const q = query(cartRef, where("userId", "==", currentUser.uid));
      const unSub = onSnapshot(q, (querySnapshot) => {
        const cartItems = [];
        querySnapshot.forEach((doc) => {
          cartItems.push({ cartItemId: doc.id, ...doc.data() });
        });
        setCart(cartItems);
      });
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, [currentUser]);

  const addToCart = async (product) => {
    if (!currentUser) {
      console.warn("User is not logged in. Cannot add to cart.");
      return;
    }

    try {
      const cartRef = collection(db, "cart");
      const q = query(
        cartRef,
        where("userId", "==", currentUser.uid),
        where("id", "==", product.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const existingProduct = existingDoc.data();
        const newQuantity = existingProduct.quantity + (product.quantity || 1);

        await updateDoc(existingDoc.ref, { quantity: newQuantity });
      } else {
        const newCartItem = {
          ...product,
          userId: currentUser.uid,
          quantity: 1,
        };

        const newDocRef = doc(collection(db, "cart"));
        await setDoc(newDocRef, newCartItem);
        toast.success(`Product added to cart`);
      }
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  };

  const updateQuantity = async (cartItemId, updateQuantity) => {
    if (!currentUser) {
      return;
    }

    try {
      const cartRef = doc(db, "cart", cartItemId);
      console.log(cartRef);
      await updateDoc(cartRef, { quantity: updateQuantity });
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeCartItem = async (cartItemId) => {
    if (!currentUser) {
      return;
    }

    try {
      const cartRef = doc(db, "cart", cartItemId);
      await deleteDoc(cartRef);
      toast.success("Product removed from cart");
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  // Calculate total items and total price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const addOrder = async (cart) => {
    try {
      const newOrderRef = doc(collection(db, "orders"));
      const fomattedDate = moment().format("DD MMMM YYYY");
      const totalAmount = totalPrice;
      await setDoc(newOrderRef, {
        cart,
        userId: currentUser.uid,
        orderDate: fomattedDate,
        totalAmount: Number(totalAmount),
        timestamp: Timestamp.fromDate(new Date()),
      });
      cart.map(async (c) => {
        await deleteDoc(doc(db, "cart", c.cartItemId));
      });
      toast.success("Order Placed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeCartItem,
        totalItems,
        totalPrice,
        addOrder,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
