# mnemoPhi MVP – Technical Specification

## 1. Overview
- **Product:** Global user identity & consent management platform (B2B SaaS)
- **Primary Users:**  
  - Businesses (SMEs) → dashboard to view/export consent logs  
  - End-users → web page to manage consent/preferences
- **MVP Goal:** Enable businesses to capture, store, and manage user consent while remaining compliant with global data protection laws.
- **Architecture Style:** Modular monolith (backend) + separate frontend + separate SDK repo

---

## 2. System Components

### 2.1 Backend
- **Language:** Scala
- **Framework:** http4s / Play Framework / Akka HTTP
- **Design:** Modular monolith
  - Modules:
    - **ConsentService** → handles consent requests, logs, audit
    - **UserService** → manages user identities
    - **ClientService** → manages business accounts, API keys
    - **Common Module** → shared models, utilities, error handling
- **API:** REST + JSON (OpenAPI spec for documentation)
- **Auth:** API key per business client, JWT for optional dashboard users
- **Logging:** Logback for structured logging
- **Testing:** ScalaTest for unit & integration tests

### 2.2 Database
- **Type:** Relational (PostgreSQL preferred)
- **Schema Overview:**
  - `users` → id, email, hashed ID, metadata
  - `clients` → business info, API key, contact
  - `consents` → user_id, client_id, consent_type, status, timestamp
  - `audit_logs` → detailed history for compliance
  - `categories` → consent categories for businesses
- **Local MVP:** single DB instance
- **Future Scaling:** read replicas, partitioning per module/service

### 2.3 Frontend
- **Language:** JavaScript / TypeScript
- **Framework:** React / Next.js (SSR optional)
- **Structure:**
  - `dashboard/` → business users
  - `userPage/` → end-users for consent management
  - `shared/` → common components/hooks/utilities
- **API Calls:** Axios / fetch to backend endpoints
- **Styling:** TailwindCSS or CSS Modules
- **Testing:** Jest + React Testing Library; optional Cypress for E2E

### 2.4 SDK
- **Language:** JavaScript
- **Purpose:** Embed in client websites → manage consent dynamically
- **Functions:**
  - `mnemoPhi.grantConsent(type)`
  - `mnemoPhi.revokeConsent(type)`
  - `mnemoPhi.getStatus()`
  - `mnemoPhi.onChange(callback)`
- **Packaging:**
  - Bundle via Webpack/Rollup → `dist/mnemoPhi.js`
  - Optional NPM package for business integration
- **Integration Flow:**
  1. Business adds `<script>` tag or NPM package
  2. SDK calls backend API for consent CRUD
  3. Updates user preference page

### 2.5 Deployment
- **Local Dev:** Docker Compose → backend + DB + frontend
- **Cloud MVP:**  
  - Backend → VPS / cloud instance (AWS EC2 / DigitalOcean droplet)  
  - Database → Managed Postgres (AWS RDS / DigitalOcean)  
  - Frontend → Static host (Netlify, Vercel, or served via backend)
- **Ports:**
  - Backend: 8080
  - Frontend: 3000 / 3001 (dashboard + user page)
- **Optional CDN:** for SDK + static assets

### 2.6 Security
- **Transport:** HTTPS (TLS)
- **Auth:** API keys for businesses, JWT for dashboard
- **Data protection:**  
  - Hash sensitive info  
  - Store audit logs for compliance
- **Rate limiting:** protect API endpoints from abuse
- **CORS:** allow SDK and dashboard to access backend securely

### 2.7 Monitoring & Logging
- **Backend Logs:** Logback structured logs → console / file → future ELK stack
- **Error Handling:** Centralized error handler → logs + API-friendly responses
- **Optional MVP Metrics:** request count, error count

### 2.8 MVP Scope
- **Backend:** REST API to handle consent CRUD, users, clients, audit logs
- **Frontend:**  
  - Business dashboard: login, view users, export logs, manage categories  
  - User page: consent page (grant/revoke)
- **SDK:** embed on websites → call backend, show consent prompt
- **Database:** single PostgreSQL instance
- **Deployment:** single VPS for backend + DB, static frontend host

---

## 3. Future Extensions
1. **Distributed architecture** → microservices per module
2. **Cross-site consent syncing** → global identity layer
3. **Advanced analytics** → aggregated consent insights for businesses
4. **Global compliance rules** → multi-jurisdiction consent logic
5. **Optional mobile app** → for power users or enterprise dashboards

---

## 4. Tech Stack Summary
| Component        | Tech Choice / Notes                     |
|-----------------|----------------------------------------|
| Backend          | Scala, http4s / Play / Akka HTTP, SBT |
| Database         | PostgreSQL (managed or local)          |
| Frontend         | React / Next.js, TailwindCSS           |
| SDK              | JavaScript, Webpack/Rollup bundle      |
| Deployment       | Docker Compose (local), VPS/Cloud (MVP)|
| Testing          | ScalaTest (backend), Jest + RTL (frontend), E2E Cypress optional |

---

## 5. Notes / Recommendations
- **Backend Modularization:** Each service can become microservice later.
- **Frontend Separation:** Dashboard vs user page ensures clarity and maintainability.
- **SDK Repo:** Separate repo for versioning and deployment.
- **Security & Compliance:** HTTPS, API keys, audit logs, and CORS handled from day one.
- **Future-Proofing:** Modular code, clear APIs, and DB design allow smooth transition to distributed/global architecture.
