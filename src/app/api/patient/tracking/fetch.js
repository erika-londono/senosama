export async function saveTracking(data) {
  return await fetch(process.env.BACKEND_URL + `/patient/tracking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getTracking(idType, id) {
  return await fetch(
    process.env.BACKEND_URL + `/patient/tracking?idType=${idType}&id=${id}`,
    {
      method: "GET",
    }
  );
}

export async function deleteTracking(id) {
  return await fetch(process.env.BACKEND_URL + `/patient/tracking?`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

export async function updateTracking(data) {
  return await fetch(process.env.BACKEND_URL + `/patient/tracking?`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
