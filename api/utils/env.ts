const REQUIRED = [
  'TWILIO_SID',
  'TWILIO_TOKEN',
  'TWILIO_FROM',
  'YOUR_PHONE',
  'CLOSER_1_PHONE',
  'CLOSER_2_PHONE'
];

export function ensureEnv(throwOnMissing = false) {
  const missing: string[] = [];
  for (const key of REQUIRED) {
    if (!process.env[key]) missing.push(key);
  }
  if (missing.length && throwOnMissing) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
  return { ok: missing.length === 0, missing };
}

export function getEnvOr(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}
