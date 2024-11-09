import React, { useState, useEffect } from 'react';
import { HidingHeader } from 'hiding-header-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo/logo.png';
import search from '../../assets/img/icons/search.png';
import user from '../../assets/img/icons/user.png';
import cart from '../../assets/img/icons/cart.png';
import heart from '../../assets/img/icons/heart.png';
import suggestion from '../../assets/img/icons/suggestion.png';
import notification from '../../assets/img/icons/bell.png';
import { useCart } from '../../contexts/CartContext';
import 'hiding-header/dist/style.css';
import './header.css';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { cartItems, addToCart, removeOneFromCart } = useCart();
  const navigate = useNavigate();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cart-button') && !event.target.closest('.cart-popover')) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/,/g, '')) * item.quantity, 0).toLocaleString("uz-UZ");

  // User icon click
  const handleUserClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <>
      <HidingHeader>
        <header>
          <div className="container">
            <div className="logo__wrapper">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <form className={`search__menu ${isSearchOpen ? 'open' : ''}`}>
              <input type="text" placeholder="Search..." />
              <button type="button" onClick={toggleSearch}>
                <img src={search} alt="Search" />
              </button>
            </form>
            <div className="navs">
              <ul>
                <li><a href="#" onClick={handleUserClick}><img src={user} alt="User" /></a></li>
                <li style={{ position: 'relative' }}>
                  <button className="cart-button" onClick={togglePopover}>
                    <img src={cart} alt="Cart" />
                    {cartItems.length > 0 && (
                      <span className="cart-indicator">{cartItems.length}</span>
                    )}
                  </button>
                  {isPopoverOpen && (
                    <div className="cart-popover">
                      {cartItems.length === 0 ? (
                        <p>Savatchangizda hozircha mahsulot yo'q</p>
                      ) : (
                        <ul className="cart-items-list">
                          {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                              <img src={item.img} alt={item.title} className="cart-item-image" />
                              <div className="cart-item-info">
                                <p className="cart-item-title">{item.title}</p>
                                <p className='cart-item-quanity'>{item.quantity}</p>
                                <p className="cart-item-price">
                                  {item.price} so'm 
                                </p>
                              </div>
                              <div className="quanty-btns">
                                <button
                                  className="quantity-control danger"
                                  onClick={() => removeOneFromCart(item.id)}
                                >
                                  -
                                </button>
                                <button
                                  className="quantity-control success"
                                  onClick={() => addToCart(item)}
                                >
                                  +
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {cartItems.length > 0 && (
                        <div className="cart-total">
                          <p>Jami: {totalPrice} so'm</p>
                        </div>
                      )}
                      <button 
                        className="go-to-cart-button"
                        onClick={() => {
                          navigate('/cart');
                          setIsPopoverOpen(false);
                        }}
                      >
                        Savatchaga o'tish
                      </button>
                    </div>
                  )}
                </li>
                <li><a href="#"><img src={heart} alt="Heart" /></a></li>
                <li><a href="#"><img src={suggestion} alt="Suggestion" /></a></li>
                <li><a href="#"><img src={notification} alt="Notification" /></a></li>
              </ul>
            </div>
          </div>
        </header>
      </HidingHeader>
    </>
  );
}

export default Header;
