const BACKEND_URL = "http://localhost:3000/api";

export async function getPatient(idType, id) {
  return await fetch(BACKEND_URL + `/patient?idType=${idType}&id=${id}`, {
    method: "GET",
  });
}

export async function savePatient(data) {
  return await fetch(BACKEND_URL + `/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
