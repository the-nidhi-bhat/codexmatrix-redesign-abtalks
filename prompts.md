# ABTalkS prompt history

This document records the user-facing prompts used to shape the ABTalkS rebuild. Secrets, tokens, environment values, and private database data are intentionally excluded.

## Prompts used

1. **Initial product build**
   - Build a 60-day discipline and proof-tracking app with landing, dashboard, day experience, help panel, streaks, and a polished product UI.
2. **Authentication and persistence decision**
   - Use real authentication and a real database instead of mock-only persistence.
3. **First version scope**
   - Build all three routes plus the help panel in the first version.
4. **Neon setup**
   - Check the Neon integration status and use Neon + Drizzle + Better Auth for production-style persistence.
5. **ABTalkS reference rebuild**
   - Rebuild the app as ABTalkS, matching the supplied reference implementation and its analog/marker visual language while preserving real Neon + Better Auth.
6. **ABTalkS feature completion**
   - Add track selection, GitHub and LinkedIn proof links, server-computed streaks, streak freeze support, seeded/demo data where useful, and make the full app work end-to-end.
7. **Repository and deployment target**
   - Prepare the project as `codexmatrix-redesign-abtalks`, branded as ABTalkS, and target the existing Vercel project and the authenticated GitHub account.

## Implementation notes

- ABTalkS is the product name shown in the UI.
- The app uses email/password authentication through Better Auth.
- Neon/Postgres remains the persistence layer.
- Demo visual content is deterministic and non-sensitive; user challenge and proof data is scoped by authenticated user on the server.
- Deployment and repository creation still require the connected GitHub/Vercel mutation permissions if they are not already enabled in the workspace.
