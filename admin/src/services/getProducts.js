import { ApiManager } from "./ApiManager";

export const getProducts = async () => {
  return await fetch(`${ApiManager.url}/products`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
