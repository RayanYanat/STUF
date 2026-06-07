import type { Handler, HandlerEvent } from '@netlify/functions';

const MAX_LEN = 4000;
const MAX_SUBJECT_LEN = 150;
const MIN_FILL_MS = 2000; // forms submitted faster than this look automated
const RATE_LIMIT_MAX = 5; // max submissions...
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes per IP

// Best-effort, in-memory throttle (per warm container). For strict limits,
// back this with a durable store (e.g. Upstash Redis free tier).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, error: 'Invalid request.' });
  }

  // Honeypot + time-trap. Accept silently so bots don't learn they were caught.
  const renderedAt = Number(data.renderedAt);
  const tooFast = Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS;
  const honeypotFilled = typeof data.hp === 'string' && data.hp.trim() !== '';
  if (honeypotFilled || tooFast) {
    return json(200, { ok: true, reference: 'STUF-IGNORED' });
  }

  // GDPR: explicit consent is mandatory before we process anything.
  if (data.consent !== true) {
    return json(400, { ok: false, error: 'Please tick the consent box so we can reply to you.' });
  }

  const subject = typeof data.subject === 'string' ? data.subject.trim().slice(0, MAX_SUBJECT_LEN) : '';
  if (!subject) return json(400, { ok: false, error: 'Please add a subject.' });

  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!message) return json(400, { ok: false, error: 'Please write your question.' });
  if (message.length > MAX_LEN) return json(400, { ok: false, error: 'That question is too long.' });

  // Email is required here — the whole point is for the team to reply.
  const email = typeof data.email === 'string' ? data.email.trim().slice(0, 200) : '';
  if (!email) return json(400, { ok: false, error: 'Please add your email so the team can reply.' });
  if (!isEmail(email)) return json(400, { ok: false, error: 'That email address looks invalid.' });

  const ip =
    event.headers['x-nf-client-connection-ip'] ||
    (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    'unknown';
  if (rateLimited(ip)) {
    return json(429, {
      ok: false,
      error: 'Thanks — we already have a few messages from you. Please try again a little later.',
    });
  }

  const { RESEND_API_KEY, ADVICE_TO_EMAIL, ADVICE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ADVICE_TO_EMAIL || !ADVICE_FROM_EMAIL) {
    console.error('submit-advice: missing RESEND_API_KEY / ADVICE_TO_EMAIL / ADVICE_FROM_EMAIL');
    return json(500, {
      ok: false,
      error: 'Messaging is not configured yet. Please email hello@stuf.org.uk directly.',
    });
  }

  const reference = `STUF-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  const text = [
    `Subject: ${subject}`,
    `From: ${email}`,
    `Reference: ${reference}`,
    `Submitted: ${new Date().toISOString()}`,
    '',
    'Question:',
    message,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: ADVICE_FROM_EMAIL,
        to: [ADVICE_TO_EMAIL],
        reply_to: email,
        subject: `[STUF] ${subject} (${reference})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error('submit-advice: Resend error', res.status, await res.text());
      return json(502, {
        ok: false,
        error: 'We could not send your message right now. Please email hello@stuf.org.uk.',
      });
    }
  } catch (err) {
    console.error('submit-advice: fetch failed', err);
    return json(502, {
      ok: false,
      error: 'We could not send your message right now. Please email hello@stuf.org.uk.',
    });
  }

  return json(200, { ok: true, reference });
};
