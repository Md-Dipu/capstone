# Capstone: Full Stack E-Commerce Application

> A modern, full stack e-commerce platform built with React, Express, and MongoDB.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Capstone is a full stack e-commerce web application designed to demonstrate modern web development best practices. It features a robust backend API, secure authentication, and a responsive frontend for seamless user experience.

## Features

- User authentication (signup, login, protected routes)
- Product catalog and details
- Shopping cart and order management
- Checkout with payment integration (Stripe)
- Order history and dashboard for users
- Admin dashboard for product and order management
- Responsive design with Tailwind CSS

## Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Stripe API

**Other:**

- ESLint for code linting
- RESTful API architecture

## Folder Structure

```
├── capstone-backend/         # Express backend API
│   ├── config/               # Environment configs
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Auth and other middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   └── index.js              # Entry point
│
├── capstone-frontend/        # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service modules
│   │   ├── store/            # State management
│   │   ├── styles/           # CSS
│   │   └── main.jsx          # Entry point
│   └── index.html
│
├── doc/                      # Documentation and images
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [NPM](https://www.npmjs.com/get-npm)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation

1. **Fork and Clone the Repository**
   - Fork this repo to your GitHub account.
   - Clone it to your local machine:
     ```sh
     git clone https://github.com/<your-username>/<repo-name>.git
     ```
2. **Backend Setup**
   - Navigate to the backend folder:
     ```sh
     cd capstone-backend
     npm install
     ```
   - Configure environment variables as described in [capstone-backend/README.md](capstone-backend/README.md).
3. **Frontend Setup**
   - Navigate to the frontend folder:
     ```sh
     cd ../capstone-frontend
     npm install
     ```

## Usage

### Running the Application

1. **Start the Backend**
   ```sh
   cd capstone-backend
   npm start
   ```
2. **Start the Frontend**
   ```sh
   cd ../capstone-frontend
   npm run dev
   ```
3. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal) to view the app.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
