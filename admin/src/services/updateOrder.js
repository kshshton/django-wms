const getUserIdByEmail = (email) => {
  return users.find((user) => user.email === email).id;
};

export const updateOrder = (updatedRow) => {
  return fetch(`http://127.0.0.1:8000/api/orders/${updatedRow.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      complete: updatedRow.complete,
      userId: getUserIdByEmail(updatedRow.userEmail),
    }),
  }).then((r) => r.json());
};
