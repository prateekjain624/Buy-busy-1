import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  // THIS FUNCTION HANDLE THE CHNAGES IN INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // THIS FUNCTION HANDLE TO LOGIN THE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your login logic here
    try {
      await login(formData.email, formData.password);
      toast.success("user logged in successfull");
      navigate("/");
    } catch (err) {
      toast.error("invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.signupPrompt}>
          New user?{" "}
          <Link to="/signup" className={styles.signupLink}>
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
