import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
    alert('Added to cart!');
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-loading">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <div
              className="product-main-image"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>

          <div className="product-detail-info">
            <div className="product-breadcrumb">
              <span>{product.category}</span>
            </div>
            
            <h1 className="product-detail-name">{product.name}</h1>
            
            {product.rating && (
              <div className="product-detail-rating">
                ⭐ {product.rating} Rating
              </div>
            )}

            <div className="product-detail-price">
              ${product.price}
            </div>

            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-detail-actions">
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)} className="quantity-btn">-</button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="quantity-btn">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-large"
                disabled={!product.inStock}
              >
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Free shipping on orders $75+</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔄</span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💪</span>
                <span>Premium quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

