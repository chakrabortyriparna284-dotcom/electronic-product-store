# Glossary: Electronic Product Store (MERN)

A shared vocabulary for the project, domain concepts, and technical architecture.

## Domain Concepts

### Product
An electronic item available for purchase in the store. Key properties: name, brand, category, price, description, image URL, stock count, and rating.

### Category
A grouping of electronics. Canonical categories: `Laptops`, `Smartphones`, `Audio`, `Wearables`, `Accessories`.

### Cart
An in-memory (or local storage backed) list of items selected by a visitor before checkout, tracking item IDs, selected quantities, and subtotal calculation.

### Order
A finalized purchase transaction stored in MongoDB. Records the purchasing user, list of order items, shipping details, total amount, payment status, and creation timestamp.

---

## Technical Stack & Terms

### MERN
The technology stack used:
- **M**ongoDB: NoSQL document database storing collections for `users`, `products`, and `orders`.
- **E**xpress.js: Minimalist web framework for Node.js powering the REST API.
- **R**eact: Declarative, component-based frontend library (scaffolded with Vite).
- **N**ode.js: JavaScript runtime environment executing the backend server.

### JWT (JSON Web Token)
A compact, URL-safe token used to transmit securely between client and server. Used for authenticating users upon login/registration.

### Mongoose
An Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation and business logic hooks.

### Seeder Script
A backend utility script (`npm run seed`) that resets and populates the MongoDB database with initial sample electronic items and a demo test account.
