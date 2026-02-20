import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Landing.css';
import HeroSection from '../components/HeroSection';

const Landing = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="landing">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $75</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>2-3 business days</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Premium Quality</h3>
              <p>Lab tested products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>30-day guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">FEATURED PRODUCTS</h2>
            <Link to="/products" className="view-all-link">
              View All <span>→</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="products-loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="product-card"
                >
                  <div className="product-image-wrapper">
                    <div 
                      className="product-image"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    {product.rating && (
                      <div className="product-rating">
                        ⭐ {product.rating}
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>JOIN THE ELITE</h2>
            <p>Get exclusive access to new products, special offers, and training tips</p>
            <Link to="/login" className="btn btn-primary btn-large">
              BECOME A MEMBER
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <div className="proof-grid">
            <div className="proof-item">
              <div className="proof-number">100K+</div>
              <div className="proof-label">Happy Customers</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">500+</div>
              <div className="proof-label">Products</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">50+</div>
              <div className="proof-label">Countries</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">4.8★</div>
              <div className="proof-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

