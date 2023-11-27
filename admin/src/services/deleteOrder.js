export const deleteOrder = (target) => {
  return fetch(`http://127.0.0.1:8000/api/orders/${target.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((r) => r.json());
};
