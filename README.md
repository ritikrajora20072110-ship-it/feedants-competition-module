# Feedants - Competition Details Screen (Full-Stack Module)

A production-grade, highly scalable, and concurrency-safe full-stack feature for **Feedants' Competition Details Screen**, built with **React Native**, **Node.js (Express)**, and **MongoDB**.

---

## 🌟 Features Overview

- **Pixel-Perfect UI**: Faithfully implements the design reference provided in the technical assignment, complete with custom styled cards, countdown banners, trust badges, previous winners carousel, and rewards distribution breakdown.
- **Dynamic Lifecycle & State Machine**: Dynamic state determination (`UPCOMING`, `REGISTRATION_OPEN`, `REGISTRATION_FULL`, `SUBMISSION_OPEN`, `JUDGING`, `COMPLETED`) based on server timestamps and spot capacity.
- **Live Dynamic Countdown**: Ticking countdown timer that calculates exact remaining time to deadlines (`01d : 06h : 28m : 32s`).
- **High Concurrency & Atomic Spot Booking**: Handles high volume simultaneous registration attempts without overbooking using MongoDB conditional atomic updates (`findOneAndUpdate` with `$expr` capacity guards) and rollback mechanisms.
- **Bilingual Localization (i18n)**: Instant client-side and server-backed toggle between **English (ENG)** and **Hindi (हिंदी)**.
- **Interactive Full-Stack Modals**:
  - 💳 **Razorpay Payment / Registration Modal**: Simulated 256-bit encrypted checkout with immediate spot decrement.
  - 🎬 **Video Player Modal**: High-definition video player for Judge intro and Previous Winners' winning performances.
  - 📤 **Submission Upload Modal**: Form validation and submission workflow for paid participants.
  - 💬 **Hear From Our Users Drawer**: Dynamic verified user reviews and ratings.
  - 🛠 **Evaluation State Switcher**: Quick-toggle panel allowing evaluators to simulate and record different user/competition states (Registered, Unregistered, Sold Out, etc.) with a single tap!

---

## 🏗 System Architecture

```mermaid
flowchart TD
    subgraph Frontend["React Native / Expo Frontend"]
        UI[Competition Screen]
        Lang[i18n Engine (ENG/हिंदी)]
        Countdown[Live Dynamic Countdown]
        Modals[Payment / Video / Submission Modals]
        Switcher[State Switcher & Evaluator Tool]
    end

    subgraph Backend["Node.js + Express API"]
        Router["Express REST Routes (/api)"]
        Controller["Competition / Review Controllers"]
        Service["Competition Business Logic Service"]
        Guard["Atomic Concurrency & Capacity Guard"]
    end

    subgraph Database["MongoDB Database"]
        Competitions[(Competitions)]
        Registrations[(Registrations)]
        Submissions[(Submissions)]
        Reviews[(Reviews)]
        Users[(Users)]
    end

    UI -->|1. Fetch Dynamic Details| Router
    UI -->|2. Register / Pay| Router
    UI -->|3. Submit Video Entry| Router
    Router --> Controller --> Service --> Guard --> Database
```

---

## 🚀 Concurrency & High-Load Strategy

When thousands of users attempt to book the final remaining spots in a flash competition simultaneously, naive read-modify-write patterns result in race conditions and severe overbooking.

To guarantee **100% data consistency**:
1. **Atomic Conditional Update**:
   ```javascript
   const updatedComp = await Competition.findOneAndUpdate(
     {
       _id: competitionId,
       isActive: true,
       $expr: { $lt: ['$currentParticipants', '$maxParticipants'] }
     },
     {
       $inc: { currentParticipants: 1 }
     },
     { new: true }
   );
   ```
2. **ACID Uniqueness & Rollback**:
   - Compound unique index `{ userId: 1, competitionId: 1 }` on the `Registration` collection guarantees an individual user cannot double-register.
   - If a failure occurs during payment record creation, a compensating decrement transaction (`$inc: { currentParticipants: -1 }`) restores spot availability.
3. **Automated Stress Testing**:
   - Included in test suite: `backend/tests/concurrency.test.js` fires 25 simultaneous concurrent requests on a 5-spot competition; exactly 5 succeed (200 OK) and 20 fail gracefully (409 Conflict - SPOTS_FULL).

---

## 📁 Repository Structure

