import React from "react";
import { useOrderContext } from "../contexts/orderContext";
import styles from "../Order/Order.module.css";

const OrdersPage = () => {
  const { orders } = useOrderContext();

  console.log(orders);

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.heading}>My Orders</h1>

      {orders.length <= 0 ? (
        <p className={styles.noOrders}>No orders available</p>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                <tr className={styles.orderDateRow}>
                  <td colSpan="5" className={styles.orderDate}>
                    Order Date: {order.orderDate}
                  </td>
                </tr>
                {order.cart.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.title}</td>
                    <td>
                      <i class="fa-solid fa-indian-rupee-sign"></i>
                      {item.price.toFixed(2)}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      <i class="fa-solid fa-indian-rupee-sign"></i>
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className={styles.totalLabel}>
                    Grand Total:
                  </td>
                  <td className={styles.totalAmount}>
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    {order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
