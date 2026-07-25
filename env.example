import { json } from './_shared/http.js';
import { krogerGet } from './_shared/kroger.js';

export async function handler(event) {
  try {
    const zip = String(event.queryStringParameters?.zip || '').trim();
    if (!/^\d{5}$/.test(zip)) return json(400, { error: 'Enter a valid 5-digit ZIP code.' });
    const data = await krogerGet('/locations', {
      'filter.zipCode.near': zip,
      'filter.radiusInMiles': '25',
      'filter.limit': '20'
    });
    const locations = (data.data || []).map(x => ({
      id: x.locationId,
      name: x.name || x.chain || 'Kroger location',
      chain: x.chain || '',
      address: [x.address?.addressLine1, x.address?.city, x.address?.state, x.address?.zipCode].filter(Boolean).join(', '),
      phone: x.phone || '',
      departments: (x.departments || []).map(d => d.name).filter(Boolean)
    }));
    return json(200, { locations });
  } catch (error) {
    return json(500, { error: error.message || 'Unable to search Kroger locations.' });
  }
}
