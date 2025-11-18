import axios from 'axios';

export async function notifySlack(lead: any, score: number) {
  const url = process.env.SLACK_WEBHOOK;
  if (!url) return;
  try {
    const text = `New lead — score ${score}: ${lead.firstName ?? ''} ${lead.lastName ?? ''} ${lead.phone}`;
    await axios.post(url, { text }).catch(() => undefined);
  } catch (err) {
    console.error('slack notify error', err);
  }
}
