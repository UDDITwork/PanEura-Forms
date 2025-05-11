# PanEura Client Registration API

Backend API for PanEura Automations client registration system.

## Features
- Client registration API
- Email notifications
- Admin dashboard backend

## Environment Variables
- PORT - Server port (default: 5001)
- MONGO_URI - MongoDB connection string
- EMAIL_USER - Email address for sending notifications
- EMAIL_PASS - Email app password
- ADMIN_EMAIL - Email address to receive admin notifications
- JWT_SECRET - Secret for JWT authentication

## Scripts
- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (development)

## Health Check
- GET `/api/test` - Returns a JSON message if the API is running 