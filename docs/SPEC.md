# Specification: Electronic Product Store (MERN)

## 1. Overview
A modern, responsive e-commerce web application specialized in electronic products (Laptops, Smartphones, Audio, Wearables, Accessories), built using the MERN stack (MongoDB, Express.js, React, Node.js). Designed for a college 3rd-year capstone/evaluation project with clear architecture, secure authentication, and an intuitive user experience.

## 2. System Architecture

```
root/
├── package.json          # Root scripts ("npm run dev" using concurrently)
├── server/               # Node.js + Express + Mongoose REST API
│   ├── src/
│   │   ├── config/       # MongoDB connection (db.js)
│   │   ├── models/       # Mongoose Schemas (User, Product, Order)
│   │   ├── controllers/  # Route logic handlers
│   │   ├── routes/       # Express API routes
│   │   ├── middleware/   # JWT Authentication & error handler
│   │   ├── data/         # Sample seeded electronics & demo users
│   │   ├── seeder.js     # "npm run seed" populator script
│   │   └── server.js     # Entry point
│   └── package.json
└── client/               # React (Vite) + Tailwind CSS SPA
    ├── src/
    │   ├── components/   # Navbar, Footer, ProductCard, Rating, etc.
    │   ├── context/      # AuthContext, CartContext
    │   ├── pages/        # Home, ProductDetails, Cart, Checkout, Success, Login, Register
    │   ├── App.jsx       # React Router setup
    │   └── main.jsx
    └── package.json
```

## 3. Data Models

### User Schema (`models/User.js`)
- `name`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Required, Hashed with `bcryptjs`)
- `isAdmin`: Boolean (Default: false)
- `timestamps`: true

### Product Schema (`models/Product.js`)
- `name`: String (Required)
- `brand`: String (Required)
- `category`: String (Required, Enum: `Laptops`, `Smartphones`, `Audio`, `Wearables`, `Accessories`)
- `price`: Number (Required)
- `description`: String (Required)
- `image`: String (Required URL)
- `countInStock`: Number (Required, Default: 0)
- `rating`: Number (Default: 4.5)
- `numReviews`: Number (Default: 0)
- `timestamps`: true

### Order Schema (`models/Order.js`)
- `user`: ObjectId referencing `User` (Optional/Nullable for Guest checkout)
- `orderItems`: Array of:
  - `name`: String
  - `qty`: Number
  - `image`: String
  - `price`: Number
  - `product`: ObjectId referencing `Product`
- `shippingAddress`:
  - `fullName`: String
  - `address`: String
  - `city`: String
  - `postalCode`: String
  - `phone`: String
- `paymentMethod`: String (Default: "Cash on Delivery / Card")
- `totalPrice`: Number
- `isPaid`: Boolean (Default: true for demo)
- `status`: String (Default: "Processing")
- `timestamps`: true

## 4. API Endpoints

### Products (`/api/products`)
- `GET /api/products`: Retrieve all products (supports `?category=` and `?search=` query filters).
- `GET /api/products/:id`: Retrieve single product details.

### Users & Auth (`/api/users`)
- `POST /api/users/register`: Register new account, returns JWT and user profile.
- `POST /api/users/login`: Authenticate email/password, returns JWT.
- `GET /api/users/profile`: Protected endpoint returning authenticated user data.

### Orders (`/api/orders`)
- `POST /api/orders`: Create and save new order.
- `GET /api/orders/:id`: Fetch order details by ID.

## 5. Frontend Pages & User Flows
1. **Header / Navbar**: Brand logo, search bar, category navigation, cart badge with item counter, user login/profile status.
2. **Home Page (`/`)**: Hero banner showcasing latest electronic deals, category selector chips, responsive product grid, star rating displays.
3. **Product Details (`/product/:id`)**: High-res image display, brand badge, full technical specs, stock availability status, quantity picker, "Add to Cart" button.
4. **Cart (`/cart`)**: Item list with thumbnail, price, quantity increment/decrement, remove item, subtotal summary, "Proceed to Checkout" button.
5. **Checkout (`/checkout`)**: Shipping address form, order summary, payment method, "Place Order" button.
6. **Order Confirmation (`/order/:id`)**: Celebratory success state with generated Order ID, delivery estimate, item breakdown, and return home button.
7. **Login / Register (`/login`, `/register`)**: Form with validation, error alerts, and a 1-click **"Fill Demo Account"** button for effortless college presentations.
