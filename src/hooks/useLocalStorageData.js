import { useState, useEffect } from "react";
import { getProducts } from "../utils/localStorage";

export const useLocalStorageData = () => {
  const [products, setProducts] = useState([]);

  const refreshProducts = () => {
    const storedProducts = getProducts();
    setProducts(storedProducts);
  };

  useEffect(() => {
    refreshProducts();

    const handleStorageChange = () => refreshProducts();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdate", handleStorageChange);
    };
  }, []);

  return { products, refreshProducts };
};
