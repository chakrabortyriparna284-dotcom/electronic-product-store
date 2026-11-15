# MERN STACK PROJECT REPORT
# VoltTech: Full-Stack Electronic Product E-Commerce Platform

---

### Submitted By
| Student Name | University Enrollment Roll |
| :--- | :--- |
| **Arghadip Gayen** | *(Insert Enrollment Roll No.)* |
| **Riparna Chakraborty** | *(Insert Enrollment Roll No.)* |
| **Anita Pal** | *(Insert Enrollment Roll No.)* |
| **Anirban Bera** | *(Insert Enrollment Roll No.)* |

**Project Report Submission for:**  
*Software Engineering & Project Management Laboratory*  
*&*  
*Database Management Systems Laboratory*  

**Department of Computer Science & Engineering**  
**UNIVERSITY OF ENGINEERING & MANAGEMENT, KOLKATA**  
University Area, Plot No. III – B/5, New Town, Action Area – III, Kolkata – 700160  

---

## ACKNOWLEDGEMENT

We would like to take this opportunity to thank everyone whose cooperation and encouragement throughout this project have been invaluable to us.

We are sincerely grateful to our subject teachers and all other teachers concerned in the Department of Computer Science & Engineering, University of Engineering & Management (UEM), Kolkata, for their wisdom, guidance, and inspiration that helped us to go through with this project and take it to where it stands now.

Last but not least, we extend our warm regards to our families and peers, who have supported us and always had faith in our work.

- Arghadip Gayen – *(Enrollment No.)*
- Riparna Chakraborty – *(Enrollment No.)*
- Anita Pal – *(Enrollment No.)*
- Anirban Bera – *(Enrollment No.)*

---

## TABLE OF CONTENTS

- **ABSTRACT**
- **CHAPTER 1: INTRODUCTION**
  - 1.1 Overview
  - 1.2 Purpose & Scope
  - 1.3 Key Features
- **CHAPTER 2: PROBLEM STATEMENT**
  - 2.1 Limitations of Existing E-Commerce Architectures
  - 2.2 Objective & Problem Definition
- **CHAPTER 3: PROPOSED SOLUTION**
  - 3.1 Software Requirements Specifications (SRS)
    - 3.1.1 Functional Requirements
    - 3.1.2 Non-Functional Requirements
    - 3.1.3 Hardware and Software Environment
  - 3.2 System Architecture & Design
- **CHAPTER 4: EXPERIMENTAL SETUP AND RESULT ANALYSIS**
  - 4.1 Front-End Architecture (React.js + Vite + Tailwind CSS)
  - 4.2 Back-End Architecture (Node.js + Express.js + JWT)
  - 4.3 Database, Cloud Connections & Deployment Setup
    - 4.3.1 MongoDB Atlas Cloud Cluster
    - 4.3.2 Data Seeding & CRUD Query Demonstrations
    - 4.3.3 Cloud Deployment (Render & Vercel)
- **CHAPTER 5: CONCLUSION & FUTURE SCOPE**
  - 5.1 Project Summary
  - 5.2 Future Enhancements
- **BIBLIOGRAPHY**

---

## ABSTRACT

In the contemporary digital economy, consumer electronics demand dynamic, scalable, and responsive platforms capable of managing multi-category catalogs, customer authentication, real-time inventory tracking, and seamless order dispatching. This project presents **VoltTech**, a modern, full-stack electronic product e-commerce web platform engineered using the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact.js, **N**ode.js).

VoltTech addresses the latency, rigidity, and scalability bottlenecks of traditional server-side rendering systems by decoupling the presentation layer (Single Page Application via React and Vite) from the business logic layer (RESTful API via Express and Node.js). Persistence is managed through **MongoDB Atlas**, a cloud-native NoSQL database cluster, providing schema flexibility, horizontal scalability, and high availability. Security is enforced through JSON Web Token (JWT) stateless authentication and bcrypt password hashing. The complete application is deployed in production using **Render** (API backend) and **Vercel** (frontend CDN), demonstrating end-to-end cloud orchestration, fault-tolerant database connectivity, and production-grade software engineering best practices.

---

## CHAPTER – 1: INTRODUCTION

### 1.1 Overview
The global electronics market requires high availability, rapid search filtration, and rich interactive catalogs. VoltTech is engineered as a production-ready e-commerce solution catering specifically to high-performance consumer technology, categorized into:
- Laptops & Ultrabooks
- Smartphones & Flagships
- High-Fidelity Audio Equipment
- Smart Wearables
- Accessories & Peripherals

The project is structured according to the modular MVC (Model-View-Controller) paradigm on the backend, complemented by a Component-Driven Architecture with unidirectional state management on the frontend.

### 1.2 Purpose & Scope
The principal objective of this project is to apply core concepts of **Software Engineering & Project Management** (agile workflows, architectural separation of concerns, API contracts, automated seeder scripts) and **Database Management Systems** (NoSQL document modeling, indexing, schema references, cluster security, and CRUD transaction management).

