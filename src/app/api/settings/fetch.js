export async function getSettings() {
  return await fetch(process.env.BACKEND_URL + `/settings`, {
    method: "GET",
  });
}
