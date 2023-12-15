import {ApiManager} from '../ApiManager';

export const update_product = async product => {
  return await fetch(`${ApiManager.url}/products/${product.id}`, {
    method: 'PUT',
    headers: ApiManager.headers,
    body: JSON.stringify({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      sectorName: product.sectorName,
      orderId: product.orderId,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`update_product: ${_err}`));
};
