import { ApiManager } from "../ApiManager";

export const deleteOrder = (target) => {
  return fetch(`${ApiManager.url}/orders/${target.id}`, {
    method: "DELETE",
    headers: ApiManager.headers,
  }).then((r) => r.json());
};
