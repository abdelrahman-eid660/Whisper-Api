# Whisper API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-9.x-brightgreen)
![Redis](https://img.shields.io/badge/Redis-5.x-red)
![License](https://img.shields.io/badge/license-ISC-blue)

A backend API for an anonymous messaging platform.

## 🚀 Quick Test with Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://abdelrahman-eid660-4439622.postman.co/workspace/Abdelrahman-Eid's-Workspace~9ce35d28-4927-40cd-8447-99cca6ad1322/collection/48416887-c67f64bb-f077-4d3b-9ab9-3d1d7236e8fb?action=share&source=copy-link&creator=48416887)


A backend API for an anonymous messaging platform similar to "Whisper" (Confessions page). Users can send and receive anonymous messages with advanced security features.

📋 Features
Authentication & Security
✅ Email and password signup/login

✅ Gmail OAuth2 authentication

✅ Two-factor authentication (2FA)

✅ Sensitive data encryption (phone numbers)

✅ Country-based rate limiting

✅ Brute force protection for OTP attempts

✅ Refresh token system with revocation capability

✅ Password hashing with bcrypt/argon2

User Management
✅ Account creation with profile picture

✅ Password update

✅ Account deletion with Cloudinary cleanup

✅ Profile sharing

✅ Profile picture and cover image upload

Messages
✅ Send anonymous messages with attachments

✅ Receive messages

✅ Delete messages with attachments

✅ List all messages

Additional Features
✅ Redis caching

✅ Email OTP delivery

✅ Cloudinary file upload

✅ Automatic cleanup of unconfirmed accounts (Cron jobs)

✅ Geo-location based request limiting

🛠 Tech Stack
Core
Node.js with Express - Web framework

MongoDB with Mongoose - Database

Redis - Caching and OTP management

JWT - Authentication

Bcrypt / Argon2 - Password hashing

Joi - Data validation

Security
Helmet - Security headers

CORS - Cross-origin resource sharing

Express Rate Limit - Request throttling

GeoIP-lite - Country detection

Crypto - Data encryption

File & Email
Cloudinary - Image upload and storage

Multer - File upload handling

Nodemailer - Email delivery

Google Auth Library - Gmail authentication

Other
Node-cron - Scheduled jobs

Cross-env - Environment variables management

## 📁 Project Structure
src/
├── common/
│   ├── enum/          # Constants (Roles, Token Types, etc.)
│   ├── services/       # Shared services (Redis, Cloudinary)
│   └── utils/          # Helper functions (encryption, hashing, OTP)
├── config/             # Environment configuration
├── DB/
│   ├── models/         # MongoDB models
│   └── database.service.js
├── jobs/               # Scheduled jobs
├── middleware/         # Middleware (Auth, Validation , Error , Limiter)
├── modules/
│   ├── auth/           # Authentication module
│   ├── message/        # Messages module
│   └── user/           # User module
└── upload/             # Local file uploads

🚀 Getting Started
Prerequisites
Node.js 18+

MongoDB

Redis

Cloudinary account

Gmail account for email delivery

Installation
Clone the repository

bash
git clone https://github.com/yourusername/Whisper-api.git
cd Whisper-api
Install dependencies

bash
npm install

Run the application

Development mode:
npm run start:dev

Production mode:
npm run start:prod
## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/whisper/auth/signup` | Create a new user account | ❌ No |
| `PATCH` | `/whisper/auth/confirm-email` | Verify email with OTP code | ❌ No |
| `POST` | `/whisper/auth/login` | Login with email & password | ❌ No |
| `POST` | `/whisper/auth/login/gmail` | Login using Google account | ❌ No |
| `PATCH` | `/whisper/auth/forget-password` | Request password reset OTP | ❌ No |
| `PATCH` | `/whisper/auth/reset-password` | Reset password with OTP | ❌ No |
| `PATCH` | `/whisper/auth/resend-confirm-email` | Resend email verification OTP | ❌ No |
| `PATCH` | `/whisper/auth/resend-confirm-login` | Resend 2FA login OTP | ❌ No |

---

### 👤 User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/whisper/profile` | Get current user profile | ✅ Yes |
| `PATCH` | `/whisper/profile/update-password` | Update account password | ✅ Yes |
| `PATCH` | `/whisper/profile/profile-picture` | Upload/update profile picture | ✅ Yes |
| `PATCH` | `/whisper/profile/profile-cover-picture` | Upload/update cover photo | ✅ Yes |
| `GET` | `/whisper/profile/:id` | View public profile info | ✅ Yes |
| `DELETE` | `/whisper/profile/:id` | Permanently delete account | ✅ Yes |
| `POST` | `/whisper/profile/logout` | Logout from device(s) | ✅ Yes |
| `GET` | `/whisper/profile/rotate` | Refresh access token | ✅ Yes |
| `PATCH` | `/whisper/profile/enable-2Step-verification` | Enable two-factor authentication | ✅ Yes |
| `PATCH` | `/whisper/profile/confirm-2Step-verification` | Verify 2FA setup | ✅ Yes |

---

### 💬 Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/whisper/message/:receiverId` | Send message (anonymous or authenticated) | ⚠️ Optional |
| `GET` | `/whisper/message/list` | Get all received & sent messages | ✅ Yes |
| `GET` | `/whisper/message/:messageId` | Get specific message details | ✅ Yes |
| `DELETE` | `/whisper/message/:messageId` | Delete a message | ✅ Yes |

---

### 📋 Request Examples

#### Sign Up
```http
POST /whisper/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd",
  "confirmPassword": "StrongP@ssw0rd",
  "userName": "John Doe",
  "phone": "01234567890"
}

🔒 Security Features
1. Two-Factor Authentication: Users can enable OTP for login

2. Dynamic Rate Limiting:

a- Egypt: 5 requests per 2 minutes

b- Other countries: 3 requests per 2 minutes

3. OTP Protection: Max 3 attempts within 5 minutes

4. Data Encryption: Phone numbers encrypted in database

5. Token Revocation: Blacklisted JWT IDs stored in database

6. Route Protection: Role-based access control

🧪 Available Scripts
npm run start:dev - Start development server with hot reload

npm run start:prod - Start production server

📦 Dependencies
json
{
  "name": "assignment",
  "version": "1.0.0",
  "dependencies": {
    "argon2": "^0.44.0",
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.9.0",
    "cors": "^2.8.6",
    "cross-env": "^10.1.0",
    "crypto": "^1.0.1",
    "dotenv": "^17.2.4",
    "express": "^5.2.1",
    "express-rate-limit": "^8.3.1",
    "geoip-lite": "^1.4.10",
    "google-auth-library": "^10.5.0",
    "helmet": "^8.1.0",
    "joi": "^18.0.2",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.1.6",
    "multer": "^2.0.2",
    "node-cron": "^4.2.1",
    "nodemailer": "^8.0.1",
    "redis": "^5.11.0"
  }
}

🤝 Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository

2. Create a feature branch (git checkout -b feature/AmazingFeature)

3. Commit your changes (git commit -m 'Add some AmazingFeature')

4. Push to the branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

📄 License
This project is licensed under the ISC License.

📧 Contact
For questions or support, please open an issue in the repository.

Note: This project is for educational purposes. Review security settings before production use.
