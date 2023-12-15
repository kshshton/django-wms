import {ApiManager} from '../ApiManager';

export const delete_product = async product => {
  return await fetch(`${ApiManager.url}/products/${product.id}`, {
    method: 'DELETE',
    headers: ApiManager.headers,
  })
    .then(res => res.json())
    .catch(_err => console.error(`delete_product: ${_err}`));
};
