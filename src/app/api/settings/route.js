//Create/update patient

import { createTursoClient } from "../util";

export async function GET(request) {
  //const body = await request.json();
  const client = createTursoClient();

  const cities = await client.execute("SELECT * FROM ciudades");
  const dep = await client.execute("SELECT * FROM departamentos");

  return Response.json({
    message: `Consulta exitosa`,
    data: {
      ciudades: cities.rows,
      departamentos: dep.rows,
    },
  });
}
