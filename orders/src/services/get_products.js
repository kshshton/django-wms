import {ApiManager} from './ApiManager';

export const get_products = async () => {
  return await fetch(`${ApiManager.url}/products`, {
    method: 'GET',
    headers: ApiManager.headers,
  })
    .then(res => res.json())
    .catch(_err => console.error(_err));
};
