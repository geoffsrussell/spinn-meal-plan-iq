import crypto from 'node:crypto';
import { authorizationUrl } from './_shared/kroger.js';
import { cookie, redirect, json } from './_shared/http.js';
import { seal } from './_shared/crypto.js';

export async function handler() {
  try {
    const state = crypto.randomBytes(24).toString('base64url');
    const stateCookie = cookie('kroger_oauth_state', seal({ state, createdAt: Date.now() }), { maxAge: 600 });
    return redirect(authorizationUrl(state), { 'set-cookie': stateCookie });
  } catch (error) {
    return json(500, { error: error.message || 'Unable to start Kroger connection.' });
  }
}
