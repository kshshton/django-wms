import { ApiManager } from "../../ApiManager";

export const getCustomer = async (id) => {
  return await fetch(`${ApiManager.url}/orders/${id}/customer`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
