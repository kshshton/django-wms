import {v4} from 'react-native-uuid/src/v4';
import {ApiManager} from './ApiManager';

export const send_customer_data = async customer => {
  return await fetch(`${ApiManager.url}/customer`, {
    method: 'POST',
    headers: ApiManager.headers,
    body: JSON.stringify({
      id: v4(),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || null,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`send_customer_data: ${_err}`));
};
