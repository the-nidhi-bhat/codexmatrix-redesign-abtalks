# ABTalkS Engineering Decisions

## Authentication
ABTalkS uses Better Auth with email and password sessions. Protected pages validate the session server-side before reading challenge data.

## Persistence
Challenge and proof records are stored in Neon through Drizzle. Client state is limited to UI concerns such as the theme and help dialog; progress is never persisted in browser storage.

## Proof validation
Proof links are normalized and must use HTTPS before persistence. Streaks are computed from persisted day logs, not from client-submitted numbers.

## Routing
`/dashboard` shows the active challenge and `/day/[day]` is the deep-linkable day experience. `/day` resolves to the current day for signed-in users.

## Product tradeoff
The current build keeps the core ABTalkS experience compact: track selection, daily proof, streak computation, freeze support, navigation, help, and responsive theming. Additional external GitHub existence checks and rate limiting should be added behind a dedicated API boundary before scaling beyond the initial release.

## Production configuration
Vercel must define `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` for the deployed origin. OAuth is not enabled, so there are no provider callback URLs to maintain.
