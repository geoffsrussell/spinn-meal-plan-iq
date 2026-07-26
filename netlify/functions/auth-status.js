import { json, parseCookies } from './_shared/http.js';
import { unseal } from './_shared/crypto.js';

export async function handler(event) {
  try {
    const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || '');
    if (!cookies.kroger_session) return json(200, { connected: false });
    const session = unseal(cookies.kroger_session);
    return json(200, { connected: true, expiresAt: session.expiresAt, scope: session.scope });
  } catch {
    return json(200, { connected: false });
  }
}
