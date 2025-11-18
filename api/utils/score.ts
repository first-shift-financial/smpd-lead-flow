export function scoreLead(lead: any): number {
  // Very small heuristic scoring: prefer presence of phone, email, and source
  let score = 0;
  if (lead.phone) score += 50;
  if (lead.email) score += 20;
  if (lead.source && typeof lead.source === 'string') score += 10;
  if (lead.notes && lead.notes.length > 20) score += 10;
  // clamp 0-100
  return Math.max(0, Math.min(100, score));
}
