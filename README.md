# WireGuard Admin Panel (React JS + Vite)

Simple React admin interface for the WireGuard backend.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint** in `.env` (copy `.env.example`):
   ```bash
   VITE_API_BASE=https://appleapi.playmetod.store
   # for local development set to http://localhost:3000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5174`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Output is in `dist/`.

5. **Build steps reminder:**
   ```bash
   npm install && npm run build
   ```

## Authentication Flow

- The login page posts credentials to `/api/admin/login`.
- A 200 response with `{ token: "<jwt>" }` stores the token in `localStorage` under
  the key `wg_admin_token` and navigates to `/dashboard`.
- All other requests automatically include `Authorization: Bearer <token>`.
- A `ProtectedRoute` component (`Private` in `App.jsx`) guards all admin routes;
  users without a token are redirected to `/login`.
- Token is read from localStorage on app load so it persists across refreshes.
- If any API call returns 401 Unauthorized, the token is cleared and the user
  is auto-logged out and taken to `/login`.
- Clicking the "Logout" button also clears the token and redirects to login.

## Responsive & Styling

- Basic CSS in `src/styles/index.css` provides a lightweight, mobile‑friendly UI.
- Tables collapse into labeled blocks on narrow screens and the nav wraps vertically.

## Deployment Notes

- Build with relative asset paths (default) so that the app works when served
  from any URL. Ensure your Nginx config uses `try_files $uri /index.html` for
  SPA routing.
- CORS is handled by the backend; point the panel at `https://appleapi.playmetod.store`.

## Troubleshooting

- No connection? Verify `VITE_API_BASE` and that backend is running.
- Console/Network errors will show details.

Developed by Elit Bahrain. All rights reserved.
