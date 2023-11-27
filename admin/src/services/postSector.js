export const postSector = (id) => {
  return fetch("http://127.0.0.1:8000/api/sectors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      id,
    }),
  }).then((r) => r.json());
};
