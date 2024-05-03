//Create/update patient
import { createTursoClient } from "../util";

export async function POST(request) {
  const body = await request.json();

  //Incomplete fields
  if (!body.email || !body.password) {
    //Create
    return Response.json({
      message: `Se necesita usuario y contraseña`,
    });
  }

  const client = createTursoClient();
  const bdResponse = await client.execute({
    sql: "SELECT * FROM usuarios WHERE email = ?",
    args: [body.email],
  });

  if (
    bdResponse.rows.length === 1 &&
    body.password === bdResponse.rows[0].password
  ) {
    return Response.json({
      message: `Acceso correcto`,
      data: {
        ...bdResponse.rows[0],
      },
    });
  } else {
    //error
  }

  //Incorrect data
  return Response.json({
    message: `Usuario y/o contraseña incorrectos`,
  });
}
