# 🛒 Point of Sale (POS) System

**Live Demo: 
# 🛒 Point of Sale (POS) System

**Live Demo:** [https://pos-system-flax-six.vercel.app/](https://pos-system-flax-six.vercel.app/)

> ⚡ **Note on Initial Load:** The backend is hosted on Render's free tier. If the app has been idle for 15 minutes, the backend goes into sleep mode. Please allow ~30 seconds for the initial server spin-up on your first request.

---

A modern 3-tier web-based Point of Sale (POS) register application designed for retail transactions. Built with a React (Vite) single-page frontend, Node.js/Express API backend, and Supabase PostgreSQL cloud database.



---



## 🚀 Features



\* \*\*Dynamic Product Catalog:\*\* Loads live product items, prices, and stock quantities directly from PostgreSQL database.

\* \*\*Interactive Cashier Cart:\*\* Add items, modify quantities, and calculate order totals automatically.

\* \*\*Multi-Payment Support:\*\* Handles cash, QR code / DuitNow, and card payments. no actual payment in process. it's just a selection of payment method only.

\* \*\*Real-Time Stock Management:\*\* Automatically updates inventory stock in Supabase upon successful checkout.

\* \*\*Transactional Integrity:\*\* Uses ACID-compliant PostgreSQL updates to ensure stock levels remain accurate.



---



## 🛠️ Tech Stack



\* \*\*Frontend:\*\* React.js, Vite, JavaScript (ES6+), CSS3

\* \*\*Backend:\*\* Node.js, Express.js, `pg` (PostgreSQL client), `dotenv`

\* \*\*Database:\*\* Supabase (Cloud PostgreSQL) with Session Connection Pooling over IPv4

\* \*\*Version Control:\*\* Git, GitHub



---



## 📁 Project Structure



```text

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



## 💻 Local Setup \& Running Instructions

1. Prerequisites

Node.js (v18+) installed



Supabase account \& PostgreSQL database provisioned



2. Backend Setup

2.1.Clone the repository:

git clone \[https://github.com/YOUR\_USERNAME/pos-system.git](https://github.com/YOUR\_USERNAME/pos-system.git)

cd pos-system



2.2 Install backend dependencies:

npm install



2.3 Create a .env file in the root folder and add my database URL:

PORT=5000

DATABASE\_URL=postgresql://postgres.xxx:YOUR\_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres



2.4. Start the backend server:

node server.js



3\. Frontend Setup

3.1 Open a new terminal and navigate to the frontend directory:

cd frontend



3.2.Install frontend dependencies:

npm install



3.3.Start the Vite React dev server:

npm run dev



3.4 Open my browser to http://localhost:5173 to access the application.





