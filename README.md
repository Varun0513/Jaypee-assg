# 💰 FinTrack — Personal Finance Tracker

A web-based personal finance tracker where users can record income and expenses, categorize transactions, and monitor spending through an interactive dashboard.

---

## 🚀 Live Demo

> 🌐 **Live App:** [https://jaypee-assg.vercel.app](https://jaypee-assg.vercel.app)

---

## ✨ Features

### 🔐 Authentication
- User registration with name, email, and password
- Secure login with JWT (JSON Web Token) based authentication
- Passwords are hashed using bcrypt before storing
- Session persists across page refreshes using localStorage

### 💳 Transaction Management
- Add income and expense transactions
- Edit or delete any existing transaction
- Transactions are linked to the logged-in user only

### 🏷️ Categories
- 11 predefined categories: Food & Dining, Transport, Shopping, Entertainment, Bills & Utilities, Health, Education, Salary, Freelance, Investment, Other
- Dynamic category list based on transaction type (income vs expense)
- Color-coded badges and emoji icons for each category

### 📊 Dashboard
- Total Balance card (Income − Expenses)
- Total Income card
- Total Expenses card
- **Doughnut chart** — spending breakdown by category
- **Bar chart** — monthly income vs expense comparison

### 🔍 Search & Filters
- Search transactions by description keyword
- Filter by type (income / expense)
- Filter by category
- Filter by date range (from / to)
- Clear all filters with one click

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS (custom design system) |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Charts | Chart.js + react-chartjs-2 |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (cloud) |
| Authentication | JWT + bcrypt |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
finance-tracker/
├── client/                        # React frontend (Vite)
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── SpendingChart.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── App.jsx                # Routes
│   │   └── index.css              # Design system
│   └── index.html
│
└── server/                        # Express backend
    ├── models/
    │   ├── User.js
    │   └── Transaction.js
    ├── routes/
    │   ├── auth.js
    │   └── transactions.js
    ├── middleware/
    │   └── authMiddleware.js
    └── index.js
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/finance-tracker.git
cd finance-tracker
```

### 2. Setup the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/finance-tracker
JWT_SECRET=any_long_random_string_here
PORT=5000
```

Start the server:

```bash
npm run dev
```

The server will run at `http://localhost:5000`

### 3. Setup the Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The app will run at `http://localhost:3000`

---

## 🚢 Deployment

### Backend → Render
1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set Root Directory to `server`
5. Build Command: `npm install`
6. Start Command: `node index.js`
7. Add Environment Variables: `MONGO_URI`, `JWT_SECRET`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo
3. Set Root Directory to `client`
4. Add Environment Variable: `VITE_API_URL=https://your-render-url.onrender.com`
5. Update `vite.config.js` proxy OR set axios baseURL in production

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `PORT` | Server port (default: 5000) |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore`.

---

## 📸 Screenshots

> _Add screenshots of your app here after running locally_

---

## 📝 Additional Features Implemented

- **Dark mode design** with a purple/cyan gradient theme
- **Responsive layout** works on mobile, tablet, and desktop
- **Indian Rupee (₹) formatting** for all amounts
- **Category-based emoji icons** on each transaction card
- **Monthly bar chart** showing income vs expense over time
- **Hover animations** on cards and transaction rows
- **Token persistence** — users stay logged in after page refresh

---

## 👤 Author

Varun — [GitHub](https://github.com/Varun0513)
