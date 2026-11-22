# Backend API

A RESTful Backend API built using Node.js, Express.js, and MongoDB.

## About The Project

This project is a backend application that provides user authentication, authorization, and resource management.

It uses JWT (JSON Web Token) for authentication and Role-Based Access Control (RBAC) to manage user permissions.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js

## Features

- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes
- User Profile Management
- User Role Management
- Resource CRUD Operations
- Error Handling

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/abhishek-jaswant/full-stack-app
```

### 2. Navigate to Backend Folder

```bash
cd backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Important:** Never share or upload your actual environment variables or secret keys to GitHub.

### 5. Start Server

```bash
npm run dev
```

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Routes

| Method | Endpoint        | Description |
|--------|--------         |-------------|
| POST   | `/api/signup`   | Register a new user |
| POST   | `/api/login`    | Login user |

### User Routes

| Method    | Endpoint              | Access             | Description         |
|-----------|-----------------------|--------------------|---------------------|
| GET       | `/api/users`          | Admin              | Get all users       |
| GET       | `/api/users/profile`  | Authenticated User | Get user profile    |
| PUT       | `/api/users/profile`  | Authenticated User | Update user profile |
| PATCH     | `/api/users/:id/role` | Admin              | Update user role    |

### Resource Routes

| Method   | Endpoint                 |Access                |     Description |
|----------|--------------------------|----------------------|-----------------|
| PUT      | `/api/resources/:id`     | Admin, Moderator     | Update resource |
| DELETE   | `/api/resources/:id`     | Admin, Moderator     | Delete resource |

## Authentication & Authorization

This project uses JWT-based authentication to secure API routes.

Role-Based Access Control (RBAC) is implemented with different permissions:

- **Admin:** Can manage users and update user roles.
- **Moderator:** Can update and delete resources.
- **User:** Can access and update their own profile.

Protected routes use authentication and role-based middleware to verify user permissions.

## Middleware

- `authMiddleware` – Verifies JWT tokens and authenticates users.
- `roleMiddleware` – Checks user roles and permissions before allowing access.

## Author

Developed as a Full Stack Backend Project.