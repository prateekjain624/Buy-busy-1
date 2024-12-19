import React from "react";
import styles from "../Home/Home.module.css";
import Card from "../Card/Card";
import { useProductContext } from "../contexts/productContext";
import { TailSpin } from "react-loader-spinner";
import { useCartContext } from "../contexts/cartContext";
import Filteration from "../Filteration/Filteration";

const Home = () => {
  const { products, loading, filter, handleFilterChange } = useProductContext();
  const { addToCart } = useCartContext();

  return (
    <div className={styles.homeContainer}>
      <aside className={styles.filterContainer}>
        <Filteration />
      </aside>
      <form className={styles.searchForm}>
        <input
          type="search"
          placeholder="Search By Name"
          name="query"
          value={filter.query}
          onChange={handleFilterChange}
        />
      </form>
      <div className={styles.productGrid}>
        {loading ? (
          <div className={styles.spinner}>
            <TailSpin color="red" radius={"8px"} />
          </div>
        ) : (
          products.map((product) => (
            <Card key={product.id} product={product} addToCart={addToCart} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
