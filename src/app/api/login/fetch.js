const BACKEND_URL = "http://localhost:3000/api";

export async function login(data) {
  return await fetch(BACKEND_URL + `/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
