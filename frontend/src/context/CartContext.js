import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const headers = user ? { 'user-id': user.id.toString() } : {};
      const response = await axios.get('http://localhost:5001/api/cart', { headers });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const headers = user ? { 'user-id': user.id.toString() } : {};
      const response = await axios.post(
        'http://localhost:5001/api/cart',
        { productId, quantity },
        { headers }
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to add to cart' };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const headers = user ? { 'user-id': user.id.toString() } : {};
      const response = await axios.delete(
        `http://localhost:5001/api/cart/${productId}`,
        { headers }
      );
      setCart(response.data);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartCount,
    loading,
    loadCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

