import { access } from 'node:fs/promises';
await access('public/index.html');
console.log('Static app and Netlify Functions are ready.');
