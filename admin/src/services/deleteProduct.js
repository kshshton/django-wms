import { ApiManager } from "./ApiManager";

export const deleteProduct = (target) => {
  return fetch(`${ApiManager.url}/products/${target.id}`, {
    method: "DELETE",
    headers: ApiManager.headers,
  }).then((r) => r.json());
};
