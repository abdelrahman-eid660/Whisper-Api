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

📁 Project Structure
text
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
├── middleware/         # Middleware (Auth, Validation)
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
Set up environment variables

bash
cp .env.example .env
Edit .env file

env
# Server
PORT=3000
NODE_ENV=development
ORIGIN=http://localhost:3000

# Database
URI=mongodb://localhost:27017/Whisper
REDIS_URI=redis://localhost:6379

# JWT
SYSTEM_TOKEN_SECRET_KEY=your_system_access_secret
SYSTEM_REFREASH_TOKEN_SECRET_KEY=your_system_refresh_secret
USER_TOKEN_SECRET_KEY=your_user_access_secret
USER_REFREASH_TOKEN_SECRET_KEY=your_user_refresh_secret
ACCESS_EXPIRS_IN=15m
REFREASH_EXPIRS_IN=7d

# Encryption
ENCRYPTION_SECRET_KEY=your_32_char_encryption_key
SALT_ROUND=12

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret

# Email
EMAIL_APP=your_email@gmail.com
PASSWORD_APP=your_app_password
APPLICATION_NAME=Whisper

# Google
WEB_CLIENT_ID=your_google_client_id
Run the application

Development mode:
npm run start:dev

Production mode:
npm run start:prod

📚 API Documentation

Authentication
Method	Endpoint	Description
POST	/Whisper/auth/signup	Create new account
PATCH	/Whisper/auth/confirm-email	Confirm email address
POST	/Whisper/auth/login	Login with credentials
POST	/Whisper/auth/login/gmail	Login with Gmail
PATCH	/Whisper/auth/forget-password	Request password reset
PATCH	/Whisper/auth/reset-password	Reset password

Users
Method	Endpoint	Description
GET	/Whisper/profile	View profile
PATCH	/Whisper/profile/update-password	Update password
PATCH	/Whisper/profile/profile-picture	Upload profile picture
GET	/Whisper/profile/:id	Share profile
DELETE	/Whisper/profile/:id	Delete account

Messages
Method	Endpoint	Description
POST	/Whisper/message/:receiverId	Send message
GET	/Whisper/message/list	List all messages
GET	/Whisper/message/:messageId	View specific message
DELETE	/Whisper/message/:messageId	Delete message

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