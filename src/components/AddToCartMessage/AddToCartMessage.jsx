// components/AddToCartMessage/AddToCartMessage.jsx
import React, { useEffect } from 'react';
import styles from './AddToCartMessage.module.css';

const AddToCartMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 soniya davomida ko‘rsatiladi

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.addToCartMessage}>
      {message}
    </div>
  );
};

export default AddToCartMessage;
