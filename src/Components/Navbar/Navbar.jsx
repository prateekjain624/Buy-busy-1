import React from "react";
import styles from "./Navbar.module.css";
import home from "../Navbar/images/home.png";
import signin from "../Navbar/images/signin.png";
import cart from "../Navbar/images/cart.png";
import orders from "../Navbar/images/orders.png";
import signout from "../Navbar/images/logout.png";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

// navbar function starts from here
const Navbar = () => {
  const { currentUser, logout } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">BusyBuy</Link>
        </div>

        <ul className={styles.links}>
          <li>
            <Link to="/">
              <span>
                <img src={home} alt="home" />
              </span>
              Home
            </Link>
          </li>

          {currentUser ? (
            <>
              <li>
                <Link to="/orders">
                  <span>
                    <img src={orders} alt="orders" />
                  </span>
                  My orders
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <span>
                    <img src={cart} alt="cart" />
                  </span>
                  cart
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>
                  <span>
                    <img src={signout} alt="signout" />
                  </span>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin">
                <span>
                  <img src={signin} alt="signin" />
                </span>
                Signin
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
