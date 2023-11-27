export const putSector = (updatedRow) => {
  fetch(`http://127.0.0.1:8000/api/sectors/${updatedRow.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      name: updatedRow.name,
    }),
  }).then((r) => r.json());
};
