# Job Tracker Backend

## 📌 Overview

The backend of the Job Tracker application is built with Node.js and Express.js, using PostgreSQL for data persistence. It provides a RESTful API for managing job applications, user authentication, and data storage.

## 🚀 Features
* 🔐 User Authentication: Implemented using Passport.js with email/password authentication and Google OAuth.
* 🔑 Secure Password Handling: Passwords are hashed using bcrypt before storing them in the database.
* 🗄 PostgreSQL Database: Stores user accounts and job applications.
* 📑 CRUD Operations: Users can add, update, delete, and view job applications.
* 🌍 CORS Enabled: Allows frontend communication with the backend.

## 📂 Project Structure
```
📦 job-tracker-backend
├── 📁 config
│   ├── 📄 db.js
│   ├── 📄 passport.js
├── 📁 controllers
│   ├── 📄 authController.js
│   ├── 📄 jobTrackController.js
├── 📁 middlewares
│   ├── 📄 authMiddleware.js
├── 📁 routes
│   ├── 📄 authRoutes.js
│   ├── 📄 jobTrackRoutes.js
├── 📄 index.js
├── 📄 package.json
├── 📄 README.md
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/job-tracker-backend.git
cd job-tracker-backend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Set Up Environment Variables
Create a .env file in the project root and add the following variables:

```ini
DATABASE_URL=your_postgresql_connection_string
PASSWORD=your_postgresql_password_string
PORT=your_postgresql_port_number
HOST=your_postgresql_host_string
USER=your_postgresql_user_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
### 4️⃣ Start the Server
Choose one of the options below:
```bash
npm start
nodemon index.js
```
## 📌 API Endpoints

### 🔐 Authentication

* POST /auth/register - Register a new user

* POST /auth/login - Login a user

* GET /auth/google - Google OAuth authentication

* GET /auth/google/callback - Google OAuth callback

* POST /auth/logout - Logout user

### 📂 Job Management

* GET /jobs - Fetch all jobs for the logged-in user

* GET /jobs/:id - Fetch a specific job by ID

* POST /jobs - Add a new job

* PATCH /jobs/:id - Update a job

* DELETE /jobs/:id - Delete a job

## 🛠 Technologies Used

* Node.js & Express.js - Backend framework

* PostgreSQL - Database

* Passport Authentication - Secure user authentication

* Google OAuth - Third-party authentication

* dotenv - Environment variable management