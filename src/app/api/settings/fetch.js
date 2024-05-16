
export async function getSettings() {
  return await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/settings`, {
    method: "GET",
  });
}
