# ABTalkS

ABTalkS is a 60-day accountability app for students and developers. Pick a track, commit to a daily build, and submit proof that is persisted to Neon through authenticated server actions.

## Core routes

- `/` — product landing page
- `/sign-in` and `/sign-up` — Better Auth email/password authentication
- `/dashboard` — authenticated challenge overview, streaks, progress, and day matrix
- `/day/[day]` — authenticated daily task and proof experience

## Stack

- Next.js 16 App Router
- React 19
- Better Auth with email/password
- Neon Postgres + Drizzle ORM
- Tailwind CSS and shadcn/ui primitives

## Environment variables

Production requires the following server variables:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `NEON_AUTH_BASE_URL` when using the configured Neon auth callback setup

Never expose these values through `NEXT_PUBLIC_*` variables or client components.

## Local verification

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm run build
pnpm start
```

The app intentionally redirects unauthenticated users from `/dashboard` and `/day/[day]` to `/sign-in`. Create an account before testing protected routes.

## Data and security

All challenge and proof reads are scoped to the authenticated user. Mutations run through server actions, validate bounded input, and revalidate affected routes. Production response headers include HSTS, nosniff, same-origin framing protection, a strict referrer policy, and a restrictive permissions policy.

## Deployment

Connect this repository to the Vercel project and set the server environment variables for Development, Preview, and Production. Deploy with the Vercel dashboard or `vercel --prod --yes` after the CLI is authenticated.

## Troubleshooting production

1. Confirm `DATABASE_URL` and `BETTER_AUTH_SECRET` exist in Vercel project settings for the active environment.
2. Confirm the deployed commit includes the `AppProvider` wrapper in `app/layout.tsx`.
3. Test signed-out `/dashboard` and `/day/12`; both should redirect to `/sign-in`.
4. Test signed-in routes after creating an account and an active challenge.
5. Inspect Vercel runtime logs for server-only database/auth failures; never expose raw errors to users.
