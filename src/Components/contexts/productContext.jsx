import { createContext, useContext, useEffect, useState } from "react";

const productContext = createContext();

export const useProductContext = () => useContext(productContext);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    query: "",
    price: 1000,
    categories: [],
  });

  // this function fetches the products
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // THIS HANDLE THE INPUT CHANGE IN SEARCH INPUT

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          categories: checked
            ? [...prev.categories, name]
            : prev.categories.filter((category) => category !== name),
        };
      }
      if (name === "query") {
        return { ...prev, query: value };
      }
      if (name === "price") {
        return { ...prev, price: Number(value) };
      }
      return prev;
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchQuery = product.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());
    const matchesPrice = product.price <= filter.price;
    const matchesCategory =
      filter.categories.length === 0 ||
      filter.categories.includes(product.category);
    return matchQuery && matchesPrice && matchesCategory;
  });

  return (
    <productContext.Provider
      value={{
        products: filteredProducts,
        loading,
        filter,
        handleFilterChange,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
