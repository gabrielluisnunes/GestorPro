# AI Engineering Playbook

This repository follows strict engineering principles to ensure scalable, maintainable, and production-ready software.

AI assistants must follow these rules when generating code.

---

# Core Philosophy

Before writing code, always follow this sequence:

1. Understand the problem
2. Design architecture
3. Model the data
4. Define module boundaries
5. Implement the solution
6. Refactor and improve

Never jump directly to coding.

---

# Architectural Principles

The system follows:

* modular architecture
* separation of concerns
* clean code practices
* scalable folder structure
* service oriented backend

Never mix responsibilities.

Examples of anti-patterns:

❌ Business logic inside controllers
❌ API calls directly inside UI components
❌ Database access inside controllers

Correct structure:

Controller → Service → Repository → Database

---

# Frontend Architecture Playbook

This document defines the frontend architecture standards for the project.

The goal is to ensure that the frontend codebase remains scalable, modular, and maintainable as the application grows.

Frontend code must never become monolithic.

---

# Core Principles

Frontend development must follow these principles:

* separation of responsibilities
* feature-based architecture
* reusable components
* clear folder structure
* maintainable code

Avoid large files containing UI, logic, API calls, and state all together.

---

# Feature-Based Architecture

All business features must be grouped inside a **features** directory.

Each feature represents a domain area of the product.

Example:

```id="feat-tree"
src
├── features
│   ├── transactions
│   ├── auth
│   ├── dashboard
│   └── users
```

Each feature is self-contained.

---

# Feature Structure

Each feature must follow this structure:

```id="feature-structure"
features
└── transactions
    ├── components
    │   ├── transaction-card.tsx
    │   ├── transaction-button.tsx
    │   └── transaction-list.tsx
    │
    ├── hooks
    │   └── use-transactions.ts
    │
    ├── services
    │   └── transactions-api.ts
    │
    ├── types
    │   └── transaction.types.ts
    │
    └── transaction-page.tsx
```

---

# Responsibilities

transaction-page
Responsible only for orchestrating the screen.

components
Reusable UI pieces.

hooks
State management and client-side logic.

services
API communication.

types
Type definitions and contracts.

---

# Component Rules

Components must follow the **single responsibility principle**.

Bad example:

```id="bad-example"
TransactionPage.tsx
 ├ UI
 ├ API calls
 ├ business logic
 ├ validation
 └ layout
```

Correct example:

```id="good-example"
TransactionPage
 ├ TransactionList
 ├ TransactionCard
 ├ TransactionButton
 └ useTransactions hook
```

---

# UI Layer

Shared UI components must live in:

```id="ui-folder"
src/components/ui
```

Examples:

```id="ui-examples"
Button
Input
Modal
Dropdown
Table
```

These components must not contain business logic.

---

# Layout Components

Layout components must live in:

```id="layout-folder"
src/components/layout
```

Examples:

```id="layout-examples"
Navbar
Sidebar
PageLayout
DashboardLayout
```

---

# Hooks Layer

Hooks manage state and business logic on the frontend.

Location:

```id="hooks-folder"
features/{feature}/hooks
```

Example:

```id="hook-example"
useTransactions.ts
useAuth.ts
```

Hooks may call services but must never access the database directly.

---

# Services Layer

Services handle communication with the backend.

Location:

```id="services-folder"
features/{feature}/services
```

Example:

```id="service-example"
transactions-api.ts
auth-api.ts
```

Services should:

* handle API requests
* handle response mapping
* avoid UI logic

---

# Types Layer

Types must be centralized for each feature.

Example:

```id="types-example"
Transaction
TransactionStatus
CreateTransactionInput
```

Types ensure frontend and backend contracts remain consistent.

---

# Avoid Large Files

Files larger than ~200 lines should be refactored.

Break them into:

* smaller components
* hooks
* utilities

---

# Data Flow

Frontend must follow this flow:

```id="frontend-flow"
Component → Hook → Service → API
```

Example:

```id="flow-example"
TransactionPage
 → useTransactions()
   → transactionsService.getTransactions()
     → Backend API
```

Never call APIs directly inside components.

---

# Folder Example (Complete)

```id="full-frontend-tree"
src
│
├── features
│   ├── transactions
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── types
│   │   └── transaction-page.tsx
│   │
│   ├── auth
│   └── dashboard
│
├── components
│   ├── ui
│   └── layout
│
├── hooks
├── services
├── types
└── utils
```

---

# Scalability Goals

This architecture allows:

* large teams to collaborate
* features to evolve independently
* components to be reused
* logic to stay organized

It prevents the frontend from turning into a monolithic codebase.

---

# Implementation Rule

When implementing a new feature:

1. create the feature folder
2. define types
3. create services
4. create hooks
5. create UI components
6. assemble the page

Only after this structure exists should the feature be implemented.

This ensures long-term maintainability of the codebase.


UI components must never contain business logic.

---

# Backend Architecture Rules

Backend modules must follow:

```
controllers/
services/
repositories/
middlewares/
utils/
```

Responsibilities:

Controllers → handle HTTP
Services → business logic
Repositories → database access

---

# API Rules

* Always validate input
* Always return structured responses
* Never expose internal errors
* Use consistent naming conventions

Example:

```
POST /leads
GET /leads
PATCH /leads/:id
```

---

# Commit Philosophy

Commits must be small and descriptive.

Examples:

```
feat(auth): implement login endpoint
fix(leads): correct lead status validation
refactor(api): extract lead service
```

---

# AI Behavior Rules

AI assistants must:

* read project architecture before coding
* respect folder structure
* avoid generating monolithic files
* prioritize maintainability
* explain important architectural decisions

Speed must never override code quality.
