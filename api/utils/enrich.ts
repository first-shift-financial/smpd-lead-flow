import axios from 'axios';

export async function enrichLead(lead: any) {
  // Placeholder enrichment: in a real project this would call an enrichment service
  // For now, return the lead with a `enriched` flag and normalized phone
  const normalizedPhone = (lead.phone || '').replace(/[^0-9+]/g, '');

  // Example: optionally call external API if LOVABLE_WEBHOOK_URL exists (non-blocking)
  if (process.env.SUPABASE_SERVICE_KEY) {
    // This is intentionally lightweight and non-blocking in case keys are missing
    try {
      await axios.post('https://example-enrich.local/collect', { phone: normalizedPhone }).catch(() => undefined);
    } catch (e) {
      // ignore
    }
  }

  return {
    ...lead,
    phone: normalizedPhone,
    enriched: true
  };
}
