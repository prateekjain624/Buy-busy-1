import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../firebaseConfig";
import { useAuthContext } from "./authContext";

const orderContext = createContext();

export const useOrderContext = () => useContext(orderContext);

const OrderProvider = ({ children }) => {
  const [orders, setOrder] = useState([]); // State to store orders
  const { currentUser } = useAuthContext();

  const fetchOrders = async () => {
    if (!currentUser) {
      setOrder([]);
      return;
    }

    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid)
      );

      const unSubs = onSnapshot(ordersQuery, (querySnapshot) => {
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ orderId: doc.id, ...doc.data() });
        });

        setOrder(fetchedOrders); // Update the state with fetched data
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  return (
    <orderContext.Provider value={{ orders }}>{children}</orderContext.Provider>
  );
};

export default OrderProvider;
