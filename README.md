# 🛒 Point of Sale (POS) System

A simple 3-tier web-based Point of Sale (POS) register application designed for retail transactions. Built with a React (Vite) single-page frontend, Node.js/Express API backend, and Supabase PostgreSQL cloud database.

**Live Demo:** [https://pos-system-flax-six.vercel.app/](https://pos-system-flax-six.vercel.app/)

> ⚡ **Note on Initial Load:** The backend is hosted on Render's free tier. If the app has been idle for 15 minutes, the backend goes into sleep mode. Please allow ~30 seconds for the initial server spin-up on your first request.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React (Vite), CSS3, JavaScript (ES6+) — Hosted on **Vercel**
* **Backend:** Node.js, Express.js (REST API) — Hosted on **Render**
* **Database:** PostgreSQL managed via **Supabase** (Session Pooler integration)
* **Version Control & CI/CD:** Git, GitHub (Automated deployments via GitHub integration)

---

## ✨ Key Features & Technical Highlights

* **Real-time Product Catalog:** Load live product items, prices and stock qty inventory from Supabase database.
* **Real-time Stock mgmt:** Automatically updates inventory stock in Supabase upon successful checkout.
* **Interactive Shopping Cart:** Client-side cart state management allowing items to be added, quantities adjusted, and totals calculated instantly.
* **Atomic Checkout System:** Transaction processing that updates stock levels and appends sales receipts directly to Supabase tables. only capture payment data key in, no actual payment gateway involved.
* **Decoupled 3-Tier Architecture:** Clean separation of concerns between client presentation layer, server business logic, and cloud database storage.

---

### 1. Clone the Repository
```bash
git clone [https://github.com/evaleong/pos-system.git](https://github.com/evaleong/pos-system.git)
cd pos-system



## 📁 Project Structure

pos-system/

├── server.js          # Express API server \& Supabase DB connection

├── schema.sql         # SQL script for database tables \& seed data

├── .env               # Environment variables (Database URI, Port)

├── package.json       # Backend dependencies

└── frontend/          # React (Vite) application

&#x20;   ├── src/

&#x20;   │   ├── App.jsx    # POS register interface \& checkout logic

&#x20;   │   └── App.css    # UI styling

&#x20;   └── package.json   # Frontend dependencies


---

## 💻 If Run/setup on localhost/desktop


1.Start the backend server in DOS prompt:
>cd backend 
npm install 
node server.js

2.Start the Vite React dev server in DOS prompt:
> cd frontend
npm install (to install frontend dependencies, first time only)
npm run dev (to start the Vite React dev server)
Open my browser to http://localhost:5173 to access the application.

---
