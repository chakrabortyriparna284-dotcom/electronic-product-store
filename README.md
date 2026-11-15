# ⚡ VoltTech - Electronic Product Store (MERN Stack)

A complete, full-stack **Electronic Product Store** built using the **MERN** stack (MongoDB, Express.js, React, Node.js) for 3rd-year college evaluation and capstone presentation.

---

## 🌟 Key Features

1. **Product Catalog**:
   - Filter electronics by category: `Laptops`, `Smartphones`, `Audio`, `Wearables`, `Accessories`.
   - Real-time search by product name.
   - Star ratings, customer review counts, and stock availability badges.
2. **Product Details View**:
   - High-definition product imagery and full technical specifications.
   - Dynamic quantity selector (respects available inventory in database).
   - "Add to Cart" and "Buy Now" direct checkout.
3. **Shopping Cart & Checkout**:
   - Real-time subtotal, 8% tax calculation, and free shipping calculation.
   - LocalStorage persistence (cart items stay saved even if you refresh).
   - Single-step checkout with recipient address capture.
   - Full order persistence to MongoDB with unique generated Order IDs.
4. **JWT Authentication & Security**:
   - User Registration and Login.
   - Passwords hashed with `bcryptjs` (salt rounds: 10).
   - Token-based API access control with JSON Web Tokens (JWT).
   - **1-Click Demo Login button** (`demo@example.com` / `password123`) for effortless viva presentations.
5. **Robust Database Seeding**:
   - `npm run seed` pre-loads 8 high-end tech products (MacBook Pro M3, iPhone 15 Pro, Sony WH-1000XM5, iPad, Apple Watch Ultra, etc.) with real Unsplash images.

---

## 📂 Project Architecture

```
Electronic PS/
├── package.json              # Unified runner scripts ("npm run dev")
├── GLOSSARY.md               # Domain vocabulary and definitions
├── docs/
│   ├── SPEC.md               # Project specification
│   └── adr/                  # Architecture Decision Records
│       ├── 0001-architecture-and-stack.md
│       └── 0002-data-models-and-api-contracts.md
├── server/                   # Backend (Node.js + Express + Mongoose)
│   ├── package.json
│   ├── .env                  # Port, MongoDB URI, and JWT Secret
│   └── src/
│       ├── config/db.js      # MongoDB database connection
│       ├── models/           # User.js, Product.js, Order.js
│       ├── controllers/      # productController, userController, orderController
│       ├── routes/           # productRoutes, userRoutes, orderRoutes
│       ├── middleware/       # authMiddleware (JWT protect), errorMiddleware
│       ├── data/             # products.js, users.js (Seed data)
│       ├── seeder.js         # npm run seed runner
│       └── server.js         # Express server entry point
└── client/                   # Frontend (React 18 + Vite + Context API)
    ├── package.json
    ├── vite.config.js        # Configured with /api proxy to port 5000
    └── src/
        ├── context/          # AuthContext.jsx, CartContext.jsx
        ├── components/       # Navbar, Footer, ProductCard, Rating
        ├── pages/            # Home, ProductDetail, Cart, Checkout, OrderSuccess, Login, Register
        ├── App.jsx           # React Router route configuration
        └── main.jsx
```

---

## 🚀 Quick Setup & Running (In 3 Steps)

### Step 1: Install Dependencies
Open a terminal in the project root directory and run:
```bash
npm run install:all
```
*(This installs root dependencies, server dependencies, and client dependencies).*

### Step 2: Seed the Database (Optional but Recommended)
Make sure your MongoDB server is running (either locally on port 27017 or with a MongoDB Atlas URI in `server/.env`), then run:
```bash
npm run seed
```
> *Note: Even if MongoDB is not running, the backend includes an automated in-memory catalog fallback so your store will still display products smoothly.*

### Step 3: Start Both Backend & Frontend
Run the unified dev command:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🔑 Demo Credentials for Viva / Presentation

- **Demo Customer**: `demo@example.com` / `password123`
- **Store Admin**: `admin@example.com` / `adminpassword123`
*(On the `/login` page, you can also click the blue **"⚡ 1-Click Fill Demo Account"** button to auto-fill these credentials instantly!)*

---

## 🎓 College Viva & Examiner Q&A Cheat Sheet

When the professor evaluates your project, here are the most common questions and how to answer them with confidence:

### Q1: What is the MERN stack and how does this application use it?
> **Answer**:
> - **M (MongoDB)**: A NoSQL document database used to store our electronic `products`, registered `users`, and placed `orders` as JSON-like documents.
> - **E (Express.js)**: A lightweight backend web framework on top of Node.js that routes incoming HTTP requests (like `GET /api/products` or `POST /api/orders`).
> - **R (React)**: A component-driven frontend library that renders dynamic user interfaces, handles responsive shopping carts, and manages client-side routing.
> - **N (Node.js)**: A JavaScript runtime environment that executes our backend server code outside of the browser.

### Q2: How does the React Frontend communicate with the Express Backend?
> **Answer**:
> - The frontend makes asynchronous HTTP requests using the browser's native `fetch()` API to backend endpoints.
> - In `vite.config.js`, we configured a development proxy that forwards all `/api/*` calls from port `5173` to port `5000`. This eliminates Cross-Origin Resource Sharing (CORS) errors during development.

### Q3: Why did you use Mongoose instead of the native MongoDB driver?
> **Answer**:
> - Mongoose provides **schema validation** (enforcing types like `name: String`, `price: Number`, and `required: true`).
> - It provides built-in lifecycle hooks (like `pre('save')` middleware to automatically hash passwords before saving).
> - It provides convenient methods for relational document references (like `Order.populate('user')`).

### Q4: How is User Authentication implemented and secured?
> **Answer**:
> - When a user registers or logs in, their password is verified using **`bcryptjs`**, which hashes the password using a cryptographic salt so raw passwords are never saved in the database.
> - Upon successful verification, the server issues a signed **JSON Web Token (JWT)** containing the user's ID.
> - For protected requests, the frontend sends this token in the `Authorization: Bearer <TOKEN>` header. Our backend `protect` middleware verifies the token and attaches the authenticated user to `req.user`.

### Q5: How is state managed in the React application?
> **Answer**:
> - We used React's built-in **Context API** (`AuthContext` and `CartContext`) combined with `localStorage`.
> - `CartContext` provides global access to `cartItems`, `addToCart`, and total calculations from any component without prop-drilling.
> - Cart items and login sessions are persisted to `localStorage` so refreshing the browser preserves the user's shopping cart.
