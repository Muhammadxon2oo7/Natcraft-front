// Cart.jsx
import React from 'react';
import './Cart.css';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(",", "")), 0).toLocaleString("uz-UZ");

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.title} className="item-image" />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Price: {item.price} so'm</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: {totalPrice} so'm</h3>
        <Link to="/checkout" className="checkout-button">Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;
