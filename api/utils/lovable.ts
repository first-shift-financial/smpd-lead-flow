import axios from 'axios';

export async function sendLovable(lead: any, score: number) {
  const url = process.env.LOVABLE_WEBHOOK_URL;
  if (!url) return;
  try {
    await axios.post(url, { lead, score }).catch(() => undefined);
  } catch (err) {
    console.error('lovable send error', err);
    throw err;
  }
}
