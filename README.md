# Practice Assignment 6 — Todo App

Standalone solution for GIU Software Project I, Winter 2026. This is **not** a change to either TA repository.

- `backend/` is an unchanged copy of the supplied [PA6-starter](https://github.com/RahmaAmeen/PA6-starter) NestJS API (in-memory todos on port 3000).
- `frontend/` is a new Next.js **16** App Router + TypeScript implementation of Exercises 6-1, 6-2, and 6-3 (port 3001). The [lab6-next](https://github.com/RahmaAmeen/lab6-next) tutorial was used as a routing reference, not copied as the solution.

## Run

Requires Node.js 20.9+ and npm. Use two terminals.

**Terminal A — backend:**

```bash
cd backend
npm ci
npm run start:dev
```

**Terminal B — frontend:**

```bash
cd frontend
cp .env.example .env.local
npm ci
npm run dev
```

Open <http://localhost:3001>. The backend resets its initial four todos on restart. The frontend uses `API_URL=http://localhost:3000` from `.env.local`, plain `fetch`, and same-origin route handlers for browser create/delete requests.

## Routes and acceptance criteria

| Exercise | Route / file | Behavior |
| --- | --- | --- |
| 6-1a,b,c | `(main)/layout`, `(auth)/layout`, `_components/Navbar`, root `layout.tsx` | Route groups, private folder, static `Todo App` metadata |
| 6-1d,e | `/api/stats`, `/` | `{total,done,open}` and homepage links to demos |
| 6-2a | `/todos`, `/todos?status=done`, `/todos?status=open` | list, filter, `loading.tsx`, `error.tsx` with `reset()` |
| 6-2b | `/todos/[id]` | details, custom 404, dynamic metadata |
| 6-2c | `/todos/new`, details delete button | client forms, backend errors, `useRouter`, bold active nav via `usePathname` |
| 6-2d | `/todos/[...slug]` | `/todos/new` static; `/todos/5` dynamic; `/todos/5/edit` catch-all |
| 6-3a | `/help/todos/create`, `/archive`, `/archive/2025` | breadcrumb and optional catch-all |
| 6-3b | `/playground/a`, `/playground/b` | layout counter persists, template counter resets |
| 6-3c | `/dashboard`, `/dashboard/settings` | `@stats`, `@recent`, slot defaults on refresh |
| 6-3d | `/todos` → click a todo | intercepted `(.)[id]` modal; refresh opens full detail |
| 6-3e | `/login`, `src/proxy.ts` | demo cookie and dashboard redirect |
| 6-3f | `src/app/global-error.tsx` | global error boundary |

The `/todos/new` links use a **full navigation** on purpose: when `/todos` has an intercepting `(.)[id]` slot, a soft `<Link>` to `/todos/new` can be incorrectly interpreted as the intercepted ID `new`.

Because the list has a streaming `loading.tsx` boundary, Next.js may send HTTP `200` before a dynamic detail page eventually calls `notFound()`. Its custom not-found UI and `noindex` marker still render correctly. This is a known streaming response behavior, not a backend status change.

Authentication is a **teaching demo**, not real authentication. The cookie is a marker and is not cryptographically verified.

## Check

```bash
cd backend && npm test -- --runInBand && npm run build
cd ../frontend && npm run lint && npm run typecheck && npm run build
```

Once both servers are running, run `npm run smoke` from `frontend/` to check the HTTP routes and mutation flow. Open `/todos`, click an item, then refresh to manually see intercepting route vs full detail. Switch between `/playground/a` and `/playground/b` to observe the counter lifetime.
