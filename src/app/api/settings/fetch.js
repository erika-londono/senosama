const BACKEND_URL = "http://localhost:3000/api";

export async function getSettings() {
  return await fetch(BACKEND_URL + `/settings`, {
    method: "GET",
  });
}
