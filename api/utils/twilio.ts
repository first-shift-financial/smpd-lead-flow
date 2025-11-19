// api/utils/twilio.ts
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const FROM_NUMBER = process.env.TWILIO_FROM!;
const CLAIM_BASE_URL = 'https://firstshiftfinancial.com/claim';   // <-- your real domain

// List of people who get the instant HOT alert
const ALERT_NUMBERS = [
  process.env.YOUR_PHONE,
  process.env.CLOSER_1_PHONE,
  process.env.CLOSER_2_PHONE,
].filter(Boolean) as string[];

/**
 * Send the instant "HOT SMPD LEAD!" SMS blast
 */
export async function sendHotAlert(lead: any): Promise<boolean> {
  const message = `🚔 HOT SMPD LEAD!\n${lead.name}\n${lead.phone}\nClaim now: ${CLAIM_BASE_URL}/${lead.phone.replace(/\+/g, '')}`;

  for (const to of ALERT_NUMBERS) {
    for (let attempt = 0;  < 3; attempt++) {
      try {
        await client.messages.create({
          body: message,
          from: FROM_NUMBER,
          to,
        });
        console.log(`HOT alert sent to ${to}`);
        return true; // at least one success = good
      } catch (error: any) {
        console.error(`Twilio attempt ${attempt + 1} to ${to} failed:`, error.message);
        if (attempt === 2) return false;
        // exponential backoff
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }
  return false;
}

/**
 * Follow-up SMS + Email after 5 minutes if nobody claimed
 * (You can expand this later with SendGrid for email)
 */
export async function sendFollowUp(lead: any): Promise<boolean> {
  const message = `Reminder – HOT SMPD lead still unclaimed!\n${lead.name}\n${lead.phone}\nClaim: ${CLAIM_BASE_URL}/${lead.phone.replace(/\+/g, '')}`;

  for (const to of ALERT_NUMBERS) {
    try {
      await client.messages.create({
        body: message,
        from: FROM_NUMBER,
        to,
      });
      console.log(`Follow-up sent to ${to}`);
    } catch (error) {
      console.error(`Follow-up SMS failed to ${to}`, error);
    }
  }
  return true;
}
