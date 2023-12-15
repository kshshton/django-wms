import { ApiManager } from "../ApiManager";

export const getSectors = async () => {
  return await fetch(`${ApiManager.url}/sectors`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
