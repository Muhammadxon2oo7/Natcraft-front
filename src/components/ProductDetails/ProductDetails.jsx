import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [indicatorStyle, setIndicatorStyle] = useState({ display: 'none' });
  const [location, setLocation] = useState(null);
  const { addToCart } = useCart();

  const token = '8debc195102062b96e8faa8c746b0d68c86cb24b'; // Tokenni kerakli manzildan oling

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://qqrnatcraft.uz/api/products/${id}/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Error fetching product details");
        }

        const data = await response.json();
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0].image);
        }

        if (data.latitude && data.longitude) {
          setLocation({
            lat: data.latitude,
            lng: data.longitude,
          });
        }

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: `${width * 2}px ${height * 2}px`,
    });
    setIndicatorStyle({
      display: 'block',
      left: `${e.clientX - left}px`,
      top: `${e.clientY - top}px`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
    setIndicatorStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.productDetails}>
      <div className={styles.productContainer}>
        <div className={styles.thumbnailContainer}>
          {product.images && product.images.length > 0 ? (
            product.images.map((img, index) => (
              <img
                key={index}
                src={img.image}
                alt={`thumbnail-${index}`}
                onClick={() => setSelectedImage(img.image)}
                className={styles.thumbnail}
              />
            ))
          ) : (
            <div className={styles.noImageThumbnail}>No Image</div>
          )}
        </div>

        <div
          className={styles.imageContainer}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={selectedImage || "https://via.placeholder.com/500x500?text=No+Image"}
            alt={product.name}
            className={styles.productImage}
          />
          <div className={styles.zoomPreview} style={zoomStyle}></div>
          <div className={styles.cursorIndicator} style={indicatorStyle}></div>
        </div>

        <div className={styles.productInfo}>
          <p className={styles.productCategory}>
            <Link to={`/${category}`} className={styles.categoryLink}>
              Kategoriya: {category}
            </Link>
          </p>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.productPrice}>Narxi: {product.price} so'm</p>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productStock}>Mavjud: {product.stock} ta</p>
          <p className={styles.productLocation}>Manzil: {product.address}</p>
          <p className={styles.productSeller}>Sotuvchi: {product.seller.username}</p>

          {/* Google Map */}
          {location && (
            <div className={styles.mapContainer}>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '300px' }}
                  center={{ lat: location.lat, lng: location.lng }}
                  zoom={12}
                >
                  <Marker position={{ lat: location.lat, lng: location.lng }} />
                  <InfoWindow position={{ lat: location.lat, lng: location.lng }}>
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.address}</p>
                    </div>
                  </InfoWindow>
                </GoogleMap>
              </LoadScript>
            </div>
          )}

          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            Savatchaga qo'shish
          </button>
          {showMessage && <div className={styles.addToCartMessage}>Savatchaga qo'shildi!</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
