import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { useAuthContext } from "../contexts/authContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { signup } = useAuthContext();

  // THIS FUNCTION HANDLE THE CHNAGES IN INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // THIS FUNCTION HANDLE TO SIGNUP THE USER
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData.email);
    // Add your signup logic here
    try {
      const user = await signup(formData.email, formData.password);

      await updateProfile(user.user, {
        displayName: formData.name,
      });
      toast.success("Signup successful");
      navigate("/");
    } catch (err) {
      toast.error("invalid credential");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
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
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.signupPrompt}>
          <Link to="/signin" className={styles.signupLink}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
