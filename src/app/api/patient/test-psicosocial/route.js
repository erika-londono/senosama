import { createTursoClient } from "../../util";

export async function PUT(request) {
  const body = await request.json();
  const client = createTursoClient();

  const bdResponse = await client.execute({
    sql: "UPDATE formulario SET (dispuestaacompartir, quepiensa, sentido, sentidotriste, buscadoayuda, consideras, apoyo, relacionfamilia, infancia, injusta, pronostico) = (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE cedula = ?",
    args: [
      body.dispuestaacompartir,
      body.quepiensa,
      body.sentido,
      body.sentidotriste,
      body.buscadoayuda,
      body.consideras,
      body.apoyo,
      body.relacionfamilia,
      body.infancia,
      body.injusta,
      body.pronostico,
      body.cedula,
    ],
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({
      message: `Error: Usted solicito información del paciente sin informar su id`,
    });
  }

  const client = createTursoClient();

  const bdResponse = await client.execute({
    sql: "SELECT * FROM formulario WHERE cedula = ?",
    args: [id],
  });

  if (bdResponse.rows.length === 1) {
    const {
      quepiensa,
      sentido,
      sentidotriste,
      buscadoayuda,
      consideras,
      apoyo,
      relacionfamilia,
      infancia,
      injusta,
      pronostico,
      cedula,
    } = bdResponse.rows[0];

    return Response.json({
      message: `Usted solicito el test psicosocial del paciente ${id}`,
      data: {
        quepiensa,
        sentido,
        sentidotriste,
        buscadoayuda,
        consideras,
        apoyo,
        relacionfamilia,
        infancia,
        injusta,
        pronostico,
        cedula,
      },
    });
  }

  return Response.json({
    message: `Usted solicito el test psicosocial del paciente ${id}, el cual no existe`,
    data: null,
  });
}