```
feedants/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Error handler & validation
│   │   ├── models/          # Mongoose Schemas (Competition, Registration, Submission, etc.)
│   │   ├── routes/          # API route definitions
│   │   ├── scripts/         # Seed script & fixtures
│   │   ├── services/        # Business logic & atomic concurrency service
│   │   ├── app.js           # Express App
│   │   └── server.js        # Server listener
│   ├── tests/               # Integration & Concurrency Jest tests
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Modular React Native UI components
│   │   │   ├── Modals/      # Video, Payment, Submission, Reviews, StateSwitcher
│   │   │   ├── Header.js
│   │   │   ├── HeroSection.js
│   │   │   ├── PrizeAndSpotsCard.js
│   │   │   ├── JudgeCard.js
│   │   │   ├── CountdownBanner.js
│   │   │   ├── ImportantDates.js
│   │   │   ├── PreviousWinnersCarousel.js
│   │   │   ├── TabsSection.js
│   │   │   ├── RewardsBreakdown.js
│   │   │   ├── TrustSection.js
│   │   │   ├── ReferralBanner.js
│   │   │   ├── UserReviewsSection.js
│   │   │   ├── BottomActionBar.js
│   │   │   └── BottomNavBar.js
│   │   ├── constants/       # Theme, colors, typography, i18n translations
│   │   ├── screens/         # CompetitionDetailsScreen
│   │   └── services/        # API client
│   ├── App.js
│   └── package.json
└── README.md
```

---

## 🛠 Setup & Running Instructions

### Prerequisites
- **Node.js**: v18+ (Tested on v22)
- **MongoDB**: Local `mongod` instance or MongoDB Atlas URI

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# (Optional) Configure environment variables in .env
# Default PORT=5001, MONGODB_URI=mongodb://127.0.0.1:27017/feedants_db

# Seed database with sample competitions, reviews, and test users
npm run seed

# Run automated tests (Integration + Concurrency stress tests)
npm test

# Start backend development server
npm run dev
# Backend runs at http://localhost:5001
```

---

### 2. Frontend Setup (React Native / Expo)

The frontend runs seamlessly across **Web browser**, **iOS Simulator**, **Android Emulator**, and **Expo Go**.

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Option A: Start in Web Browser (Instant Preview)
npm run web

# Option B: Start Expo Dev Server (iOS / Android / Expo Go)
npm start
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/competitions` | List all competitions with dynamic status & spots remaining |
| `GET` | `/api/competitions/:id` | Fetch competition details + user-specific registration state |
| `POST` | `/api/competitions/:id/register` | Concurrency-safe atomic spot booking & registration |
| `POST` | `/api/competitions/:id/submit` | Upload performance entry (Registered participants only) |
| `GET` | `/api/competitions/:id/submissions` | Retrieve submissions list |
| `GET` | `/api/reviews` | Retrieve user testimonials |
| `POST` | `/api/seed` | Programmatically re-seed database |

---

## 📝 Key Technical Decisions & Assumptions

### Assumptions
1. **User Identity**: In a live system, user identity is extracted from JWT authorization headers. For demonstration and instant testing without mandatory signup, the system supports a header/query fallback `userId` or defaults to a verified demo user.
2. **Submission Rules**: Submissions are strictly gated to users who have completed paid registration, as specified in the assignment disclaimer.
3. **Deadlines**: Dynamic status and countdown target are computed server-side and ticked client-side to prevent client-clock tampering.

### Trade-offs Considered
1. **Pessimistic vs. Optimistic Locking**:
   - *Choice*: Used MongoDB conditional atomic updates (`findOneAndUpdate`).
   - *Rationale*: Avoids heavy distributed locks / Redis redlock overhead while providing sub-millisecond ACID consistency under high concurrent throughput.
2. **React Native Web Support**:
   - Built using standard React Native primitive components (`View`, `Text`, `TouchableOpacity`, `ScrollView`, `Modal`) mapped through `@expo/metro-runtime` and `react-native-web` to allow testing directly in web browsers as well as physical mobile devices.

---

## 🚀 Production Improvements for Scale

1. **Redis Caching & CDN**:
   - Cache competition static metadata in Redis with cache invalidation on write, relieving primary database load during viral traffic spikes.
2. **Distributed Queue for Submissions**:
   - Use AWS S3 Direct Pre-signed URLs for media uploads with RabbitMQ / AWS SQS for asynchronous video transcoding and thumbnail generation.
3. **Webhooks for Payment Gateways**:
   - Integrate Razorpay webhook signature verification with idempotency keys to handle asynchronous payment settlements.
4. **WebSocket / SSE for Live Spot Counters**:
   - Broadcast live remaining spot updates via Socket.io / Server-Sent Events to all active viewers in real time when spots drop below 5.
