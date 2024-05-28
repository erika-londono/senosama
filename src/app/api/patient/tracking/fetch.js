export async function saveTracking(data) {
  return await fetch(
    process.env.BACKEND_URL + `/patient/tracking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
}
