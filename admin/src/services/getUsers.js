import { ApiManager } from "./ApiManager";

export const getUsers = async () => {
  return await fetch(`${ApiManager.url}/user`, {
    method: "GET",
    headers: ApiManager.headers,
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