### 1.3 Key Features
- **Dynamic Catalog Navigation**: Multi-category filtering and real-time substring search.
- **Cart & Order State Engine**: Persistent cart state managed via React Context API and browser LocalStorage.
- **Secure Authentication**: Role-based access (Regular Customer vs. Store Administrator) protected with bcrypt and JWT signatures.
- **Automated Seeder & Data Migration**: Built-in CLI seeding scripts to populate and verify database collections.
- **Cloud-Native Deployment**: MongoDB Atlas cluster integrated with automatic DNS resolution fallbacks, Render continuous delivery, and Vercel edge reverse-proxying.

---

## CHAPTER – 2: PROBLEM STATEMENT

### 2.1 Limitations of Existing Systems
Traditional e-commerce platforms often suffer from significant architectural limitations:
1. **Monolithic Tightly-Coupled Architectures**: Modifying frontend styling or presentation logic often requires full redeployments of server-side code, resulting in operational downtime.
2. **Relational Schema Rigidity**: Consumer electronic specifications (e.g., CPU frequency for laptops vs. water resistance for smartwatches) vary widely across categories. Forcing dynamic attributes into rigid relational tables causes excessive null values, complicated foreign key joins, and slow query performance.
3. **Session-State Scalability Bottlenecks**: Server-bound session storage restricts horizontal auto-scaling across geographically distributed servers.
4. **Sub-optimal Mobile and Responsive Experiences**: Full-page reloads consume unnecessary bandwidth and lead to high bounce rates on intermittent networks.

### 2.2 Objective & Problem Definition
To overcome these limitations, our project objective is defined as:
> *"To design, implement, and deploy a secure, responsive, and decoupled MERN-based e-commerce platform that leverages a schema-flexible NoSQL cloud database, delivers a Single Page Application (SPA) user experience, enforces stateless token-based authorization, and maintains high performance under concurrent requests."*

---

## CHAPTER – 3: PROPOSED SOLUTION

### 3.1 Software Requirements Specifications (SRS)

#### 3.1.1 Functional Requirements
1. **User Management Module**:
   - Customer account registration with duplicate email validation.
   - User authentication returning an expiring JWT bearer token.
   - Profile retrieval with encrypted credential protection.
2. **Catalog & Product Management Module**:
   - Query all products with optional query parameters (`?category=...`, `?search=...`).
   - Query individual product by unique MongoDB 24-character hexadecimal `_id`.
   - Real-time stock decrement and inventory status tracking.
3. **Cart & Checkout Management Module**:
   - Local state cart supporting quantity increments, decrements, and removals.
   - Multi-step checkout validating shipping address, contact details, and payment selection.
4. **Order Processing Module**:
   - Order creation persisting line items, prices, shipping address, and payment status.
   - Immediate generation of order confirmation receipt with unique transaction identifiers.

#### 3.1.2 Non-Functional Requirements
- **Performance**: API response times under 200ms for indexed read operations; Vite frontend build bundle optimizations with chunk splitting.
- **Security**: Passwords hashed using `bcryptjs` (salt factor 10); environment variables isolated via `.env` and excluded from version control via `.gitignore`.
- **Reliability & Fault Tolerance**: Graceful fallback data handling on backend if cloud network interruptions occur; automatic reconnection triggers on incoming traffic.
- **Responsiveness**: Mobile-first fluid grid layout powered by Tailwind CSS.

#### 3.1.3 Hardware and Software Environment
- **Development Hardware**: Intel Core i5/i7 or AMD Ryzen Processor, 8GB/16GB RAM, Broadband Internet.
- **Operating System**: Windows 11 / Linux Ubuntu.
- **Runtime Environment**: Node.js v18+ / v20+.
- **Database Engine**: MongoDB Atlas Cloud Cluster (v7.0+ Replica Set).
- **Core Frameworks**: Express.js (v4.21), React (v18.3), Vite (v6.0).
- **Tooling & IDE**: Visual Studio Code, Git, GitHub CLI (`gh`), cURL / Postman.

### 3.2 System Architecture & Design
The system employs a 3-tier decoupled client-server architecture:

```
[ Client Layer (Vercel CDN) ]
        │  HTTPS (JSON Payloads)
        ▼
[ Business Logic Layer (Render Node/Express Server) ]
        │  Mongoose ODM (TLS / TCP 27017)
        ▼
[ Data Persistence Layer (MongoDB Atlas Cloud Cluster) ]
```

---

## CHAPTER – 4: EXPERIMENTAL SETUP AND RESULT ANALYSIS

### 4.1 Front-End Architecture
- **Framework**: React 18 with Vite for lightning-fast Hot Module Replacement (HMR).
- **State Management**:
  - `AuthContext`: Tracks user session, login state, and JWT storage in `localStorage`.
  - `CartContext`: Maintains active cart items, calculates subtotals, tax, and item counts.
- **Component Hierarchy**:
  - `Navbar`: Global sticky navigation with category links and real-time cart badge.
  - `ProductCard`: Reusable UI card rendering dynamic ratings, prices, and stock indicators.
  - `HomePage`, `ProductDetailPage`, `CartPage`, `CheckoutPage`, `OrderSuccessPage`.
