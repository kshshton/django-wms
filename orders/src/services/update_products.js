import {ApiManager} from './ApiManager';
import {update_product} from './update_product';

export const update_products = async orderedProducts => {
  const databaseProducts = await fetch(`${ApiManager.url}/products`, {
    method: 'GET',
    headers: ApiManager.headers,
  })
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
    await update_product(product);
  }
};
