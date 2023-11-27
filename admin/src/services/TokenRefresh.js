import { ApiManager } from "./ApiManager";

export const tokenRefresh = () => {
  fetch(`${ApiManager.url}/auth/refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem("refreshToken"),
    }),
  })
    .then((r) => r.json())
    .then((item) => {
      localStorage.setItem("accessToken", item.accessToken);
      localStorage.setItem("refreshToken", item.refreshToken);
    })
    .catch();
};
