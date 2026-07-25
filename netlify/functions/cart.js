import { json, parseCookies, cookie } from './_shared/http.js';
import { unseal, seal } from './_shared/crypto.js';
import { krogerPut, tokenRequest } from './_shared/kroger.js';

async function activeSession(raw) {
  const session = unseal(raw);
  if (session.expiresAt > Date.now() + 60_000) return { session, changed: false };
  if (!session.refreshToken) throw new Error('Kroger connection expired. Reconnect your account.');
  const tokens = await tokenRequest({ grant_type: 'refresh_token', refresh_token: session.refreshToken });
  return {
    changed: true,
    session: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || session.refreshToken,
      expiresAt: Date.now() + Number(tokens.expires_in || 1800) * 1000,
      scope: tokens.scope || session.scope
    }
  };
}

export async function handler(event) {
  try {
    if (event.httpMethod !== 'PUT' && event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed.' });
    const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || '');
    if (!cookies.kroger_session) return json(401, { error: 'Connect your Fry\'s/Kroger account first.' });
    const { session, changed } = await activeSession(cookies.kroger_session);
    const body = JSON.parse(event.body || '{}');
    const items = (body.items || []).map(x => ({ upc: String(x.upc || ''), quantity: Math.max(1, Number(x.quantity || 1)), modality: x.modality || 'PICKUP' })).filter(x => x.upc);
    if (!items.length) return json(400, { error: 'No valid products were selected.' });
    await krogerPut('/cart/add', { items }, session.accessToken);
    const headers = changed ? { 'set-cookie': cookie('kroger_session', seal(session), { maxAge: 60 * 60 * 24 * 30 }) } : {};
    return json(200, { ok: true, added: items.length }, headers);
  } catch (error) {
    return json(500, { error: error.message || 'Unable to add items to the Kroger cart.' });
  }
}
