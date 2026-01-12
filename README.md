# 🎬 Movie App

A full-stack movie management and viewing application built with **React**, **Tailwind CSS**, **Express.js**, **MongoDB**, **Redis**, **BullMQ**, **Puppeteer**, and **JWT**.

---

## ✨ Features

### 🔐 Authentication
- Role-based login system using **JWT**
  - User accounts (view-only)
  - Admin accounts (optional for future management)

### 🎥 Movie Management
- View list of top movies 
- Movie details page including:
  - Duration 
  - Rating
  - Release date
  - Cover image
- Add, update, or delete movies (via backend/admin panel)
- movie data scraping using **Puppeteer** (IMDb or other sources)

### 🛠 Other Features
- RESTful API built with **Express.js** and **MongoDB**
- Background job processing with **BullMQ** and **Redis**
- State management using **Zustand**
- HTTP requests handled via **Axios**
- Responsive UI styled with **Tailwind CSS** and **MUI components**
- Toast notifications with **React Toastify**


## 🚀 How to Run

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Saurabh-singhx/movie_app.git
cd movie_app


# Go to backend folder
cd server

# Install backend dependencies
npm install

# Create a .env file (check .env.example for reference)

# Run backend server
npm run dev

# Go back to project root
cd ..

# Go to frontend folder
cd client

# Install frontend dependencies
npm install

# Create a .env file (check .env.example for reference)
# Example:
# VITE_API_URL=http://localhost:8002

# Run frontend
npm run dev


# Go back to project root
cd ..


# Go to worker folder
cd movie_distributed_queue


# Install backend dependencies

npm run dev

##📝 Test Login Credentials

You can use these accounts to quickly test the app:

| Role  | Email                         | Password |
|-------|-------------------------------|----------|
| Admin | saurabh4@gmail.com            | Pas12@   |
| Agent | saurabh4442kumar@gmail.com    | Pass12@  |

```

---

## 🛠️ Tech Stack

### Tech Stack:
- **React** - Component-based UI library. [React Docs](https://reactjs.org/)
- **Tailwind CSS** - Utility-first CSS framework for styling. [Tailwind Docs](https://tailwindcss.com/)
- **Axios** - Promise-based HTTP client for API calls. [Axios Docs](https://axios-http.com/)
- **Zustand** - Lightweight state management library. [Zustand Docs](https://zustand-demo.pmnd.rs/)
- **MUI (Material UI)** - React UI components library for fast styling. [MUI Docs](https://mui.com/)
- **React Router DOM** - For frontend routing. [React Router Docs](https://reactrouter.com/)
- **React Toastify** - For toast notifications. [React Toastify Docs](https://fkhadra.github.io/react-toastify/)


### Tech Stack:
- **Express.js** - Fast and minimal Node.js web framework. [Express Docs](https://expressjs.com/)
- **MongoDB** - NoSQL database for storing data. [MongoDB Docs](https://www.mongodb.com/)
- **Mongoose** - ODM for MongoDB, provides schema and model support. [Mongoose Docs](https://mongoosejs.com/)
- **JWT (jsonwebtoken)** - For authentication and authorization. [JWT Docs](https://www.npmjs.com/package/jsonwebtoken)
- **bcrypt** - For hashing passwords securely. [bcrypt Docs](https://www.npmjs.com/package/bcrypt)
- **BullMQ & ioredis** - For job queues and background processing. [BullMQ Docs](https://docs.bullmq.io/)
- **Puppeteer** - For web scraping or browser automation. [Puppeteer Docs](https://pptr.dev/)
- **Express-validator** - For validating incoming requests. [Docs](https://express-validator.github.io/docs/)
- **Cookie-parser** - To parse cookies in requests. [Docs](https://www.npmjs.com/package/cookie-parser)
- **CORS** - To enable cross-origin requests. [CORS Docs](https://www.npmjs.com/package/cors)
- **dotenv** - For environment variable management. [dotenv Docs](https://www.npmjs.com/package/dotenv)

# Worker Service

This is the background worker for the project, responsible for processing jobs using **BullMQ** and **Redis**.  

### Tech Stack:
- **Node.js** - Runtime environment for running JavaScript on the server. [Node Docs](https://nodejs.org/)
- **BullMQ** - Job queue library for Node.js using Redis. [BullMQ Docs](https://docs.bullmq.io/)
- **ioredis** - Redis client for Node.js, used by BullMQ. [ioredis Docs](https://github.com/luin/ioredis)
- **Mongoose** - MongoDB ODM for managing database operations. [Mongoose Docs](https://mongoosejs.com/)
- **dotenv** - For managing environment variables. [dotenv Docs](https://www.npmjs.com/package/dotenv)
