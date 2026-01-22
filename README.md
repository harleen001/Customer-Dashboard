# Customer Payment Dashboard
A high-performance, pixel-perfect React dashboard built as part of a Frontend Developer Technical Assessment. This application manages customer payment data with full CRUD capabilities, persistent mock storage, and a refined UI.

## 🚀 Tech Stack
**Framework:** React 18 (Vite)
**Language:** TypeScript
**State Management (UI):** Zustand (Selection logic, Modal states)
**State Management (Server):** TanStack Query v5 (Data fetching, caching, and mutations)
**Styling:** Tailwind CSS + ShadCn UI
**Form Handling:** React Hook Form + Zod (Validation)
**Icons:** Lucide React

## Architectural Choices
**1. State Separation**
I implemented a dual-state architecture to ensure high performance and maintainability
**TanStack Query:** Handles all "Server-side" logic. It manages the lifecycle of customer data, including loading states, caching, and automatic re-fetching after mutations (Add/Update/Delete).
**Zustand:** Manages "Client-side" UI state. Specifically, it tracks row selections and search queries, allowing for a decoupled and lightweight way to communicate between the Header, Table, and Modal components.

## 2. Mock API & Persistence
To simulate a real-world environment, I created an asynchronous API wrapper in src/lib/api.ts.
Uses localStorage to persist data across page refreshes.
Implements artificial delays to demonstrate TanStack Query's loading/skeleton states.
Maps raw data to the required TypeScript Customer interface.

## 3. Pixel-Perfect UI
Custom Design System: Extended tailwind.config.ts with custom HSL variables to match Figma's specific status colors (Open/Paid/Due/Inactive).
ShadCn Customization: Modified the standard ShadCn Checkbox and Table components to achieve the specific square-edge design and blue brand indicators requested.

## 📦 Installation & Setup
Clone the repository: ```git clone https://github.com/your-username/customer-dashboard.git```
```cd customer-dashboard```
Install dependencies:```npm install```
Run the development server:```npm run dev```
Build for production:```npm run build```

## Features implemented
1. ✅ **Dynamic Table:** Responsive layout with conditional status badges.
2. ✅ **Smart Selection:** Contextual buttons that swap between "Add Customer" and "Update Customer" based on row selection.
3. ✅ **Bulk Actions:** Ability to select multiple rows and perform bulk deletions.
4. ✅ **Form Validation:** Robust validation using Zod to prevent incorrect data entry.
5. ✅ **Search & Filtering:** Real-time client-side filtering via the search bar.
6. ✅ **Loading States:** Integrated Skeletons for a smooth user experience during data fetching.