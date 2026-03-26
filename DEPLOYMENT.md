# Deployment Guide: Golf Charity SaaS

The project has been successfully pushed to [GitHub](https://github.com/shahid2300033762/golf-charity). Follow these steps to deploy to production.

## 1. Backend Deployment (Render)

1.  **Create a New Web Service**: Link your GitHub repository.
2.  **Root Directory**: Set this to `backend`.
3.  **Runtime**: Select `Node`.
4.  **Build Command**: `npm install && npm run build`
5.  **Start Command**: `npm start`
6.  **Environment Variables**:
    - `VITE_SUPABASE_URL`: Your Supabase Project URL.
    - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
    - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (required for draw execution).
    - `NODE_ENV`: `production`

> [!NOTE]
> Once deployed, Render will provide a URL (e.g., `https://golf-charity-backend.onrender.com`). You will need this for the Frontend configuration.

---

## 2. Frontend Deployment (Vercel)

1.  **New Project**: Select the same GitHub repository.
2.  **Root Directory**: Set this to `frontend`.
3.  **Framework Preset**: Select `Vite`.
4.  **Build Command**: `npm run build`
5.  **Output Directory**: `dist`
6.  **Environment Variables**:
    - `VITE_SUPABASE_URL`: Your Supabase Project URL.
    - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
    - `VITE_API_URL`: The URL of your Render backend (with `/api` suffix if needed, e.g., `https://your-backend.onrender.com`).

---

## 3. Post-Deployment Verification

1.  **Health Check**: Visit `https://your-backend.onrender.com/api/health` to verify the backend is live.
2.  **CORS**: If you encounter CORS issues, ensure the logic in `backend/src/index.ts` allows your Vercel URL (currently set to allow all origins `app.use(cors())`, which is fine for production initially).
3.  **Score Locking**: Test a score submission on the live site to ensure the RLS policies and backend validation are working in the new environment.

---

### Critical Links
- [GitHub Repository](https://github.com/shahid2300033762/golf-charity)
- [Supabase Dashboard](https://app.supabase.com)
