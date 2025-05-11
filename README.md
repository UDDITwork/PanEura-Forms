# PanEura Automations - Client Registration System

This repository contains the full-stack application for PanEura Automations' client registration and management system.

## Project Structure

- `client/` — React frontend (registration form, admin dashboard, email confirmation)
- `server/` — Express backend (API, MongoDB, email notifications)

## Features
- Client registration with email confirmation
- Admin dashboard for managing clients
- Email notifications to clients and admin
- Responsive, modern UI
- Production-ready deployment setup (Render + Netlify)

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Setup the Backend (server)
- See `server/README.md` for detailed instructions.
- Configure your environment variables in `server/.env` (see `server/README.md`).
- Install dependencies and start the server:
  ```bash
  cd server
  npm install
  npm run dev
  ```

### 3. Setup the Frontend (client)
- See `client/README.md` for detailed instructions.
- Configure your API URL in `client/.env.production` for production builds.
- Install dependencies and start the development server:
  ```bash
  cd client
  npm install
  npm start
  ```

## Deployment
- **Backend:** Deploy the `server` folder to [Render](https://render.com/) or your preferred Node.js host.
- **Frontend:** Deploy the `client` build folder to [Netlify](https://netlify.com/) or your preferred static host.
- Update your frontend `.env.production` with the deployed backend API URL.

## License
MIT 