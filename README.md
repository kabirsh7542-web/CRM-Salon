# CRM-Salon

Single-client Salon CRM web application engineered specifically for a single luxury salon owner and studio director. Built with React, Vite, TypeScript, and Tailwind CSS.

> **Important Scope Note:**  
> This is a private, single-tenant internal web application. It does **not** include SaaS billing, subscription tiers, multi-salon tenancies, public self-signup, or appointment booking modules.

---

## Technology Stack

- **Framework**: [React.js](https://react.dev/) (v19) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a curated luxury salon color scheme (charcoal dark sidebar, soft blush pink accents, and pastel metric card tokens)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Backend & Database (Phase 2 readiness)**: [Supabase](https://supabase.com/) (Auth, PostgreSQL, Storage)
- **Messaging (Phase 2 readiness)**: [Meta WhatsApp Cloud API / WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/cloud-api)

---

## Folder Structure

```
CRM Salon/
├── .env.example              # Safe template for environment variables
├── README.md                 # Complete documentation & developer guide
├── index.html                # HTML5 entry with Google Fonts
├── package.json              # Dependencies and run scripts
├── tsconfig.json             # Root TypeScript project references
├── tsconfig.app.json         # Strict React/DOM TypeScript configuration
├── tsconfig.node.json        # Vite build tool TypeScript configuration
├── vite.config.ts            # Vite bundler configuration
├── tailwind.config.js        # Salon palette, charcoal & pastel card styling
├── postcss.config.js         # PostCSS plugins (Tailwind, Autoprefixer)
└── src/
    ├── main.tsx              # React DOM application mount point
    ├── App.tsx               # Main routing orchestrator
    ├── index.css             # Tailwind base, utilities & custom scrollbar
    ├── types/                # Domain models & strict TypeScript interfaces
    │   ├── crm.ts            # Customer, Campaign, Reply, Stats, Segment
    │   └── index.ts          # Central export
    ├── lib/
    │   └── mockData.ts       # Realistic salon metrics, clients, and replies
    ├── utils/
    │   └── formatters.ts     # Currency, number, percentage, and cn helpers
    ├── components/
    │   ├── common/           # Universal UI primitives
    │   │   ├── Badge.tsx     # Rounded status & customer segment badges
    │   │   ├── Button.tsx    # Luxury buttons with variants & spinners
    │   │   ├── Card.tsx      # Rounded shadow card with padding options
    │   │   └── Input.tsx     # Accessible input with label, icons & errors
    │   ├── dashboard/        # Dashboard-specific widgets
    │   │   ├── StatCard.tsx                 # 8 Pastel metric stat cards
    │   │   ├── MessagePerformanceChart.tsx  # WhatsApp conversion funnel
    │   │   ├── QuickActions.tsx             # Front-desk action shortcuts
    │   │   ├── CustomerSegments.tsx         # Client breakdown visualization
    │   │   ├── RecentCampaignsTable.tsx     # Broadcast delivery history
    │   │   ├── RecentCustomersList.tsx      # Recent client visits & spend
    │   │   └── RecentRepliesList.tsx        # WhatsApp reply previews
    │   ├── customers/        # Customer management subcomponents (Phase 2)
    │   ├── campaigns/        # Campaign creator subcomponents (Phase 2)
    │   └── inbox/            # Unified chat subcomponents (Phase 2)
    ├── layouts/
    │   ├── DashboardLayout.tsx # Persistent responsive container
    │   ├── Sidebar.tsx         # Dark luxury sidebar with mobile drawer
    │   └── Header.tsx          # Top bar with search, alerts, & owner badge
    └── pages/
        ├── Login/
        │   └── LoginPage.tsx         # Luxury split-screen salon login
        ├── Dashboard/
        │   └── DashboardPage.tsx     # Full StyleSalon CRM console
        ├── Customers/
        │   └── CustomersPage.tsx     # Client directory (Phase 1 preview)
        ├── Campaigns/
        │   └── CampaignsPage.tsx     # WhatsApp broadcasts (Phase 1 preview)
        ├── Templates/
        │   └── TemplatesPage.tsx     # Meta WhatsApp templates
        ├── Inbox/
        │   └── InboxPage.tsx         # Two-way client WhatsApp chat
        ├── Reports/
        │   └── ReportsPage.tsx       # Retention and delivery analytics
        ├── Settings/
        │   └── SettingsPage.tsx      # Salon profile & WhatsApp API keys
        └── NotFoundPage.tsx          # Catch-all 404 handler
```

---

## Getting Started & Installation

### Prerequisites
- Node.js >= 18.x (Node 20+ recommended)
- npm >= 9.x

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to create your local `.env`:
```bash
cp .env.example .env
```
*(No real keys are required to run Phase 1).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available NPM Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with hot module replacement (HMR) |
| `npm run build` | Compiles TypeScript (`tsc -b`) and bundles production assets via Vite |
| `npm run preview` | Locally serves the production bundle from `dist/` |
| `npm run lint` | Runs ESLint on project files |

---

## Routes & Navigation

| Route | View | Description |
| :--- | :--- | :--- |
| `/login` | `LoginPage` | Salon-branded login with password toggle & single-tenant access |
| `/dashboard` | `DashboardPage` | StyleSalon console with 8 stat cards, funnel, segments, & lists |
| `/customers` | `CustomersPage` | Client database with phone numbers, lifetime spend, and tags |
| `/campaigns` | `CampaignsPage` | WhatsApp broadcast manager with read rate & delivery statuses |
| `/templates` | `TemplatesPage` | Meta approved message templates |
| `/inbox` | `InboxPage` | Two-way client chat preview |
| `/reports` | `ReportsPage` | Deliverability health and conversion metrics |
| `/settings` | `SettingsPage` | Salon studio profile & WhatsApp Business configuration |

---

## Phase 2 Roadmap

- [ ] **Supabase Integration**:
  - Connect PostgreSQL database tables (`customers`, `campaigns`, `messages`, `templates`).
  - Configure Supabase Auth for private salon director session management.
  - Setup Row-Level Security (RLS) and storage buckets for client media.
- [ ] **Official WhatsApp Business Platform (Cloud API)**:
  - Connect Meta Webhooks for real-time delivery ticks (`sent`, `delivered`, `read`).
  - Implement two-way inbound message handling to the Unified WhatsApp Inbox.
  - Template broadcast dispatch queue with rate limiting.
- [ ] **Batch Import**:
  - Full CSV/vCard contact import with deduplication and phone normalization.
