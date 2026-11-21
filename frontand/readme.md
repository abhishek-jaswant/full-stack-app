# Frontend

A responsive frontend application built using HTML, CSS, and JavaScript.

## About The Project

This frontend application provides a user-friendly interface for interacting with the backend REST API.

It includes user authentication, dashboard management, profile management, user management, and resource management.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- REST API
- Fetch API / Axios (as applicable)

## Features

- User Registration
- User Login
- JWT Authentication
- Dashboard
- User Profile Management
- User Management
- Resource Management
- Responsive UI
- Backend API Integration
- Error Handling

## Project Structure

```text
frontend/
│
├── css/
│   ├── auth.css
│   ├── dashboard.css
│   ├── profile.css
│   ├── resources.css
│   ├── style.css
│   └── users.css
│
├── js/
│   ├── common.js
│   ├── dashboard.js
│   ├── login.js
│   ├── profile.js
│   ├── register.js
│   ├── resources.js
│   └── users.js
│
├── .env
├── config.js
│
├── dashboard.html
├── index.html
├── login.html
├── profile.html
├── register.html
├── resources.html
├── users.html
│
└── README.md
```

## Environment Variables

Create a `.env` file in the frontend root directory.

```env
API_BASE_URL=http://localhost:3000/api
```

## API Configuration

The API base URL is managed centrally through `config.js`.


The configuration is imported into `common.js` to manage API communication.

## Installation & Setup

1. Clone the repository.
2. Open the frontend folder.
3. Configure the `.env` file.
4. Run the project using the appropriate development server.

## Author

Developed as part of a Full Stack Web Development Project.