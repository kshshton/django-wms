import { ApiManager } from "../ApiManager";

export const getOrders = async () => {
  return await fetch(`${ApiManager.url}/orders`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
