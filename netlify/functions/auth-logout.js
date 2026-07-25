import { json, cookie } from './_shared/http.js';
export async function handler() {
  return json(200, { connected: false }, { 'set-cookie': cookie('kroger_session', '', { maxAge: 0 }) });
}
