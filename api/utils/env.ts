const REQUIRED = [
  'TWILIO_SID',
  'TWILIO_TOKEN',
  'TWILIO_FROM',
  'YOUR_PHONE',
  'CLOSER_1_PHONE',
  'CLOSER_2_PHONE'
];

/**
 * Ensure environment variables exist.
 * @param throwOnMissing if true, throws an Error when required vars are missing
 * @param extraKeys optional additional env keys to validate
 */
export function ensureEnv(throwOnMissing = false, extraKeys: string[] = []) {
  const keys = REQUIRED.concat(extraKeys);
  const missing: string[] = [];
  for (const key of keys) {
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
