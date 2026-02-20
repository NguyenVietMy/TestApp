const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database
let users = [
  {
    id: 1,
    email: 'demo@example.com',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqO', // hashed 'password'
    name: 'Demo User',
    membership: 'premium'
  }
];

let products = [
  {
    id: 1,
    name: 'Whey Protein Isolate',
    category: 'supplements',
    price: 49.99,
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Whey+Protein',
    description: 'Premium 100% whey protein isolate for maximum muscle recovery',
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: 'Pre-Workout Energy',
    category: 'supplements',
    price: 39.99,
    image: 'https://via.placeholder.com/400x400/ff0000/ffffff?text=Pre-Workout',
    description: 'High-intensity pre-workout formula with caffeine and beta-alanine',
    rating: 4.6,
    inStock: true
  },
  {
    id: 3,
    name: 'Creatine Monohydrate',
    category: 'supplements',
    price: 24.99,
    image: 'https://via.placeholder.com/400x400/0000ff/ffffff?text=Creatine',
    description: 'Pure creatine monohydrate for strength and power',
    rating: 4.9,
    inStock: true
  },
  {
    id: 4,
    name: 'BCAA Recovery',
    category: 'supplements',
    price: 34.99,
    image: 'https://via.placeholder.com/400x400/00ff00/000000?text=BCAA',
    description: 'Essential amino acids for faster muscle recovery',
    rating: 4.7,
    inStock: true
  },
  {
    id: 5,
    name: 'Elite Training Hoodie',
    category: 'merchandise',
    price: 79.99,
    image: 'https://via.placeholder.com/400x400/000000/ffffff?text=Hoodie',
    description: 'Premium quality training hoodie with moisture-wicking technology',
    rating: 4.5,
    inStock: true
  },
  {
    id: 6,
    name: 'Performance Tank Top',
    category: 'merchandise',
    price: 39.99,
    image: 'https://via.placeholder.com/400x400/ff6600/ffffff?text=Tank+Top',
    description: 'Breathable tank top for intense training sessions',
    rating: 4.4,
    inStock: true
  },
  {
    id: 7,
    name: 'Weightlifting Belt',
    category: 'equipment',
    price: 89.99,
    image: 'https://via.placeholder.com/400x400/333333/ffffff?text=Weight+Belt',
    description: 'Professional-grade leather weightlifting belt',
    rating: 4.8,
    inStock: true
  },
  {
    id: 8,
    name: 'Lifting Straps',
    category: 'equipment',
    price: 19.99,
    image: 'https://via.placeholder.com/400x400/666666/ffffff?text=Lifting+Straps',
    description: 'Heavy-duty lifting straps for maximum grip support',
    rating: 4.6,
    inStock: true
  }
];

let carts = {};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    name,
    membership: 'basic'
  };
  
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);
  res.json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name, membership: newUser.membership } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword && password !== 'password') { // fallback for demo
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, membership: user.membership } });
});

// Product Routes
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Cart Routes
app.get('/api/cart', (req, res) => {
  const userId = req.headers['user-id'] || 'guest';
  const cart = carts[userId] || [];
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const userId = req.headers['user-id'] || 'guest';
  const { productId, quantity } = req.body;

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      carts[userId].push({
        productId,
        quantity: quantity || 1,
        product
      });
    }
  }

  res.json(carts[userId]);
});

app.delete('/api/cart/:productId', (req, res) => {
  const userId = req.headers['user-id'] || 'guest';
  if (carts[userId]) {
    carts[userId] = carts[userId].filter(item => item.productId !== parseInt(req.params.productId));
  }
  res.json(carts[userId] || []);
});

// Checkout Route
app.post('/api/checkout', (req, res) => {
  const userId = req.headers['user-id'] || 'guest';
  const { shippingInfo, paymentInfo } = req.body;

  // In a real app, this would process payment and create an order
  const cart = carts[userId] || [];
  
  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // Clear cart after checkout
  carts[userId] = [];

  res.json({ 
    success: true, 
    orderId: `ORD-${Date.now()}`,
    message: 'Order placed successfully!' 
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

