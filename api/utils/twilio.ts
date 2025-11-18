import Twilio from 'twilio';

const SID = process.env.TWILIO_SID;
const TOKEN = process.env.TWILIO_TOKEN;
const FROM = process.env.TWILIO_FROM;

let client: any = null;
if (SID && TOKEN) {
  client = Twilio(SID, TOKEN);
}

export async function sendSms(to: string | undefined, body: string) {
  if (!client || !FROM || !to) {
    console.warn('Twilio missing configuration; skipping SMS', { to });
    return;
  }
  try {
    await client.messages.create({ from: FROM, to, body });
  } catch (err) {
    console.error('twilio send error', err);
    throw err;
  }
}
