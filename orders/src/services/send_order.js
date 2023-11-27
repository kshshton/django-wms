import {ApiManager} from './ApiManager';

export const send_order = async order => {
  return await fetch(`${ApiManager.url}/orders`, {
    method: 'POST',
    headers: ApiManager.headers,
    body: JSON.stringify({
      id: order.id,
      addressId: order.address.id,
      cart: order.products,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`send_order: ${_err}`));
};
