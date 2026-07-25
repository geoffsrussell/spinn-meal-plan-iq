import { json } from './_shared/http.js';
import { krogerGet } from './_shared/kroger.js';

export async function handler(event) {
  try {
    const term = String(event.queryStringParameters?.term || '').trim();
    const locationId = String(event.queryStringParameters?.locationId || '').trim();
    if (!term) return json(400, { error: 'A product search term is required.' });
    if (!locationId) return json(400, { error: 'Select a store first.' });
    const data = await krogerGet('/products', {
      'filter.term': term,
      'filter.locationId': locationId,
      'filter.limit': '8'
    });
    const products = (data.data || []).map(x => {
      const item = (x.items || [])[0] || {};
      const price = item.price || {};
      const aisle = (item.aisleLocations || [])[0] || {};
      return {
        productId: x.productId,
        upc: item.upc || x.upc || x.productId,
        description: x.description || 'Product',
        brand: x.brand || '',
        size: item.size || '',
        regularPrice: price.regular ?? null,
        promoPrice: price.promo ?? null,
        fulfillment: item.fulfillment || {},
        aisle: [aisle.description, aisle.number, aisle.shelfNumber].filter(Boolean).join(' · '),
        image: (x.images || []).find(i => i.perspective === 'front')?.sizes?.find(s => s.size === 'medium')?.url || (x.images || [])[0]?.sizes?.[0]?.url || ''
      };
    });
    return json(200, { products });
  } catch (error) {
    return json(500, { error: error.message || 'Unable to search Kroger products.' });
  }
}
