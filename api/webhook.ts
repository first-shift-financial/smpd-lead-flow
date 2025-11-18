import { z } from 'zod';
import { enrichLead } from './utils/enrich';
import { scoreLead } from './utils/score';
import { sendSms } from './utils/twilio';
import { sendLovable } from './utils/lovable';
import { notifySlack } from './utils/notify';
import { triggerDashboard } from './utils/vercel-dashboard';

const LeadSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string(),
  email: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional()
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body: any = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err) {
    // fall through
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid payload', details: parsed.error.format() });
    return;
  }

  const lead = parsed.data;

  try {
    const enriched = await enrichLead(lead);
    const score = scoreLead(enriched);

    // Notify external systems
    await Promise.all([
      sendLovable(enriched, score).catch(() => undefined),
      notifySlack(enriched, score).catch(() => undefined),
      triggerDashboard(enriched).catch(() => undefined)
    ]);

    // If hot lead, notify via Twilio
    if (score >= 80) {
      const bodyText = `Hot lead: ${enriched.firstName ?? ''} ${enriched.lastName ?? ''} — ${enriched.phone}`;
      await sendSms(process.env.CLOSER_1_PHONE as string, bodyText).catch(() => undefined);
      await sendSms(process.env.CLOSER_2_PHONE as string, bodyText).catch(() => undefined);
    }

    res.status(200).json({ ok: true, score });
  } catch (err: any) {
    console.error('webhook error', err?.stack ?? err);
    res.status(500).json({ error: 'Internal error' });
  }
}
