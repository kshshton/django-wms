export const getUsers = async () => {
  return await fetch("http://127.0.0.1:8000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((r) => r.json())
    .catch((_err) => console.error(_err));
};
