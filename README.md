# Full Stack User & Resource Management System

A Full Stack Web Application built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## About The Project

This project is a full stack web application that provides secure user authentication, role-based authorization, profile management, user management, and resource management.

The application uses JWT (JSON Web Token) for authentication and Role-Based Access Control (RBAC) to manage permissions for different user roles.

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API

### Backend
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
- Admin User Management
- User Role Management
- Resource Management
- Responsive Dashboard
- Backend API Integration
- Error Handling

## User Roles & Permissions

### Admin
- View all users
- Update user roles
- Manage resources
- Access protected admin routes

### Moderator
- Update resources
- Delete resources

### User
- Register and login
- View profile
- Update profile

## Project Structure

```text
Full-Stack-Project/
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── config.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── users.html
│   └── resources.html
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── README.md
└── .gitignore
```

## Installation & Setup

### 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start Backend Server

```bash
npm run dev
```

### 5. Frontend Setup

Open the frontend folder and configure `config.js` with your backend API URL.

For local development:

```javascript
const API_BASE_URL = "http://localhost:3000/api";
```

Open `index.html` using a local development server.

## API Documentation

Base URL:

```text
http://localhost:3000/api
```

### Authentication Routes

| Method  | Endpoint      | Description   |
|---------|---------------|---------------|
| POST    | `/api/signup` | Register user |
| POST    | `/api/login`  | Login user    |

### User Routes

| Method | Endpoint             | Access                         |
|--------|----------------------|--------------------|
| GET    | `/api/users`         | Admin              |
| GET    | `/api/users/profile` | Authenticated User |
| PUT    | `/api/users/profile` | Authenticated User |
| PATCH  | `/api/users/:id/role`| Admin              |

### Resource Routes

| Method | Endpoint             | Access           |
|--------|----------------------|------------------|
| PUT    | `/api/resources/:id` | Admin, Moderator |
| DELETE | `/api/resources/:id` | Admin, Moderator |

## Security

- JWT-based authentication
- Role-Based Access Control
- Password hashing using bcrypt.js
- Protected backend routes
- Environment variables for sensitive configuration
- Server-side authorization checks

Never upload `.env` files or private credentials to GitHub.

## Environment Configuration

The frontend API URL is configured in `config.js`.

The backend uses environment variables stored in its `.env` file.

Make sure to configure the correct backend URL and production environment variables before deployment.

## Future Improvements

- Add more resource management features
- Improve API documentation
- Add automated testing
- Improve application performance

## Author

Developed as a Full Stack Web Development Project.