- **Styling**: Tailwind CSS delivering responsive flexbox and grid layouts.

### 4.2 Back-End Architecture
- **API Framework**: Express.js running on Node.js runtime.
- **Middleware Pipeline**:
  - `cors()`: Cross-Origin Resource Sharing handling.
  - `express.json()`: Body parsing for incoming JSON payloads.
  - `authMiddleware.js`: JWT token verification and user extraction via `protect` handler.
  - `errorMiddleware.js`: Centralized 404 and 500 JSON error interceptor.
- **REST Endpoints Table**:

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Health check & DB cluster status | Public |
| `GET` | `/api/products` | Get all products (with category & search) | Public |
| `GET` | `/api/products/:id` | Get single product details | Public |
| `POST` | `/api/users/register` | Register new customer account | Public |
| `POST` | `/api/users/login` | Authenticate customer & return JWT | Public |
| `POST` | `/api/orders` | Create new purchase order | Public / User |
| `GET` | `/api/orders/:id` | Fetch order details by ID | Public / User |

### 4.3 Connections & Setup

#### 4.3.1 MongoDB Atlas Cloud Cluster
The persistence layer is configured on MongoDB Atlas using a cloud replica set (`Cluster0`).
- **Connection URI Format**:
  `mongodb+srv://<username>:<password>@cluster0.snabkgw.mongodb.net/electronic-store?retryWrites=true&w=majority`
- **Security & Network Access**:
  - Cloud IP access rule `0.0.0.0/0` configured to allow secure TLS connections from Render containers.
  - Role-based database user credential access with least-privilege permissions.

#### 4.3.2 Data Seeding & CRUD Query Demonstrations
A custom automated migration script (`server/src/seeder.js`) was engineered to initialize demo data:
- **8 Electronic Products** across 5 categories seeded with high-resolution imagery and specs.
- **2 Test Accounts** (`demo@example.com` and `admin@example.com`) initialized with pre-hashed credentials.

**MongoDB CRUD Verification Output:**
```javascript
// Read Query
db.products.find({ category: "Smartphones" })

// Update Query
db.products.updateOne(
  { name: "Dell XPS 15 OLED InfinityEdge Laptop" },
  { $set: { price: 1749.99, countInStock: 10 } }
)

// Insert Query
db.products.insertOne({
  name: "Sony PlayStation 5 Pro",
  brand: "Sony",
  category: "Gaming",
  price: 699.99,
  countInStock: 15
})
```

#### 4.3.3 Cloud Deployment Configuration
- **Backend (Render Web Service)**:
  - Repository: `chakrabortyriparna284-dotcom/electronic-product-store`
  - URL: `https://electronic-product-store.onrender.com`
  - Environment Variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`.
- **Frontend (Vercel CDN Edge)**:
  - Configured with `vercel.json` reverse proxy rewrites:
    ```json
    {
      "rewrites": [
        { "source": "/api/:path*", "destination": "https://electronic-product-store.onrender.com/api/:path*" },
        { "source": "/(.*)", "destination": "/" }
      ]
    }
    ```
  - Eliminates Cross-Origin Resource Sharing (CORS) complications and enables clean Single Page Application client-side route navigation.

---

## CHAPTER – 5: CONCLUSION & FUTURE SCOPE

### 5.1 Project Summary
The VoltTech Electronic Product Store project was successfully designed, developed, tested, and deployed to production. By implementing the MERN stack, the application achieves high modularity, robust data persistence in MongoDB Atlas, and a responsive customer experience. The project serves as a comprehensive practical demonstration of modern full-stack web engineering, meeting all specifications of the **Software Engineering & Project Management Laboratory** and **Database Management Systems Laboratory**.

### 5.2 Future Scope
1. **Payment Gateway Integration**: Integration of production payment webhooks (Stripe / Razorpay) for automated settlement processing.
2. **Admin Dashboard Analytics**: Graphical visualization of gross sales, inventory turnover, and customer acquisition metrics using Chart.js or Recharts.
3. **Recommendation Engine**: Implementation of collaborative filtering algorithms to recommend complementary electronics based on customer order history.
4. **Automated Order Notifications**: Email and SMS dispatch alerts utilizing Nodemailer or Twilio.

---

## BIBLIOGRAPHY

1. Chodorow, K. (2013). *MongoDB: The Definitive Guide: Powerful and Scalable Data Storage*. O'Reilly Media.
2. Banks, A., & Porcello, E. (2020). *Learning React: Modern Patterns for Developing React Apps*. O'Reilly Media.
3. Brown, E. (2019). *Web Development with Node and Express: Leveraging the JavaScript Stack*. O'Reilly Media.
4. Pressman, R. S., & Maxim, B. R. (2020). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill Education.
5. Elmasri, R., & Navathe, S. B. (2015). *Fundamentals of Database Systems* (7th ed.). Pearson.
6. MongoDB Atlas Documentation: [https://www.mongodb.com/docs/atlas/](https://www.mongodb.com/docs/atlas/)
7. Express.js Official Guide: [https://expressjs.com/](https://expressjs.com/)
8. React Documentation: [https://react.dev/](https://react.dev/)
