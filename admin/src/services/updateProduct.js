import { ApiManager } from "./ApiManager";

export const updateProduct = (updatedRow) => {
  return fetch(`${ApiManager.url}/products/${updatedRow.id}`, {
    method: "PUT",
    headers: ApiManager.headers,
    body: JSON.stringify({
      name: updatedRow.name,
      category: updatedRow.category,
      quantity: updatedRow.quantity,
      sectorName: updatedRow.sectorName,
    }),
  }).then((r) => r.json());
};
