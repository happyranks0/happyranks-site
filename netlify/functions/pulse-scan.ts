import type { Config, Context } from '@netlify/functions';

const DEFAULT_API = 'https://vital.gohappyranks.com';

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let payload: { url?: string; email?: string };
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { url, email } = payload;
  if (!url || !email) {
    return new Response(JSON.stringify({ error: 'url and email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiBase =
    process.env.PULSE_API_URL ||
    process.env.VITAL_API_URL ||
    DEFAULT_API;

  try {
    const upstream = await fetch(`${apiBase}/api/vital/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, email }),
    });

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (err) {
    console.error('pulse-scan proxy error', err);
    return new Response(JSON.stringify({ error: 'Audit service unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config: Config = {
  path: '/api/pulse/scan',
  method: ['POST'],
};
