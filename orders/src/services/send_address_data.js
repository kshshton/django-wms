import {ApiManager} from './ApiManager';

export const send_address_data = async (address, customer) => {
  return await fetch(`${ApiManager.url}/address`, {
    method: 'POST',
    headers: ApiManager.headers,
    body: JSON.stringify({
      id: address.id,
      city: address.city,
      state: address.state,
      streetName: address.streetName,
      buildingNumber: address.buildingNumber,
      apartmentNumber: address.apartmentNumber,
      customerEmail: customer.email,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`send_address_data: ${_err}`));
};
