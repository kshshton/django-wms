export const updateProduct = (updatedRow) => {
  return fetch(`http://127.0.0.1:8000/api/products/${updatedRow.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      name: updatedRow.name,
      category: updatedRow.category,
      quantity: updatedRow.quantity,
      sectorName: updatedRow.sectorName,
    }),
  }).then((r) => r.json());
};
