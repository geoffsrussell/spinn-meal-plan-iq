export function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...headers
    },
    body: JSON.stringify(body)
  };
}

export function redirect(location, headers = {}) {
  const values = headers['set-cookie'];
  const clean = { ...headers };
  delete clean['set-cookie'];
  const response = { statusCode: 302, headers: { location, 'cache-control': 'no-store', ...clean }, body: '' };
  if (Array.isArray(values)) response.multiValueHeaders = { 'set-cookie': values };
  else if (values) response.headers['set-cookie'] = values;
  return response;
}

export function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map(v => v.trim()).filter(Boolean).map(part => {
    const i = part.indexOf('=');
    return [part.slice(0, i), decodeURIComponent(part.slice(i + 1))];
  }));
}

export function cookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || '/'}`);
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.httpOnly !== false) parts.push('HttpOnly');
  if (options.secure !== false) parts.push('Secure');
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);
  return parts.join('; ');
}
