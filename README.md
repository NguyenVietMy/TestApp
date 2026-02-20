# GYM POWER - Premium Gym Supplements & Merchandise Ecommerce Platform

A modern, flashy ecommerce application for gym supplements and merchandise, inspired by top gym brands like Gymshark, YoungLA, and LA Fitness.

## Features

- 🎨 **Stunning Landing Page** - Eye-catching hero section with featured products
- 🛍️ **Product Catalog** - Browse supplements, merchandise, and equipment
- 🛒 **Shopping Cart** - Add, remove, and manage items
- 👤 **User Authentication** - Login and registration with membership tiers
- 💳 **Checkout System** - Complete checkout flow with shipping and payment
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Modern UI/UX** - Dark theme with red accents matching gym brand aesthetics

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- CSS3 with modern animations

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Install root dependencies:**
```bash
npm install
```

2. **Install frontend dependencies:**
```bash
cd frontend
npm install
cd ..
```

3. **Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

## Running the Application

### Development Mode (Runs both frontend and backend)

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Project Structure

```
Random Ecommerce App/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   └── Navbar.css
│       ├── context/
│       │   ├── AuthContext.js
│       │   └── CartContext.js
│       ├── pages/
│       │   ├── Landing.js
│       │   ├── Landing.css
│       │   ├── Products.js
│       │   ├── Products.css
│       │   ├── ProductDetail.js
│       │   ├── ProductDetail.css
│       │   ├── Cart.js
│       │   ├── Cart.css
│       │   ├── Login.js
│       │   ├── Login.css
│       │   ├── Checkout.js
│       │   └── Checkout.css
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── backend/
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (supports ?category= and ?search= query params)
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process order

## Demo Credentials

For testing purposes, you can register a new account or use:
- Email: `demo@example.com`
- Password: `password`

## Features in Detail

### Navigation
- Responsive navbar with dropdown menus
- Search functionality
- Shopping cart badge with item count
- User account menu (when logged in)

### Landing Page
- Hero section with call-to-action buttons
- Features section highlighting benefits
- Featured products grid
- Social proof statistics
- Membership CTA section

### Product Pages
- Category filtering
- Search functionality
- Product cards with hover effects
- Quick add to cart
- Product detail pages with quantity selector

### Cart & Checkout
- Real-time cart updates
- Shipping calculation (free over $75)
- Secure checkout form
- Order confirmation

### Authentication
- Login/Register toggle
- Form validation
- Membership benefits display
- Protected routes

## Customization

### Hero Section Background Images
The landing page hero section uses two background images for a layered effect:

1. **Place your images in `frontend/public/images/`:**
   - `hero-bodybuilder.jpg` - The GORILLA WEAR bodybuilder promotional image (dark gym setting)
   - `hero-merchandise.jpg` - The gym merchandise collection image (NO PAIN NO GAIN, LORNA SHORE products)

2. **Image Requirements:**
   - Recommended size: 1920x1080px or larger
   - Format: JPG or PNG
   - The images will be automatically layered and blended for a dramatic effect

3. **If images aren't available:**
   - The hero section will fall back to a gradient background
   - The design will still look great without the images

### Colors
The app uses a dark theme with red accents. You can customize colors in:
- CSS files for component-specific styles
- `index.css` for global styles

### Products
Add/modify products in `backend/server.js` in the `products` array.

### Branding
Update the logo and brand name in:
- `Navbar.js` - Logo text
- `index.html` - Page title

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The backend uses mock data stored in memory (resets on server restart)
- Payment processing is simulated (no actual charges)
- Images use placeholder URLs - replace with actual product images
- JWT secret should be changed in production

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Real payment processing (Stripe/PayPal)
- Product image upload
- Order history
- Product reviews and ratings
- Email notifications
- Admin dashboard
- Inventory management

## License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Built with 💪 for the fitness community**

