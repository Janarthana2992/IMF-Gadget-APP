# IMF Gadget API

A secure web application for managing IMF (Impossible Missions Force) gadgets with role-based access control.

![IMF Gadget API](https://img.shields.io/badge/IMF-Gadget%20API-red)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Overview

The IMF Gadget API is a full-stack web application that allows IMF agents and administrators to manage mission gadgets. The system provides a secure authentication system, role-based access control, and a user-friendly interface for tracking gadget status throughout their lifecycle.

## 🚀 Features

### Authentication System
- **User Registration**: Create new agent or admin accounts
- **Secure Login**: JWT-based authentication
- **Role-Based Access**: Different permissions for agents and administrators
- **Session Management**: Automatic token storage and validation

### Gadget Management
- **View Gadgets**: Browse all gadgets with optional status filtering
- **Add Gadgets**: Create new gadgets with unique codenames
- **Edit Gadgets**: Update gadget information
- **Status Tracking**: Monitor gadget lifecycle (Available, Deployed, Decommissioned, Destroyed)
- **Self-Destruct Sequence**: Admin-only feature to permanently destroy gadgets

### Security Features
- **Password Hashing**: Secure storage of user credentials
- **JWT Authentication**: Secure API access
- **Role-Based Permissions**: Different capabilities for agents vs. administrators
- **Protected Routes**: Secure API endpoints

## 🔧 Technical Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5 for responsive UI
- Vanilla JavaScript for DOM manipulation and API calls

### Backend
- Node.js with Express.js
- PostgreSQL database
- Prisma ORM for database operations
- JWT for authentication
- bcrypt for password hashing

## 💻 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and receive a token

### Gadget Management
- `GET /api/gadgets` - Get all gadgets (with optional status filter)
- `GET /api/gadgets/:id` - Get a specific gadget by ID
- `POST /api/gadgets` - Create a new gadget
- `PATCH /api/gadgets/:id` - Update a gadget
- `POST /api/gadgets/:id/self-destruct` - Trigger self-destruct sequence (admin only)

## 🔐 Role-Based Access Control

### Agent Role
- View all gadgets
- Create new gadgets
- Edit basic gadget information
- Cannot change gadget status
- Cannot access self-destruct functionality

### Admin Role
- All agent permissions
- Change gadget status
- Access to self-destruct functionality
- Advanced system management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/imf-gadget-api.git
   cd imf-gadget-api
   ```

2. Install dependencies
   ```
   cd backend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/imf_gadgets"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

4. Set up the database
   ```
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the server
   ```
   npm start
   ```

6. Access the application
   Open your browser and navigate to `http://localhost:3000`

## 📱 Usage

### Registration and Login
1. Navigate to the homepage
2. Use the registration form to create a new account
3. Choose between agent or admin role
4. Login with your credentials

### Managing Gadgets
1. View all gadgets on the main dashboard
2. Use the filter to view gadgets by status
3. Click "Add New Gadget" to create a gadget
4. Click "Edit" on any gadget to modify its details
5. Admins can change gadget status and trigger self-destruct

## 🔒 Security Considerations

- All passwords are hashed before storage
- JWT tokens expire after 24 hours
- Role-based access control prevents unauthorized actions
- Self-destruct functionality requires confirmation code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is for demonstration purposes only. Any resemblance to actual secret agent technology is purely coincidental.

*"This message will self-destruct in five seconds..."* 