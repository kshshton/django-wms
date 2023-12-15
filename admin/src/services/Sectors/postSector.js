import { ApiManager } from "../ApiManager";

export const postSector = (id) => {
  return fetch(`${ApiManager.url}/sectors`, {
    method: "POST",
    headers: ApiManager.headers,
    body: JSON.stringify({
      id,
    }),
  }).then((r) => r.json());
};
