import {v4} from 'react-native-uuid/src/v4';
import {ApiManager} from '../ApiManager';

export const send_product = async product => {
  return await fetch(`${ApiManager.url}/products/order`, {
    method: 'POST',
    headers: ApiManager.headers,
    body: JSON.stringify({
      id: v4(),
      name: product.name,
      category: product.category,
      sectorName: product.sectorName,
      quantity: product.quantity,
      orderId: product.orderId,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`send_product: ${_err}`));
};
