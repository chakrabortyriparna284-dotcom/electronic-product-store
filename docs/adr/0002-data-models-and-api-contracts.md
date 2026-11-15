# ADR 0002: Data Models and API Contracts

- **Status**: Accepted
- **Date**: 2026-10-26
- **Context**: Finalized data models, seed data strategy, and unified concurrency execution for the Electronic Product Store MERN application.

## Decision

1. **Category Structure**:
   - Fixed categorization: `Laptops`, `Smartphones`, `Audio`, `Wearables`, `Accessories`.
   - Allows instant filter chips on the React frontend.

2. **Seeding Strategy**:
   - Standalone runner `server/src/seeder.js` (`npm run seed`) loads 8 real-world electronics (Apple MacBook Pro, iPhone 15 Pro, Sony WH-1000XM5, iPad Air, Galaxy Watch, Logitech MX Master 3, etc.) and pre-configures a demo user `demo@example.com` / `password123`.

3. **Checkout Experience**:
   - Single-step checkout avoiding third-party gateway friction while persisting real `Order` documents in MongoDB linked to users.

4. **Dev Concurrency**:
   - Root `package.json` with `concurrently` executing `npm run dev:server` and `npm run dev:client` simultaneously.

## Consequences

- Completely eliminates terminal switching during presentations.
- Provides a populated, commercial-grade UI right after cloning and seeding.
