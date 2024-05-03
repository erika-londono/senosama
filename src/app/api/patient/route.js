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
    sql: "SELECT * FROM usuarios WHERE cedula = ?",
    args: [id],
  });

  console.log(bdResponse.rows);

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

//Create/update patient
export async function POST(request) {
  const body = await request.json();
  console.log(body);

  if (!body.id) {
    //Create
    return Response.json({
      message: `Usted solicito crear un paciente`,
    });
  }

  //Update
  return Response.json({
    message: `Usted solicito actualizar un paciente`,
  });
}
