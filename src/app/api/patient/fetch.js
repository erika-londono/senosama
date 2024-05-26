
export async function getPatient(idType, id) {
  return await fetch(process.env.BACKEND_URL + `/patient?idType=${idType}&id=${id}`, {
    method: "GET",
  });
}

export async function savePatient(data) {
  return await fetch(process.env.BACKEND_URL + `/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updatePatient(data) {
  return await fetch(process.env.BACKEND_URL + `/patient`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
