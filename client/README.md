# PanEura Client Registration Frontend

This is the React frontend for the PanEura Automations client registration system.

## Features
- Client registration form
- Admin dashboard
- Email confirmation for clients
- Responsive and modern UI

## Getting Started

### Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

### Production Build
1. Create a `.env.production` file in the root of the client directory:
   ```env
   REACT_APP_API_URL=https://paneura-api.onrender.com/api/clients
   ```
   *(Replace with your actual backend URL if different)*
2. Build the app:
   ```bash
   npm run build
   ```
3. Deploy the contents of the `build` folder to Netlify or your preferred static hosting provider.

### Netlify Routing
- The `public/_redirects` file ensures all routes are handled by React Router.

## Environment Variables
- `REACT_APP_API_URL` - The URL of your backend API (set in `.env.production` for production)

## Project Structure
- `src/` - React source code
- `public/` - Static assets and Netlify redirects

## License
MIT
