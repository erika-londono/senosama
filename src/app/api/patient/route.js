import { createTursoClient } from "../util";

//Get patient
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({
      message: `Error: Usted solicito información del paciente sin inforam su id`,
    });
  }

  const client = createTursoClient();

  const bdResponse = await client.execute({
    sql: "SELECT * FROM formulario WHERE cedula = ?",
    args: [id],
  });

  if (bdResponse.rows.length === 1) {
    return Response.json({
      message: `Usted solicito información del paciente ${id}`,
      data: { ...bdResponse.rows[0] },
    });
  }

  if (id === "10101010") {
    return Response.json({
      message: `Usted solicito información del paciente ${id}`,
      data: {
        tipodocumento: "CC",
        cedula: "10101010",
        status: "1",
        date: "191812",
        nombre: "Franco",
        apellidos: "Gonzalez",
        email: "fgonzalez@gmail.com.ar",
        fecha_nac: "1985-10-10",
        sexo: "M",
        estadocivil: "S",
        escolaridad: "PC",
        ocupacion: "TD",
        religion: "CR",
        departamento: "C",
        municipio: "C",
        direccion: "Av Incas 123",
        estrato: "Avellaneda",
        movil: "125478547",
        aseguradora: "Colpatria",
        regimen: "1",
        cancer: "1",
        diagnostico_año: "1990",
        estado_clinico: "Test",
        dispuestaacompartir: "Intensivo",
        personaresponsable: "Moura",
        parentesco: "Padre",
        telefonop: "222245454",
        quepiensa: "Usuario dummy",
      },
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
  const bdResponse = await client.execute({
    sql: "INSERT INTO formulario (tipodocumento, cedula, nombre, apellidos, fecha_nac, existencia, estadocivil, escolaridad, ocupacion, sicontesto1o2, pension, religion, departamento, municipio, direccion, telefono, asegurador, regimen, tipodecancer, estadioclinico, tratamiento, personaresponsable, parentesco, telefonop, necesidadesencontradas, date_seguimiento, relacionfamilia, dispuestaacompartir, infancia, sentido, buscadoayuda, consideras, sentidotriste, apoyo, injusta, pronostico, email, estrato, tiempo, quepiensa, fallecidas, fecha_ing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
    sql: "UPDATE formulario SET (tipodocumento, cedula, nombre, apellidos, fecha_nac, existencia, estadocivil, escolaridad, ocupacion, sicontesto1o2, pension, religion, departamento, municipio, direccion, telefono, asegurador, regimen, tipodecancer, estadioclinico, tratamiento, personaresponsable, parentesco, telefonop, necesidadesencontradas, date_seguimiento, relacionfamilia, dispuestaacompartir, infancia, sentido, buscadoayuda, consideras, sentidotriste, apoyo, injusta, pronostico, email, estrato, tiempo, quepiensa, fallecidas, fecha_ing) = (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE cedula = ?",
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
