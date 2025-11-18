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

How to configure env vars on Vercel

- Go to your Vercel project dashboard -> Settings -> Environment Variables.
- Add the variables above as *Environment Variables* (do not commit them into the repo).
- For local testing, create a `.env` file (listed in `.gitignore`) with the same names. Example:

```bash
# .env (do NOT commit)
TWILIO_SID=sk_xxx
TWILIO_TOKEN=twilio_token
TWILIO_FROM=+15551234567
YOUR_PHONE=+15559876543
CLOSER_1_PHONE=+15550000001
CLOSER_2_PHONE=+15550000002
LOVABLE_WEBHOOK_URL=https://hooks.example.com/lov
SUPABASE_SERVICE_KEY=service_key_here
SLACK_WEBHOOK=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

Runtime helpers

- The project includes `api/utils/env.ts` which exposes `ensureEnv()` to detect missing required env vars at runtime. It is safe to use this in startup paths to fail early when variables are missing.


Files of interest
- `api/webhook.ts` — main POST handler for incoming lead webhooks.
- `api/utils/*` — helpers: `enrich.ts`, `score.ts`, `twilio.ts`, `lovable.ts`, `vercel-dashboard.ts`, `notify.ts`.

Notes for agents
- This repo currently contains only serverless functions. Do not add heavy framework scaffolding.
- Use Vercel's native Git deploys; do not add GitHub Actions unless requested.

If anything in this README needs expansion, add a single targeted question describing the missing information (e.g., the external enrichment provider URL, Twilio phone numbers, or production branches).
