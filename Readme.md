# Whisper API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-9.x-brightgreen)
![Redis](https://img.shields.io/badge/Redis-5.x-red)
![License](https://img.shields.io/badge/license-ISC-blue)

A production-ready backend API for an anonymous messaging platform similar to "Whisper" (Confessions page). Users can send and receive anonymous messages with enterprise-grade security features.

## 🚀 Quick Test with Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/48416887/2sBXiojUHx)

**Interactive API Documentation:**  
[https://documenter.getpostman.com/view/48416887/2sBXiojUHx](https://documenter.getpostman.com/view/48416887/2sBXiojUHx)

---

## 📋 Features

### 🔐 Authentication & Security
- ✅ Email/password signup/login with bcrypt/argon2 hashing
- ✅ Gmail OAuth2 authentication
- ✅ Two-factor authentication (2FA) with OTP
- ✅ AES-256-CBC encryption for sensitive data (phone numbers)
- ✅ Country-based dynamic rate limiting (Egypt: 5 req/2min, Others: 3 req/2min)
- ✅ Brute force protection for OTP attempts
- ✅ Refresh token system with Redis-based revocation
- ✅ JWT tokens with audience and JWT ID claims

### 👤 User Management
- ✅ Account creation with profile picture upload
- ✅ Password update with history check
- ✅ Complete account deletion with Cloudinary cleanup
- ✅ Profile sharing with view tracking
- ✅ Profile picture and cover image upload
- ✅ Role-based access control (User/Admin)

### 💬 Messages
- ✅ Send anonymous or authenticated messages
- ✅ Message attachments (images, videos, audio, PDF)
- ✅ Receive and manage messages
- ✅ Delete messages with attachment cleanup

### ⚡ Additional Features
- ✅ Redis caching for OTP and session management
- ✅ Email OTP delivery with HTML templates
- ✅ Cloudinary integration for file storage
- ✅ Cron jobs for automatic unconfirmed account cleanup
- ✅ Geo-location based request limiting
- ✅ Profile view tracking with Redis
- ✅ Repository pattern for database operations

---

## 🛠 Tech Stack

### Core
| Technology | Purpose |
|------------|---------|
| Node.js + Express 5.x | Web framework |
| MongoDB + Mongoose 9.x | Database with ODM |
| Redis 5.x | Caching & OTP management |
| JWT | Authentication |
| bcrypt / argon2 | Password hashing |
| Joi | Data validation |

### Security
| Technology | Purpose |
|------------|---------|
| Helmet | Security headers |
| CORS | Cross-origin resource sharing |
| express-rate-limit | Request throttling |
| geoip-lite | Country detection |
| crypto (AES-256-CBC) | Data encryption |

### File & Email
| Technology | Purpose |
|------------|---------|
| Cloudinary | Image upload and storage |
| Multer | File upload handling |
| Nodemailer | Email delivery |
| Google Auth Library | Gmail OAuth2 |

---

## 📁 Project Structure
whisper-api/
│
└── src/
│
├── common/
│ ├── enum/ # Constants (Roles, Token Types, OTP actions)
│ │ ├── user.enum.js
│ │ ├── security.enum.js
│ │ └── OTP.enum.js
│ │
│ ├── services/ # Shared services
│ │ ├── redis.service.js
│ │ ├── cloudinary.service.js
│ │ └── email.service.js
│ │
│ └── utils/ # Helper functions
│ ├── security/ # encryption, hashing, JWT
│ ├── response/ # error & success responses
│ ├── OTP/ # OTP generation & validation
│ ├── email/ # email templates & sending
│ ├── multer/ # file upload configuration
│ └── validation.js # Joi validation
│
├── config/ # Environment configuration
│ └── config.service.js
│
├── DB/
│ ├── models/ # MongoDB models
│ │ ├── user.model.js
│ │ ├── message.model.js
│ │ └── token.model.js
│ ├── database.service.js # Repository pattern CRUD
│ └── index.js # Database connection
│
├── jobs/ # Scheduled jobs
│ └── deleteUnconfirmedUsers.js
│
├── middleware/ # Middleware
│ ├── auth.middleware.js
│ ├── authorization.middleware.js
│ ├── validation.middleware.js
│ └── error.middleware.js
│
├── modules/
│ ├── auth/ # Authentication module
│ │ ├── auth.controller.js
│ │ ├── auth.service.js
│ │ ├── auth.validation.js
│ │ └── index.js
│ │
│ ├── user/ # User management module
│ │ ├── user.controller.js
│ │ ├── user.service.js
│ │ ├── user.validation.js
│ │ ├── user.auth.js
│ │ └── index.js
│ │
│ └── message/ # Messages module
│ ├── message.controller.js
│ ├── message.service.js
│ ├── message.validation.js
│ ├── message.auth.js
│ └── index.js
│
└── upload/ # Local temporary file storage

---

## 🏗️ Architecture Pattern (Repository Pattern)

This project implements the **Repository Pattern** for database operations:
┌─────────────┐
│ Client │
└──────┬──────┘
│ HTTP Request
▼
┌─────────────┐
│ Middleware │ ← Auth, Rate Limit, Validation, Helmet, CORS
└──────┬──────┘
│
▼
┌─────────────┐
│ Controller │ ← Request handling, Response formatting
└──────┬──────┘
│
▼
┌─────────────┐
│ Service │ ← Business logic, External services
└──────┬──────┘
│
▼
┌─────────────┐
│ Repository │ ← database.service.js (CRUD wrappers)
└──────┬──────┘
│
▼
┌─────────────┐
│ MongoDB │ ← Database
└─────────────┘


### Repository Methods Available

| Method | Description |
|--------|-------------|
| `findOne()` | Find single document with populate support |
| `find()` | Find multiple documents with pagination |
| `paginate()` | Paginated results with count |
| `create()` | Create new document |
| `createOne()` | Create single document |
| `updateOne()` | Update document with version increment |
| `deleteOne()` | Delete single document |
| `deleteMany()` | Delete multiple documents |
| `findOneAndUpdate()` | Find, update, and return document |

**Benefits:**
- ✅ Separation of database logic from business logic
- ✅ Consistent CRUD operations across all models
- ✅ Easy to switch databases or add caching layers
- ✅ Centralized error handling
- ✅ Reusable query methods

---

## 🔒 Security Features Explained

### 1. Two-Factor Authentication (2FA)
- Users can enable OTP verification for login
- OTP codes stored in Redis with 2-minute expiry
- Max 3 attempts within 5 minutes
- Automatic blocking after exceeded attempts

### 2. Dynamic Rate Limiting
- **Egypt IPs:** 5 requests per 2 minutes
- **Other countries:** 3 requests per 2 minutes
- Based on GeoIP-lite database
- Different limits for different endpoints

### 3. OTP Protection
- OTP codes: 6-digit, 2-minute validity
- Request cooldown: 5 minutes after 3 attempts
- Block keys stored in Redis
- Separate OTP types: User, Login, forgetPassword, resetPassword, TwoStepVerification

### 4. Data Encryption (AES-256-CBC)
```javascript
// Phone numbers encrypted with:
const encrypted = await encrypt(phone);
const decrypted = await decrypt(encrypted);

- Encryption key from environment variables (32 chars)
- Random IV for each encryption
- Format: iv:encryptedData

5. Token Security
Token Type	Expiry	Purpose
Access Token	15 minutes	API authentication
Refresh Token	7 days	Get new access token
JWT IDs for unique token identification

Audience claims for token type validation

Revoked tokens stored in Redis

Token revocation on password change

6. Password Security
bcrypt/argon2 hashing (configurable)

Salt rounds: 12

Password history check on reset

Change credentials timestamp for session invalidation

🚀 Getting Started
Prerequisites
Node.js 18+

MongoDB (local or Atlas)

Redis (local or cloud)

Cloudinary account

Gmail account with App Password

Installation

1- Clone the repository

git clone https://github.com/abdelrahman-eid660/Whisper-Api.git
cd whisper-api

2- Install dependencies

npm install

3- Set up environment variables

cp .env.example .env

4- Configure your .env file (see template below)

5- Run the application

Development mode (with hot reload):
npm run start:dev

Production mode:
npm run start:prod

📄 Environment Variables Template
Create a .env.example file:

--env
# Server
PORT=3000
NODE_ENV=development
ORIGIN=http://localhost:3000|https://yourdomain.com

# Database
URI=mongodb://localhost:27017/whisper
REDIS_URI=redis://localhost:6379

# JWT Secrets (generate with: openssl rand -base64 32)
USER_TOKEN_SECRET_KEY=your_user_access_secret
USER_REFREASH_TOKEN_SECRET_KEY=your_user_refresh_secret
SYSTEM_TOKEN_SECRET_KEY=your_system_access_secret
SYSTEM_REFREASH_TOKEN_SECRET_KEY=your_system_refresh_secret
ACCESS_EXPIRS_IN=seconds
REFREASH_EXPIRS_IN=seconds

# Encryption (32 characters exactly: openssl rand -hex 16)
ENCRYPTION_SECRET_KEY=your_32_char_encryption_key_here
SALT_ROUND=number

# Email
EMAIL_APP=your_email@gmail.com
PASSWORD_APP=your_gmail_app_password
APPLICATION_NAME=Whisper

# Google OAuth
WEB_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Social Links
FACEBOOK_LINK=https://facebook.com/whisper
INSTAGRAM_LINK=https://instagram.com/whisper
TWITER_LINK=https://twitter.com/whisper

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
⚠️ Important: Never commit your .env file to version control. Use .env.example as a template.

📚 API Documentation
🔐 Authentication Endpoints
Method	Endpoint	Description	Auth
POST	/whisper/auth/signup	Create new account	❌
PATCH	/whisper/auth/confirm-email	Verify email with OTP	❌
POST	/whisper/auth/login	Login with credentials	❌
POST	/whisper/auth/login/gmail	Google OAuth login	❌
PATCH	/whisper/auth/forget-password	Request password reset	❌
PATCH	/whisper/auth/reset-password	Reset password with OTP	❌
PATCH	/whisper/auth/resend-confirm-email	Resend verification OTP	❌
PATCH	/whisper/auth/resend-confirm-login	Resend 2FA OTP	❌
👤 User Management Endpoints
Method	Endpoint	Description	Auth
GET	/whisper/profile	Get current user profile	✅
PATCH	/whisper/profile/update-password	Update password	✅
PATCH	/whisper/profile/profile-picture	Upload profile picture	✅
PATCH	/whisper/profile/profile-cover-picture	Upload cover photo	✅
GET	/whisper/profile/:id	View public profile	✅
DELETE	/whisper/profile/:id	Delete account	✅
POST	/whisper/profile/logout	Logout from device(s)	✅
GET	/whisper/profile/rotate	Refresh access token	✅
PATCH	/whisper/profile/enable-2Step-verification	Enable 2FA	✅
PATCH	/whisper/profile/confirm-2Step-verification	Verify 2FA	✅
💬 Message Endpoints
Method	Endpoint	Description	Auth
POST	/whisper/message/:receiverId	Send message (with optional attachments)	⚠️
GET	/whisper/message/list	Get all messages	✅
GET	/whisper/message/:messageId	Get specific message	✅
DELETE	/whisper/message/:messageId	Delete message	✅

📋 Request Examples

Sign Up
http
POST /whisper/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd",
  "confirmPassword": "StrongP@ssw0rd",
  "userName": "John Doe",
  "phone": "01234567890"
}

Login
http
POST /whisper/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd"
}

Send Message with Attachment
http
POST /whisper/message/65f2a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

attachments: [file1.jpg, file2.png]
content: "Check out these photos!"
Update Password
http
PATCH /whisper/profile/update-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldPassword": "OldP@ssw0rd",
  "newPassword": "NewP@ssw0rd",
  "confirmPassword": "NewP@ssw0rd"
}

Enable 2FA
http
PATCH /whisper/profile/enable-2Step-verification
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "isTwoFactorEnabled": true
}

Confirm 2FA
http
PATCH /whisper/profile/confirm-2Step-verification
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}

📊 Response Structure
Success Response
json
{
  "status": 200,
  "message": "Done",
  "data": {
    // Response data here
  }
}

Error Response
json
{
  "status": 400,
  "errorMessage": "Validation error",
  "extra": {
    "errors": [
      {
        "key": "body",
        "details": [
          {
            "message": "Password must be at least 8 characters",
            "path": ["password"]
          }
        ]
      }
    ]
  }
}

--Status Codes

Status	Description
200	Success
201	Created
400	Bad Request
401	Unauthorized
403	Forbidden
404	Not Found
409	Conflict
429	Too Many Requests
500	Internal Server Error

🧪 Available Scripts
Script	Description
npm run start:dev	Start development server with --watch mode
npm run start:prod	Start production server
📦 Dependencies
json
{
  "name": "whisper-api",
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

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the ISC License.

📧 Contact
For questions or support, please open an issue in the repository.

Note: This project is for educational purposes. Review security settings before production use.