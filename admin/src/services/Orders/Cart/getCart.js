import { ApiManager } from "../../ApiManager";

export const getCart = async (id) => {
  return await fetch(`${ApiManager.url}/orders/${id}/cart`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
