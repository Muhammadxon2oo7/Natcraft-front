import React, { createContext, useContext, useState, useEffect } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const CartContext = /*#__PURE__*/createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({
  children
}) => {
  const [cartItems, setCartItems] = useState([]);

  // Local storage dan ma'lumotni yuklash
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Local storage ni yangilash
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = product => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(prevItems => prevItems.map(item => item.id === product.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      setCartItems([...cartItems, {
        ...product,
        quantity: 1
      }]);
    }
  };
  const removeOneFromCart = productId => {
    setCartItems(prevItems => prevItems.map(item => item.id === productId ? {
      ...item,
      quantity: item.quantity - 1
    } : item).filter(item => item.quantity > 0) // quantity 0 bo'lsa mahsulot o'chadi
    );
  };
  return /*#__PURE__*/_jsx(CartContext.Provider, {
    value: {
      cartItems,
      addToCart,
      removeOneFromCart
    },
    children: children
  });
};