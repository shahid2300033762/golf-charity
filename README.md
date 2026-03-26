# Golf Charity SaaS: The Luminescent Archive of Giving

A premium, full-stack Golf Philanthropy platform designed to bridge the spirit of competition with the essence of compassion. This application enables a global community of golfers to subscribe, compete, and generate measurable impact through an automated monthly draw system.

## 🌟 Vision & Impact
Golf Charity is more than a SaaS; it is a digital heritage of generosity. Every swing recorded on our platform contributes to verified global causes, from reforestation in the Amazon to bringing clean water to East Africa.

- **10% Charity Share**: Every subscription directly funds a member-selected cause.
- **50% Prize Allocation**: Half of all revenue forms the monthly prize pool for participating members.
- **Sovereign Transparency**: Real-time tracking of funds and audited impact reports.

---

## 🚀 Technical Architecture

The platform is built with a decoupled, high-performance architecture:

### Frontend (Vite + React + Tailwind)
- **Design Language**: Ethereal, premium aesthetics with glassmorphism and GPU-accelerated animations.
- **State Management**: React Hooks with memoized components for peak performance.
- **Authentication**: Seamless Supabase Auth integration with persistence.

### Backend (Node.js + Express + TypeScript)
- **Sovereign API**: Secure endpoints for subscription management, score validation, and draw execution.
- **Security**: Strict RLS (Row Level Security) and Service Role isolation for sensitive operations.
- **Draw Engine**: An algorithmic matching system that calculates prize distribution and jackpot rollovers.

### Database (Supabase / PostgreSQL)
- **Atomic Operations**: PostgreSQL triggers ensure data integrity during draw execution and prize payouts.
- **Relational Integrity**: Unified schema connecting Users, Subscriptions, Scores, Draws, and Winners.

---

## 📊 Core System Logic: The Monthly Draw

### 1. The Entry Protocol
To qualify for the monthly draw, active subscribers must log **exactly 5 scores** (between 1 and 45) during the current month. The system enforces a rolling monthly window and prevents duplicate score entries.

### 2. The Prize Pool
The prize pool is calculated as 50% of the total subscription revenue after the 10% charity donation:
- **Jackpot (Match 5)**: 40% of the pool + any accumulated Rollover from previous months.
- **Tier 2 (Match 4)**: 35% of the pool.
- **Tier 3 (Match 3)**: 25% of the pool.

### 3. Draw Execution
At the end of each month, the system generates 5 unique winning numbers. User scores are matched against these numbers to identify winners across the three tiers.

---

## 🛠️ Project Structure

```text
├── backend/                # Sovereign Server API
│   ├── src/
│   │   ├── routes/         # Modular API controllers
│   │   ├── middleware/     # Auth and Admin guards
│   │   ├── scripts/        # Database maintenance tools
│   │   └── index.ts        # Entry point
│   └── package.json
├── frontend/               # Luminescent Frontend
│   ├── src/
│   │   ├── pages/          # Ethereal UI views
│   │   ├── components/     # High-fidelity atoms
│   │   ├── hooks/          # Domain-specific logic
│   │   └── services/       # API abstraction layer
│   └── package.json
└── DEPLOYMENT.md           # Production launch guide
```

---

## ⚙️ Local Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/shahid2300033762/golf-charity.git
   cd golf-charity
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Environment Configuration**:
   Create `.env` files in both `frontend` and `backend` using the variables listed in `DEPLOYMENT.md`.

3. **Launch**:
   ```bash
   # From root
   npm run dev
   ```

## 🔐 Security & Governance
The system uses a **Command Center (Admin Dashboard)** to verify winners and execute draws. All administrative actions require high-privilege authorization and are logged for transparency.

---

### Developed by **Golf Charity Foundation**
*Curating a digital heritage of global generosity.*
