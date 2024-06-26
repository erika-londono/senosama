export async function updatePatientTest(data) {
  return await fetch(
    process.env.BACKEND_URL + `/patient/test-psicosocial`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
}

export async function getPatientTest(idType, id) {
  return await fetch(process.env.BACKEND_URL + `/patient/test-psicosocial?idType=${idType}&id=${id}`, {
    method: "GET",
  });
}

