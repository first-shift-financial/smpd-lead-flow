import axios from 'axios';
import { ensureEnv } from './env';

// Require LOVABLE_WEBHOOK_URL for this helper to operate
ensureEnv(false, ['LOVABLE_WEBHOOK_URL']);

export async function sendLovable(lead: any, score: number) {
  const url = process.env.LOVABLE_WEBHOOK_URL;
  if (!url) {
    // If not configured, surface a clear warning (module initialization already checked)
    console.warn('LOVABLE_WEBHOOK_URL not configured; skipping lovable.post');
    return;
  }
  try {
    await axios.post(url, { lead, score }).catch(() => undefined);
  } catch (err) {
    console.error('lovable send error', err);
    throw err;
  }
}
