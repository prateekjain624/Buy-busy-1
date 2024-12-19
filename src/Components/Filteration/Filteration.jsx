import React from "react";
import styles from "../Filteration/Filteration.module.css";
import { useProductContext } from "../contexts/productContext";
const Filteration = () => {
  const { filter, handleFilterChange } = useProductContext();

  return (
    <div className={styles.filter}>
      <h2>Filter</h2>
      <form>
        <label htmlFor="price">price:{filter.price}</label>
        <input
          className={styles.priceRange}
          type="range"
          id="price"
          name="price"
          min="1"
          max="100000"
          step="10"
          value={filter.price}
          onChange={handleFilterChange}
        />
        <h2>Category</h2>
        <div className={styles.categoryContainer}>
          <div>
            <input
              type="checkbox"
              id="mensFashion"
              name="men's clothing"
              onChange={handleFilterChange}
              checked={filter.categories.includes("men's clothing")}
            />
            <label htmlFor="mensFashion">Men's Clothing</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="womensFashion"
              name="women's clothing"
              onChange={handleFilterChange}
              checked={filter.categories.includes("women's clothing")}
            />
            <label htmlFor="womensFashion">Women's Clothing</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="jewelery"
              name="jewelery"
              onChange={handleFilterChange}
              checked={filter.categories.includes("jewelery")}
            />
            <label htmlFor="jewelery">Jwelery</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="electronics"
              name="electronics"
              onChange={handleFilterChange}
              checked={filter.categories.includes("electronics")}
            />
            <label htmlFor="electronics">electronics</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filteration;
