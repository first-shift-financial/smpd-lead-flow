// Minimal local integration test for the API webhook
// Usage: run `vercel dev` in project root, then in another shell run `node test/local-test.js`

const payload = {
  firstName: 'Test',
  lastName: 'User',
  phone: '+15551234567',
  email: 'test@example.com',
  source: 'test-form',
  notes: 'This is a sample SMPD hot lead for local testing.'
};

async function run() {
  try {
    const res = await fetch('http://localhost:3000/api/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('local-test error', err);
  }
}

run();
