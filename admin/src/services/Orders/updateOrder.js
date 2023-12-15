import { ApiManager } from "../ApiManager";

export const updateOrder = (orderId, userId, complete) => {
  return fetch(`${ApiManager.url}/orders/${orderId}`, {
    method: "PUT",
    headers: ApiManager.headers,
    body: JSON.stringify({
      complete,
      userId,
    }),
  }).then((r) => r.json());
};
