import {send_product} from './send_product';

export const send_products = async products => {
  for (const product of products) {
    await send_product(product);
  }
};
