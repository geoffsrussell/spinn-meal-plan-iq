const base = () => (process.env.KROGER_API_BASE || 'https://api.kroger.com/v1').replace(/\/$/, '');

function credentials() {
  const id = process.env.KROGER_CLIENT_ID;
  const secret = process.env.KROGER_CLIENT_SECRET;
  if (!id || !secret) throw new Error('Kroger credentials are not configured in Netlify');
  return { id, secret };
}

export async function tokenRequest(params) {
  const { id, secret } = credentials();
  const auth = Buffer.from(`${id}:${secret}`).toString('base64');
  const response = await fetch(`${base()}/connect/oauth2/token`, {
    method: 'POST',
    headers: {
      authorization: `Basic ${auth}`,
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json'
    },
    body: new URLSearchParams(params)
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!response.ok) throw new Error(data.error_description || data.error || `Kroger token request failed (${response.status})`);
  return data;
}

export async function clientToken(scope = 'product.compact') {
  return tokenRequest({ grant_type: 'client_credentials', scope });
}

export async function krogerGet(path, params, accessToken) {
  const token = accessToken || (await clientToken()).access_token;
  const url = new URL(`${base()}${path}`);
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, {
    headers: { authorization: `Bearer ${token}`, accept: 'application/json' }
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!response.ok) throw new Error(data.error_description || data.error || `Kroger API request failed (${response.status})`);
  return data;
}

export async function krogerPut(path, body, accessToken) {
  const response = await fetch(`${base()}${path}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response.status === 204) return { ok: true };
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!response.ok) throw new Error(data.error_description || data.error || `Kroger cart request failed (${response.status})`);
  return data;
}

export function authorizationUrl(state) {
  const clientId = process.env.KROGER_CLIENT_ID;
  const redirectUri = process.env.KROGER_REDIRECT_URI;
  if (!clientId || !redirectUri) throw new Error('KROGER_CLIENT_ID and KROGER_REDIRECT_URI are required');
  const url = new URL(`${base()}/connect/oauth2/authorize`);
  url.searchParams.set('scope', 'profile.compact product.compact cart.basic:write');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('state', state);
  return url.toString();
}
