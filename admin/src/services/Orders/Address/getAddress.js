import { ApiManager } from "../../ApiManager";

export const getAddress = async (id) => {
  return await fetch(`${ApiManager.url}/orders/${id}/address`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
