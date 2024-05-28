import { createTursoClient } from "../../util";

export async function POST(request) {
  const body = await request.json();
  const client = createTursoClient();

  const bdResponse = await client.execute({
    sql: "INSERT INTO seguimiento (nota, fecha, cedula) VALUES (?, ?, ?)",
    args: [body.nota, body.fecha, body.cedula],
  });

  let response = {
    message: `No se pudo actualizar la informacion en el paciente ${body.cedula}.`,
    error: true,
  };

  if (bdResponse.rowsAffected === 1) {
    response = {
      message: `Se actualizo la informacion en el paciente ${body.cedula} correctamente.`,
      error: false,
    };
  }

  return Response.json(response);
}
