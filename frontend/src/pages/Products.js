import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    
    setSelectedCategory(category);
    setSearchQuery(search);
    
    fetchProducts(category, search);
  }, [searchParams]);

  const fetchProducts = async (category, search) => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'all') params.category = category;
      if (search) params.search = search;
      
      const response = await axios.get('http://localhost:5001/api/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    await addToCart(productId, 1);
    // Show notification (you can add a toast notification here)
    alert('Added to cart!');
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'supplements', name: 'Supplements' },
    { id: 'merchandise', name: 'Merchandise' },
    { id: 'equipment', name: 'Equipment' }
  ];

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <h1 className="page-title">SHOP</h1>
          <p className="page-subtitle">Premium supplements and gear for champions</p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="products-layout">
            <aside className="products-sidebar">
              <h3>FILTERS</h3>
              <div className="filter-section">
                <h4>Category</h4>
                <div className="filter-options">
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products${cat.id !== 'all' ? `?category=${cat.id}` : ''}`}
                      className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <main className="products-main">
              {loading ? (
                <div className="products-loading">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="products-empty">
                  <p>No products found</p>
                  <Link to="/products" className="btn btn-primary">View All Products</Link>
                </div>
              ) : (
                <>
                  <div className="products-header-bar">
                    <p className="products-count">{products.length} products found</p>
                  </div>
                  <div className="products-grid">
                    {products.map(product => (
                      <div key={product.id} className="product-card">
                        <Link to={`/products/${product.id}`} className="product-link">
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
                            {!product.inStock && (
                              <div className="product-out-of-stock">OUT OF STOCK</div>
                            )}
                          </div>
                          <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <p className="product-price">${product.price}</p>
                          </div>
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="btn-add-to-cart"
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

