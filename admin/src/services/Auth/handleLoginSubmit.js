import { ApiManager } from "../ApiManager";

export const handleLoginSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  fetch(`${ApiManager.url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: data.get("email"),
      password: data.get("password"),
    }),
  })
    .then((r) => r.json())
    .then((item) => {
      localStorage.setItem("accessToken", item.tokens.accessToken);
      localStorage.setItem("refreshToken", item.tokens.refreshToken);
      localStorage.setItem("userId", item.userId);
    });
};
