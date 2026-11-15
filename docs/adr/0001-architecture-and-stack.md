# ADR 0001: System Architecture and Technology Stack

- **Status**: Accepted
- **Date**: 2026-10-26
- **Context**: 3rd year college MERN stack evaluation project for an Electronic Product Store with a strict 4-hour implementation window across 2 days.

## Decision

1. **Repository Layout**:
   - Two decoupled directories: `/server` (Node.js/Express) and `/client` (React/Vite).
   - This satisfies academic grading standards for clear separation of concerns.

2. **Feature Scope (MVP)**:
   - Product catalog with search and category filtering.
   - Product details view.
   - Shopping cart with local storage persistence.
   - Order placement storing records in MongoDB.
   - Seed script with 8 curated electronic products.

3. **Authentication**:
   - Token-based authentication using JWT and password hashing via `bcryptjs`.
   - Guest browsing enabled so examiners can inspect products without requiring an account first.

4. **Database Configuration**:
   - MongoDB connection configured via `.env` to support both MongoDB Atlas (cloud) and local MongoDB instances seamlessly.

## Consequences

- **Positive**: Clean, robust architecture easily demonstrable in vivas; eliminates failure risks from external payment gateways; builds fast within the 4-hour timeline.
- **Negative**: Payments are simulated rather than processed via real gateways (e.g. Stripe).
