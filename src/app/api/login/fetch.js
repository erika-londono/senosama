export async function login(data) {
  return await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
