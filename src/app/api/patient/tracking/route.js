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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({
      message: `Error: Usted solicito seguimiento del paciente sin informar su id`,
    });
  }

  const client = createTursoClient();

  const bdResponse = await client.execute({
    sql: "SELECT * FROM seguimiento WHERE cedula = ?",
    args: [id],
  });

  if (bdResponse.rows.length) {
    const data = bdResponse.rows;
    return Response.json({
      message: `Usted solicito el seguimiento del paciente ${id}`,
      data: data,
    });
  }

  return Response.json({
    message: `Usted solicito seguimiento del paciente ${id}, pero no existe`,
    data: null,
  });
}

export async function DELETE(request) {
  const body = await request.json();
  const client = createTursoClient();

  const bdResponse = await client.execute({
    sql: "DELETE FROM seguimiento WHERE idseguimiento = ?",
    args: [body.id],
  });

  if (bdResponse.rowsAffected) {
    return Response.json({
      message: `Usted solicito eliminar seguimiento ${body.id}`,
      error: false,
    });
  }

  return Response.json({
    message: `Usted solicito eliminar seguimiento ${body.id}, pero no existe`,
    error: true,
  });
}

export async function PUT(request) {
  const body = await request.json();
  const client = createTursoClient();
  const bdResponse = await client.execute({
    sql: "UPDATE seguimiento SET (idseguimiento, nota, fecha, cedula) = (?, ?, ?, ?) WHERE idseguimiento = ?",
    args: [
      body.idseguimiento,
      body.nota,
      body.fecha,
      body.cedula,
      body.idseguimiento,
    ],
  });

  let response = {
    message: `No se pudo actualizar el seguimiento ${body.idseguimiento}.`,
    error: true,
  };

  if (bdResponse.rowsAffected === 1) {
    response = {
      message: `Se actualizo el seguimiento ${body.idseguimiento} correctamente.`,
      error: false,
    };
  }

  return Response.json(response);
}
