export const handleRegisterSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  fetch("http://127.0.0.1:8000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    }),
  }).then((r) => r.json());
};
