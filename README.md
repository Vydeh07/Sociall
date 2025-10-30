# Sociall — LinkedIn Clone

A simple LinkedIn-like social media web app built with the MERN stack. Users can sign up, log in, create posts, and view posts from all users on a public feed.


## 🧠 Tech Stack

- Frontend: React, React Router, Axios, Tailwind CSS (or your CSS layer)
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Auth: JWT + bcrypt

## ✨ Features

- User signup and login (JWT-based authentication)
- Create posts (text)
- View posts from all users (global feed)
- Logout

## Project structure

Top-level layout:

- backend/
  - package.json
  - server.js
  - config/
    - db.js
  - middleware/
    - authMiddleware.js
  - models/
    - User.js
    - Post.js
  - routes/
    - authRoutes.js
    - postRoutes.js

- client/
  - package.json
  - vite.config.js
  - src/
    - App.jsx
    - main.jsx
    - index.css
    - components/
      - Header.jsx
      - Post.jsx
      - CreatePost.jsx
      - Comment.jsx
      - ProfileCard.jsx
    - context/
      - AuthContext.jsx
    - pages/
      - Home.jsx
      - Login.jsx
      - Signup.jsx
      - Profile.jsx
    - utils/
      - axios.js

## Run frontend
cd frontend
npm install
npm run dev

## Run Backend
cd ../backend
npm install
npm run dev





