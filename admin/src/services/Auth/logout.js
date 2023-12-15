import { ApiManager } from "../ApiManager";

export const logout = () => {
  fetch(`${ApiManager.url}/auth/refresh_token`, {
    method: "DELETE",
  }).then((r) => r.json());
};
