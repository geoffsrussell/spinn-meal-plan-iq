import { cookie, parseCookies, redirect } from './_shared/http.js';
import { unseal, seal } from './_shared/crypto.js';
import { tokenRequest } from './_shared/kroger.js';

export async function handler(event) {
  const siteUrl = process.env.URL || '/';
  try {
    const code = event.queryStringParameters?.code;
    const state = event.queryStringParameters?.state;
    const error = event.queryStringParameters?.error;
    if (error) return redirect(`${siteUrl}/?kroger=error&reason=${encodeURIComponent(error)}`);
    if (!code || !state) return redirect(`${siteUrl}/?kroger=error&reason=missing_callback_values`);
    const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || '');
    const saved = unseal(cookies.kroger_oauth_state || '');
    if (saved.state !== state || Date.now() - saved.createdAt > 10 * 60 * 1000) throw new Error('OAuth state validation failed');
    const tokens = await tokenRequest({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.KROGER_REDIRECT_URI
    });
    const session = seal({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + Number(tokens.expires_in || 1800) * 1000,
      scope: tokens.scope || ''
    });
    return redirect(`${siteUrl}/?kroger=connected`, {
      'set-cookie': [
        cookie('kroger_session', session, { maxAge: 60 * 60 * 24 * 30 }),
        cookie('kroger_oauth_state', '', { maxAge: 0 })
      ]
    });
  } catch (error) {
    return redirect(`${siteUrl}/?kroger=error&reason=${encodeURIComponent(error.message || 'callback_failed')}`);
  }
}
