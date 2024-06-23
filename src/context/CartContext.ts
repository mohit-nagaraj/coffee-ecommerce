import React, { createContext, useState, useEffect, ReactNode, FC } from "react";

// Define the type for a cart item
interface CartItem {
  id: number;
  price: number;
  amount: number;
  [key: string]: any; // Allow additional properties
}

// Define the type for the context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem, id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  itemAmount: number;
  total: number;
}

// Create the context with a default value
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props type for the provider
interface CartProviderProps {
  children: ReactNode;
}

const CartProvider= ({ children }:CartProviderProps) => {
  // cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState<number>(0);
  // total price state
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]); // Add cart as a dependency

  // update item amount
  useEffect(() => {
    if (cart.length > 0) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    } else {
      setItemAmount(0);
    }
  }, [cart]);

  // add to cart
  const addToCart = (product: CartItem, id: number) => {
    const newItem = { ...product, amount: 1 };
    // check if the item is already in the cart
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove from cart
  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      addToCart(cartItem, id);
    }
  };

  // decrease amount
  const decreaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        const newCart = cart.map((item) => {
          if (item.id === id) {
            return { ...item, amount: cartItem.amount - 1 };
          } else {
            return item;
          }
        });
        setCart(newCart);
      } else {
        removeFromCart(id);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
