import { ApiManager } from "./ApiManager";

export const updateSector = (updatedRow) => {
  fetch(`${ApiManager.url}/sectors/${updatedRow.id}`, {
    method: "PUT",
    headers: ApiManager.headers,
    body: JSON.stringify({
      name: updatedRow.name,
    }),
  }).then((r) => r.json());
};
