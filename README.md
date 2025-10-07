# Portfolio Backend

**Stack:** Node.js + Express + TypeScript + Prisma + PostgreSQL (Supabase)  
**Auth:** bcrypt (owner/admin seeded)  
**DB:** Supabase (Postgres) via Prisma

---

## Features

- JWT-based authentication (login)
- Seeded admin (OWNER) account for dashboard access
- Blog / Post CRUD endpoints (owner-only create/update/delete; public read)
- Project CRUD endpoints
- Input validation & error handling (express-validator)
- Prisma migrations + seed scripts
- Health check endpoint

---

## Repo structure (high level)

/
├─ prisma/
│ ├─ schema.prisma
│ └─ seed.ts
├─ src/
│ ├─ server.ts
│ ├─ prisma.ts
│ ├─ routes/
│ │ ├─ user
│ │ ├─ blogs
│ │ └─ projects
│ ├─ middleware/
│ │ └─ auth.ts
│ └─ modules/
│ └─ ...
├─ package.json
├─ tsconfig.json
└─ .env.example

## Quickstart (local)

### 1. Clone & install

```bash
git clone https://github.com/mahmudur987/Portfolio-Server-Prisma-Postgress.git
cd <backend-repo-dir>
npm install
2. Environment variables
Create a .env file (copy .env.example) and set values:

ini
Copy code
DATABASE_URL="postgresql://postgres:YOUR_DB_PASSWORD@db.xxxxxx.supabase.co:6543/postgres"
JWT_SECRET="replace_with_a_strong_secret"
PORT=4000

# Optional seed credentials
SEED_ADMIN_EMAIL="admin@example.com"
SEED_ADMIN_PASSWORD="ChangeMe123!"
Important: Use the Supabase Postgres connection string (found in Supabase dashboard → Settings → Database → Connection string).

3. Prisma(generate / migrate / seed)
bash
Copy code
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
The seed script will create an admin user using SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD (defaults above). Change these in .env for production.

4. Run server (dev)

npm run dev
# runs ts-node-dev src/server.ts (hot reload)
5. Build & start (production)

npm run build   # tsc -> dist/
npm run start   # node dist/server.js
API Endpoints (summary)
Auth

POST /api/v1/v1/user/login
Request: { email, password }


Blogs / Posts

GET /api/v1/blogs — list published blogs (used by Next.js ISR)

GET /api/v1/blogs/:slug — get single blog by slug

POST /api/v1/blogs — create (OWNER only)

PUT /api/v1/blogs/:id — update (OWNER only)

DELETE /api/v1/blogs/:id — delete (OWNER only)

Projects

GET /api/v1/projects — list projects

GET /api/v1/projects/:id — get project

POST /api/v1/projects — create (OWNER only)

PUT /api/v1/projects/:id — update (OWNER only)

DELETE /api/v1/projects/:id — delete (OWNER only)



Authentication & Security
Passwords hashed using bcrypt.


Seeding test data
prisma/seed.ts seeds admin user and optionally sample posts/projects.

You can customize the seed data inside prisma/seed.ts before running npx ts-node prisma/seed.ts.

Deployment notes
Vercel (serverless)
You can use Vercel with a vercel.json that compiles TypeScript and executes dist/server.js, but note serverless limitations (cold starts, timeouts). If you choose Vercel:

vercel.json sample:

json
Copy code
{
  "version": 2,
  "buildCommand": "npm run build",
  "builds": [{ "src": "dist/server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "dist/server.js" }]
}
Add build and start scripts in package.json:


"build": "tsc",
"start": "node dist/server.js"
Recommended: Railway / Render / Fly.io
These providers host long-running servers and work well for Express + Prisma + Postgres.

Environment variables on host
DATABASE_URL, JWT_SECRET, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, PORT, etc.

Troubleshooting
PrismaClientKnownRequestError: P2021 — tables not found: run migrations (npx prisma migrate dev).

Date fields: Prisma DateTime expects JS Date or ISO-8601 string (e.g. 2022-10-09T00:00:00.000Z).

If deploy shows DEPLOYMENT_NOT_FOUND on Vercel: ensure dist/server.js exists after build and buildCommand is defined.

Admin credentials (test)
Change immediately in production. These are for local testing / QA.

Email: admin@gmail.com
Password: 123456
Future improvements (ideas)
Add refresh tokens in httpOnly cookies

Rate limiting, request logging (morgan/winston)

Image uploads to Supabase Storage

Tests (Jest / Supertest)

Role management UI in frontend

If anything breaks or you want me to wire the frontend integration (Next.js ISR, dashboard, react-hot-toast, React Quill), ping me — I can provide the Next.js side wiring and sample pages.

```
