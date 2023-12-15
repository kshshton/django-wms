import { ApiManager } from "../ApiManager";

export const postProduct = (id) => {
  return fetch(`${ApiManager.url}/products`, {
    method: "POST",
    headers: ApiManager.headers,
    body: JSON.stringify({
      id,
    }),
  }).then((r) => r.json());
};
