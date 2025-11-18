# smpd-lead-flow
SMPD Hot Lead Automation Flow

This repository is a serverless Vercel Functions project that exposes only TypeScript API routes (no frontend).

Runtime & Deploy
- Vercel will deploy functions under the `api/` directory. Functions are TypeScript files.
- `vercel.json` pins API functions `api/**/*.ts` to `nodejs18.x` runtime.

Environment variables
- The repository does not include secrets. Configure these in Vercel or your environment:
  - `TWILIO_SID`
  - `TWILIO_TOKEN`
  - `TWILIO_FROM`
  - `YOUR_PHONE`
  - `CLOSER_1_PHONE`
  - `CLOSER_2_PHONE`
  - `LOVABLE_WEBHOOK_URL`
  - `SUPABASE_SERVICE_KEY`
  - `SLACK_WEBHOOK` (optional)

Files of interest
- `api/webhook.ts` — main POST handler for incoming lead webhooks.
- `api/utils/*` — helpers: `enrich.ts`, `score.ts`, `twilio.ts`, `lovable.ts`, `vercel-dashboard.ts`, `notify.ts`.

Notes for agents
- This repo currently contains only serverless functions. Do not add heavy framework scaffolding.
- Use Vercel's native Git deploys; do not add GitHub Actions unless requested.

If anything in this README needs expansion, add a single targeted question describing the missing information (e.g., the external enrichment provider URL, Twilio phone numbers, or production branches).
