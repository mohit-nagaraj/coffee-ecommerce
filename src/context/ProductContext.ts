import React, { createContext, useState, useEffect, ReactNode, FC } from "react";

// Define the type for a product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Define the type for the context
interface ProductContextType {
  products: Product[];
}

// Create the context with a default value
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Define the props type for the provider
interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider = ({ children }:ProductProviderProps) => {
  // products state
  const [products, setProducts] = useState<Product[]>([]);
  
  // fetch products
  useEffect(() => {
    // const fetchProducts = async () => {
    //   const response = await fetch("https://fakestoreapi.com/products");
    //   const data = await response.json();
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
