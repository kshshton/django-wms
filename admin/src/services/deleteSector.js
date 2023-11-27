import { ApiManager } from "./ApiManager";

export const deleteSector = (target) => {
  return fetch(`${ApiManager.url}/sectors/${target.id}`, {
    method: "DELETE",
    headers: ApiManager.headers,
  }).then((r) => r.json());
};
