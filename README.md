# 🚀 GRAMVYPAR AI-Driven Hyper-Local Business Advisory Platform

> **Empowering Rural Micro-Entrepreneurs in India with AI-Powered Market Insights, Government Scheme Matching, and Financial Advisory.**

[![Bun](https://img.shields.io/badge/Bun-v1.0%2B-black.svg)](https://bun.sh/)
[![React](https://img.shields.io/badge/React-v19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v8.0-646cff.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-v5.0-000000.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-v6.0-52b0e7.svg)](https://sequelize.org/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI-4285F4.svg)](https://deepmind.google/technologies/gemini/)

---

## 📌 Overview

The **SIH Business Advisory Platform** is a hyper-local, AI-driven advisory system tailored specifically for rural micro-entrepreneurs across India. By analyzing geographic data down to the village level, nearby market competition, available capital, and government policies, the platform generates comprehensive feasibility reports, loan estimates, and strategic recommendations in 18 Indian languages.

---

## ✨ Key Features

- 📍 **Hyper-Local Geographic Intelligence**: Full coverage of all **28 Indian States & 8 Union Territories**, mapped across Districts, Tehsils, Blocks, and Villages.
- 🤖 **AI Feasibility Engine**: Integrated with **Google Gemini AI** to produce personalized SWOT analyses, market saturation indexes, risk evaluations, and execution roadmaps.
- 🏛️ **Government Scheme Matching**: Recommends eligible Central & State government schemes (e.g., PMEGP, MUDRA, DAY-NRLM, PMFME) based on location and business profile.
- 💰 **Financial Modeling & Repayment Engine**: Calculates project cost estimates, margin money requirements, loan eligibility, EMI schedules, and interest breakdowns.
- 🌐 **Multilingual i18n Engine**: Supports **18 Indian languages** (English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, etc.) with local script state displays.
- 📄 **PDF Report Generator**: Generates downloadable, beautifully styled PDF business reports for banking and government loan applications using PDFKit.
- 🔒 **Enterprise-Grade Security**: Built with JWT authentication, BCrypt password hashing, Helmet security headers, rate limiting, and CORS isolation.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7
- **Data Visualization**: Recharts
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, Dark Accents)
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

### **Backend**
- **Runtime & Package Manager**: **Bun** / Node.js + Express 5
- **Database & ORM**: MySQL + Sequelize ORM
- **AI Integration**: `@google/generative-ai` (Gemini API)
- **PDF Generation**: PDFKit
- **Security & Validation**: JWT, BCrypt, Helmet, Express-Validator, Express-Rate-Limit

---

## 📁 Repository Structure

```
sih/
├── backend/
│   ├── seeds/                   # Seed scripts (Locations, Categories, Schemes, Translations, Businesses)
│   │   ├── index.js             # Master seed orchestrator
│   │   ├── locations.js         # 36 States & UTs, Districts, Tehsils, Villages
│   │   ├── schemes.js           # Government schemes seed
│   │   ├── categories.js        # Business categories seed
│   │   └── translations.js     # Multilingual translations seed
│   └── src/
│       ├── ai/                  # Gemini AI prompts and integration client
│       ├── config/              # Database, CORS, environment configs
│       ├── controllers/         # API request handlers
│       ├── financial/           # Financial calculation engine & loan math
│       ├── middleware/          # JWT Auth, Rate limiting middleware
│       ├── models/              # Sequelize ORM schema definitions
│       ├── pdf/                 # PDF report builder
│       ├── routes/              # Express API route endpoints
│       ├── services/            # Core business logic layer
│       ├── utils/               # Geographic math & response utilities
│       └── validators/          # Input validation schemas
└── frontend/
    └── src/
        ├── components/          # Reusable UI & layout components
        ├── context/             # AuthContext & LanguageContext
        ├── i18n/                # Translation client helpers
        ├── layouts/             # AppLayout & AuthLayout wrappers
        ├── pages/               # Dashboard, Analysis, Reports, Schemes, Login, Signup
        ├── services/            # Axios API service calls
        └── utils/               # Frontend formatting utilities
```

---

## 🚀 Getting Started

### Prerequisites

- **Bun**: v1.0.0 or higher (or Node.js v18+)
- **MySQL Database**: v8.0 or higher
- **Gemini API Key**: (Optional for local AI generation, fallbacks provided)

---

### 1️⃣ Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=sih_advisory
   DB_USER=root
   DB_PASS=your_mysql_password

   # JWT Authentication
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d

   # Gemini AI API Key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Seed the database**:
   Run the master seed script using Bun:
   ```bash
   bun run seed
   ```

5. **Start the backend development server**:
   ```bash
   bun run dev
   ```
   *The backend will start at `http://localhost:5000`.*

---

### 2️⃣ Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Start the development server**:
   ```bash
   bun run dev
   ```
   *The frontend application will run at `http://localhost:5173`.*

---

## 🔌 API Endpoints Summary

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/signup` | Register a new user |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & receive JWT |
| **Auth** | `GET` | `/api/auth/me` | Fetch authenticated user profile |
| **Locations** | `GET` | `/api/locations/states` | List all 36 States and UTs |
| **Locations** | `GET` | `/api/locations/districts?stateId=X` | List districts by state |
| **Locations** | `GET` | `/api/locations/tehsils?districtId=X` | List tehsils by district |
| **Locations** | `GET` | `/api/locations/villages` | List villages by filter |
| **Businesses**| `GET` | `/api/businesses/categories` | List business categories |
| **Businesses**| `GET` | `/api/businesses/competitors` | Search nearby competitors |
| **Schemes** | `GET` | `/api/schemes` | Fetch government schemes |
| **Schemes** | `GET` | `/api/schemes/eligible` | Filter schemes by eligibility |
| **Financial** | `POST` | `/api/financial/calculate` | Calculate loan & EMI schedule |
| **Analysis** | `POST` | `/api/analysis/generate` | Generate AI Business Report |
| **Analysis** | `GET` | `/api/reports` | List user generated reports |
| **Analysis** | `GET` | `/api/reports/:id/pdf` | Download business report PDF |
| **i18n** | `GET` | `/api/i18n/languages` | List 18 supported languages |
| **i18n** | `GET` | `/api/i18n/:locale` | Fetch language translations |

---

## 📄 License

This project is developed for the **Smart India Hackathon (SIH)**. All rights reserved.
