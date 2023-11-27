export const handleLoginSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  fetch("http://127.0.0.1:8000/api/auth/login", {
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
