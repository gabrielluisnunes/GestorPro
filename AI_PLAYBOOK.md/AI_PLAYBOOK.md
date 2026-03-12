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

This document defines the architecture rules for the frontend codebase.

The goal is to keep the frontend scalable, modular, and maintainable as the application grows.

All features must follow **feature-based architecture** and strict separation of responsibilities.

---

# Core Principles

Frontend code must follow these principles:

* feature-based organization
* small and reusable components
* separation of UI, logic, and API
* modular structure
* predictable data flow

Avoid monolithic files containing UI, logic, API calls, and state together.

---

# Feature-Based Architecture

All business features must be grouped inside a **features** directory.

Example:

```text
src
├── features
│   ├── transactions
│   ├── auth
│   ├── dashboard
│   └── users
```

Each feature represents a domain of the application.

---

# Feature Folder Structure

Each feature must follow this structure:

```text
features
└── transactions
    ├── components
    │   ├── transaction-card.tsx
    │   ├── transaction-button.tsx
    │   └── transaction-list.tsx
    │
    ├── hooks
    │   ├── use-transactions.ts
    │   ├── use-create-transaction.ts
    │   ├── use-update-transaction.ts
    │   └── use-delete-transaction.ts
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

# Responsibility Separation

Each layer must have a clear responsibility.

transaction-page
Responsible only for assembling the screen.

components
Reusable UI components.

hooks
State management and feature logic.

services
API communication.

types
Data contracts and interfaces.

---

# Data Flow Architecture

Frontend must follow this data flow:

```text
Component → Hook → Service → API
```

Example:

```text
TransactionPage
  → useTransactions()
     → transactionsService.getTransactions()
        → Backend API
```

Components must never call APIs directly.

---

# Hook Rule (Important)

Each **data operation should have its own hook**.

Example:

```text
useTransactions
useCreateTransaction
useUpdateTransaction
useDeleteTransaction
```

Hooks encapsulate the logic for interacting with backend endpoints.

Rule:

> **1 important data operation = 1 hook**

This makes logic reusable and keeps components clean.

---

# Services Layer

Services are responsible for API communication.

Location:

```text
features/{feature}/services
```

Example:

```text
transactions-api.ts
```

Example implementation:

```ts
export async function getTransactions() {
  return fetch("/api/transactions").then(res => res.json())
}
```

Services must not contain UI logic.

---

# Hooks Layer

Hooks contain feature logic and state management.

Example:

```ts
export function useTransactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  return { transactions }
}
```

Hooks may call services but must never contain UI.

---

# Component Rules

Components must follow the **single responsibility principle**.

Bad example:

```text
TransactionPage.tsx
 ├ UI
 ├ API calls
 ├ state logic
 ├ validation
 └ layout
```

Correct example:

```text
TransactionPage
 ├ TransactionList
 ├ TransactionCard
 ├ TransactionButton
 └ useTransactions hook
```

---

# Shared UI Components

Reusable UI components must live in:

```text
src/components/ui
```

Examples:

```text
Button
Input
Modal
Dropdown
Table
```

These components must remain purely visual.

---

# Layout Components

Layout components must live in:

```text
src/components/layout
```

Examples:

```text
Navbar
Sidebar
DashboardLayout
PageLayout
```

---

# File Size Rule

Files larger than ~200 lines must be refactored.

Split them into:

* smaller components
* hooks
* services
* utilities

---

# Example Folder Tree

```text
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

# Implementation Rule

When implementing a new feature:

1. create the feature folder
2. define types
3. create API services
4. create hooks for operations
5. create UI components
6. assemble the page

Never start coding directly inside a large page file.

Always respect the architecture.


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
