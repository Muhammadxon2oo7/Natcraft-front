import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Categories.module.css';

const Categories = React.memo(() => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const token = '8debc195102062b96e8faa8c746b0d68c86cb24b'; // Token qo'shildi

  // Kategoriyalarni yuklash
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://qqrnatcraft.uz/api/categories/', {
          headers: {
            'Authorization': `Token ${token}`, // Authorization header qo'shildi
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error("Serverdan kategoriya ma'lumotlarini olishda xatolik yuz berdi");
        }
        const data = await response.json();
        setCategories(data);

        if (data.length > 0) {
          setSelectedCategory(data[0].name);
          fetchProducts(data[0].name);
        }
      } catch (error) {
        console.error('Xatolik:', error);
      }
    };
    fetchCategories();
  }, []);

  // Mahsulotlarni tanlangan kategoriyaga ko'ra yuklash
  const fetchProducts = useCallback(async (categoryName) => {
    try {
      const response = await fetch(`http://qqrnatcraft.uz/api/products/?category=${categoryName}`, {
        headers: {
          'Authorization': `Token ${token}`, // Authorization header qo'shildi
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error("Serverdan mahsulot ma'lumotlarini olishda xatolik yuz berdi");
      }
      const data = await response.json();
      setProducts(data);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error('Xatolik:', error);
    }
  }, []);

  // Mahsulot sahifasiga o'tish
  const goToProductPage = (category, productId) => {
    navigate(`/product/${category}/${productId}`);
  };

  // Kategoriya tugmalarini yaratish
  const categoryButtons = useMemo(
    () =>
      categories.map((category, index) => (
        <li key={index}>
          <button
            className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.active : ''}`}
            onClick={() => fetchProducts(category.name)}
          >
            {category.name}
          </button>
        </li>
      )),
    [categories, selectedCategory, fetchProducts]
  );

  return (
    <div id="categories-section" className={styles.container}>
      <ul className={styles.categoriesList}>{categoryButtons}</ul>

      {selectedCategory && (
        <div id="products-section" className={styles.productsGrid}>
          {products.map((product, index) => (
            <div
              key={index}
              className={styles.productCard}
              onClick={() => goToProductPage(selectedCategory, product.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.productImageContainer}>
                <img src={product.images[0].image} alt={product.title} className={styles.productImage} />
                {
                  console.log(product.images[0].image)
                  
                }
              </div>
              <h4 className={styles.productTitle}>{product.title}</h4>
              <p className={styles.productPrice}>{product.price} so'm</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Categories;
