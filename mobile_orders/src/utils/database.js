import {v4} from 'react-native-uuid/src/v4';

export const updateProduct = async product => {
  return await fetch(`http://192.168.0.167:8000/api/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      sectorName: product.sectorName,
      orderId: product.orderId,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`updateProduct: ${_err}`));
};

export const updateDatabaseProducts = async orderedProducts => {
  const databaseProducts = await fetch(
    'http://192.168.0.167:8000/api/products',
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  )
    .then(res => res.json())
    .catch(_err => console.error(_err));

  const products = orderedProducts.map(orderedProduct => {
    const product = databaseProducts.find(
      databaseProduct => databaseProduct.id === orderedProduct.id,
    );
    return {
      id: orderedProduct.id,
      name: orderedProduct.name,
      category: orderedProduct.category,
      sectorName: orderedProduct.sectorName,
      quantity: product.quantity - orderedProduct.quantity,
    };
  });

  for (const product of products) {
    await updateProduct(product);
  }
};

export const sendProduct = async product => {
  return await fetch('http://192.168.0.167:8000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
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
    .catch(_err => console.error(`sendProduct: ${_err}`));
};

export const sendProducts = async products => {
  for (const product of products) {
    await sendProduct(product);
  }
};

export const sendCustomerData = async customer => {
  return await fetch('http://192.168.0.167:8000/api/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      id: v4(),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || null,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`sendCustomerData: ${_err}`));
};

export const sendAddressData = async (address, customer) => {
  return await fetch('http://192.168.0.167:8000/api/address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
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
    .catch(_err => console.error(`sendAddressData: ${_err}`));
};

export const sendOrder = async order => {
  return await fetch('http://192.168.0.167:8000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      id: order.id,
      addressId: order.address.id,
      cart: order.products,
    }),
  })
    .then(res => res.json())
    .catch(_err => console.error(`sendOrder: ${_err}`));
};
