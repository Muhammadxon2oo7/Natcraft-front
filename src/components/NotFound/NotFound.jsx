// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-animation">
        <h1>404</h1>
        <p>Uzr, siz qidirgan sahifa topilmadi.</p>
        <Link to="/" className="notfound-home-link">Bosh sahifaga qaytish</Link>
      </div>
    </div>
  );
};

export default NotFound;
