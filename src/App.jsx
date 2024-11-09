import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import CartPage from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartProvider } from './contexts/CartContext.js';
import Banner from './components/banner/Banner.jsx';
import Services from './components/services/Services.jsx';
import Categories from './components/Categories/Categories.jsx';
import Register from './pages/Register/Register.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><Header/><Banner/><Services/><Categories/></>} />
          <Route path="/product/:category/:id" element={<><Header/><ProductDetails /></>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<><Header/><Register /></>} /> {/* Register page */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
