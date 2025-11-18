import axios from 'axios';

export async function triggerDashboard(lead: any) {
  // Placeholder: send a lightweight event to an internal dashboard or analytics endpoint.
  // In a real implementation, replace with the actual URL and payload.
  const url = process.env.VERCEL_DASHBOARD_URL || '';
  if (!url) return;
  try {
    await axios.post(url, { lead }).catch(() => undefined);
  } catch (err) {
    console.error('vercel-dashboard error', err);
  }
}
