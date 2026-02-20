import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">SHOPPING CART</h1>
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">SHOPPING CART</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.productId} className="cart-item">
                <Link to={`/products/${item.productId}`} className="cart-item-image">
                  <div
                    className="item-image"
                    style={{ backgroundImage: `url(${item.product.image})` }}
                  ></div>
                </Link>
                
                <div className="cart-item-info">
                  <Link to={`/products/${item.productId}`} className="item-name">
                    {item.product.name}
                  </Link>
                  <p className="item-category">{item.product.category}</p>
                  <p className="item-price">${item.product.price}</p>
                </div>

                <div className="cart-item-quantity">
                  <span>Qty: {item.quantity}</span>
                </div>

                <div className="cart-item-total">
                  <p className="item-total-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="remove-item-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>ORDER SUMMARY</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{getCartTotal() >= 75 ? 'FREE' : '$9.99'}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${(getCartTotal() + (getCartTotal() >= 75 ? 0 : 9.99)).toFixed(2)}</span>
              </div>

              {getCartTotal() < 75 && (
                <p className="shipping-note">
                  Add ${(75 - getCartTotal()).toFixed(2)} more for free shipping!
                </p>
              )}

              <button onClick={handleCheckout} className="btn btn-primary btn-large btn-checkout">
                PROCEED TO CHECKOUT
              </button>

              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

