import { createTursoClient } from "../util";

//Get patient
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

  if (bdResponse.rows.length > 0) {
    return Response.json({
      message: `Usted solicito información del paciente ${id}`,
      data: { ...bdResponse.rows[0] },
    });
  }

  return Response.json({
    message: `Usted solicito información del paciente ${id}, el cual no existe`,
    data: null,
  });
}

export async function POST(request) {
  const body = await request.json();
  const client = createTursoClient();

  const checkBdResponse = await client.execute({
    sql: "SELECT * FROM formulario WHERE cedula = ?",
    args: [body.cedula],
  });

  if (checkBdResponse.rows.length > 0) {
    return Response.json({
      message: `El paciente ${body.cedula} ya existe.`,
      data: null,
    });
  }

  const bdResponse = await client.execute({
    sql: "INSERT INTO formulario (tipodocumento, cedula, nombre, apellidos, fecha_nac, existencia, estadocivil, escolaridad, ocupacion, sicontesto1o2, pension, religion, departamento, municipio, direccion, telefono, asegurador, regimen, tipodecancer, observacionesestadioclinico, estadioclinico, tratamiento, personaresponsable, parentesco, telefonop, necesidadesencontradas, date_seguimiento, relacionfamilia, dispuestaacompartir, infancia, sentido, buscadoayuda, consideras, sentidotriste, apoyo, injusta, pronostico, email, estrato, tiempo, quepiensa, fallecidas, fecha_ing, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [
      body.tipodocumento || "",
      body.cedula || "",
      body.nombre || "",
      body.apellidos || "",
      body.fecha_nac || "",
      body.existencia || "",
      body.estadocivil || "",
      body.escolaridad || "",
      body.ocupacion || "",
      body.sicontesto1o2 || "",
      body.pension || "",
      body.religion || "",
      body.departamento || "",
      body.municipio || "",
      body.direccion || "",
      body.telefono || "",
      body.asegurador || "",
      body.regimen || "",
      body.tipodecancer || "",
      body.observacionesestadioclinico || "",
      body.estadioclinico || "",
      body.tratamiento || "",
      body.personaresponsable || "",
      body.parentesco || "",
      body.telefonop || "",
      body.necesidadesencontradas || "",
      body.date_seguimiento || "",
      body.relacionfamilia || "",
      body.dispuestaacompartir || "",
      body.infancia || "",
      body.sentido || "",
      body.buscadoayuda || "",
      body.consideras || "",
      body.sentidotriste || "",
      body.apoyo || "",
      body.injusta || "",
      body.pronostico || "",
      body.email || "",
      body.estrato || "",
      body.tiempo || "",
      body.quepiensa || "",
      body.fallecidas || "",
      body.fecha_ing || "",
      body.sexo || "",
    ],
  });

  let response = {
    message: `No se pudo crear el paciente ${body.cedula}.`,
    error: true,
  };

  if (bdResponse.rowsAffected === 1) {
    response = {
      message: `Se creo el paciente ${body.cedula} correctamente.`,
      error: false,
    };
  }

  return Response.json(response);
}

export async function PUT(request) {
  const body = await request.json();
  const client = createTursoClient();
  const bdResponse = await client.execute({
    sql: "UPDATE formulario SET (tipodocumento, cedula, nombre, apellidos, fecha_nac, existencia, estadocivil, escolaridad, ocupacion, sicontesto1o2, pension, religion, departamento, municipio, direccion, telefono, asegurador, regimen, tipodecancer, observacionesestadioclinico, estadioclinico, tratamiento, personaresponsable, parentesco, telefonop, necesidadesencontradas, date_seguimiento, relacionfamilia, dispuestaacompartir, infancia, sentido, buscadoayuda, consideras, sentidotriste, apoyo, injusta, pronostico, email, estrato, tiempo, quepiensa, fallecidas, fecha_ing, sexo) = (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE cedula = ?",
    args: [
      body.tipodocumento,
      body.cedula,
      body.nombre,
      body.apellidos,
      body.fecha_nac,
      body.existencia,
      body.estadocivil,
      body.escolaridad,
      body.ocupacion,
      body.sicontesto1o2,
      body.pension,
      body.religion,
      body.departamento,
      body.municipio,
      body.direccion,
      body.telefono,
      body.asegurador,
      body.regimen,
      body.tipodecancer,
      body.observacionesestadioclinico,
      body.estadioclinico,
      body.tratamiento,
      body.personaresponsable,
      body.parentesco,
      body.telefonop,
      body.necesidadesencontradas,
      body.date_seguimiento,
      body.relacionfamilia,
      body.dispuestaacompartir,
      body.infancia,
      body.sentido,
      body.buscadoayuda,
      body.consideras,
      body.sentidotriste,
      body.apoyo,
      body.injusta,
      body.pronostico,
      body.email,
      body.estrato,
      body.tiempo,
      body.quepiensa,
      body.fallecidas,
      body.fecha_ing,
      body.sexo,
      body.cedula,
    ],
  });

  let response = {
    message: `No se pudo actualizar el paciente ${body.cedula}.`,
    error: true,
  };

  if (bdResponse.rowsAffected === 1) {
    response = {
      message: `Se actualizo el paciente ${body.cedula} correctamente.`,
      error: false,
    };
  }

  return Response.json(response);
}
