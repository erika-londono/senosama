"use client";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import { useContext, useMemo, useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import Card from "@/components/Card";
import SelectField from "@/components/SelectField";
import { getPatient, savePatient, updatePatient } from "../api/patient/fetch";
import { AppStateContext } from "@/context/appStateProvider";
import withAuth from "@/HOC/withAuth";
import { saveTracking } from "../api/patient/tracking/fetch";

function DataPatient() {
  const [data, setData] = useState({ tipodocumento: "Cedula de ciudadania" });
  const [tracking, setTracking] = useState("");
  const [savedData, setSavedData] = useState({});
  const [savedTrackingData, setSavedTrackingData] = useState("");
  const [mode, setMode] = useState("search");
  const { settings } = useContext(AppStateContext);

  const departamentList = settings?.departamentos?.map((dep) => ({
    value: dep.idDepartamento,
    label: dep.Departamento,
  }));

  const citiesList = useMemo(() => {
    if (data.departamento) {
      return settings?.ciudades
        ?.filter((city) => city.idDepartamento === +data.departamento)
        ?.map((city) => ({ value: city.idCiudad, label: city.Ciudad }));
    } else {
      return [{ value: "C", label: "Seleccionar departamento" }];
    }
  }, [data.departamento]);

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e.target.value;
      return newState;
    });
  };

  const onSearch = async (e) => {
    e.preventDefault();
    const response = await getPatient(data.tipodocumento, data.cedula.trim());
    const responseData = await response.json();

    if (responseData.data) {
      setData(responseData.data);
      setSavedData(JSON.stringify(responseData.data));
      setMode("update");
    } else {
      setMode("create");
    }
  };
  const onConfirm = (e) => {
    e.preventDefault();
    setSavedData(JSON.stringify(data));
    mode === "create" ? savePatient(data) : updatePatient(data);
  };

  const onConfirmTracking = (e) => {
    e.preventDefault();
    const payload = {
      nota: tracking,
      fecha: new Date(),
      cedula: data.cedula,
    };
    setSavedTrackingData(tracking);
    saveTracking(payload);
  };

  const enableButton = JSON.stringify(data) !== savedData;
  const enableTrackingButton = tracking !== savedTrackingData;

  const searchForm = (
    <form
      className="flex flex-col gap-6 justify-center items-center"
      onSubmit={onSearch}
    >
      <Card>
        <h3>Busqueda de paciente</h3>
        <div
          className={`flex flex-wrap gap-6 justify-center ${styles.inputContainer}`}
        >
          <SelectField
            label="Tipo de cedula"
            defaultValue="Cedula de ciudadania"
            value={data.tipodocumento || "Cedula de ciudadania"}
            onChange={(e) => handleChange("tipodocumento", e)}
            options={[
              { value: "Cedula de ciudadania", label: "Cedula de ciudadania" },
              {
                value: "Cedula de extranjeria",
                label: "Cedula de extranjeria",
              },
              { value: "Pasaporte", label: "Pasaporte" },
            ]}
          />
          <InputField
            label="Cedula"
            value={data.cedula || 6344408}
            onChange={(e) => handleChange("cedula", e)}
            type="number"
          />
        </div>
        <footer className={`flex justify-center mt-8`}>
          <Button disabled={!data.cedula || !data.tipodocumento}>
            Consultar
          </Button>
        </footer>
      </Card>
    </form>
  );

  return (
    <main className={styles.main}>
      <Navbar form />
      <div className={styles.background}>
        <h3>{mode === "create" ? "ALTA DE PACIENTE" : "DATOS DEL PACIENTE"}</h3>
        {mode === "search" ? (
          searchForm
        ) : (
          <>
            <form
              className="flex flex-col gap-6 justify-center items-center"
              onSubmit={onConfirm}
            >
              <Card>
                <h3>Informacion del paciente</h3>
                <div
                  className={`flex flex-wrap gap-6 justify-center ${styles.inputContainer}`}
                >
                  <SelectField
                    label="Tipo de cedula"
                    value={data.tipodocumento || ""}
                    onChange={(e) => handleChange("tipodocumento", e)}
                    options={[
                      {
                        value: "Cedula de ciudadania",
                        label: "Cédula de ciudadanía",
                      },
                      {
                        value: "Cedula de extranjeria",
                        label: "Cédula de extranjería",
                      },
                      { value: "Pasaporte", label: "Pasaporte" },
                    ]}
                  />
                  <InputField
                    label="Cedula"
                    value={data.cedula || ""}
                    onChange={(e) => handleChange("cedula", e)}
                    type="number"
                  />
                  <SelectField
                    label="Estado"
                    value={data.status || ""}
                    onChange={(e) => handleChange("status", e)}
                    options={[
                      { value: "Activa", label: "Activa" },
                      { value: "Inactiva", label: "Inactiva" },
                    ]}
                  />
                  <InputField
                    label="Fecha de Ingreso"
                    value={data.fecha_ing || ""}
                    onChange={(e) => handleChange("fecha_ing", e)}
                  />
                  <InputField
                    label="Nombres"
                    value={data.nombre || ""}
                    onChange={(e) => handleChange("nombre", e)}
                  />
                  <InputField
                    label="Apellidos"
                    value={data.apellidos || ""}
                    onChange={(e) => handleChange("apellidos", e)}
                  />
                  <InputField
                    label="Email"
                    value={data.email || ""}
                    onChange={(e) => handleChange("email", e)}
                  />
                  <InputField
                    label="Fecha de nacimiento"
                    value={data.fecha_nac || ""}
                    onChange={(e) => handleChange("fecha_nac", e)}
                    type="date"
                    placeholder="dd/mm/aaaa"
                  />
                  <SelectField
                    label="Sexo"
                    value={data.sexo || ""}
                    onChange={(e) => handleChange("sexo", e)}
                    options={[
                      { value: "Masculino", label: "Masculino" },
                      { value: "Femenino", label: "Femenino" },
                    ]}
                  />
                  <SelectField
                    label="Estado civil"
                    value={data.estadocivil || ""}
                    onChange={(e) => handleChange("estadocivil", e)}
                    options={[
                      { value: "Soltero(a)", label: "Soltero(a)" },
                      { value: "Casado(a)", label: "Casado(a)" },
                      { value: "Union libre", label: "Union libre" },
                      { value: "Divorciado(a)", label: "Divorciado(a)" },
                      { value: "Viudo(a)", label: "Viudo(a)" },
                    ]}
                  />
                  <SelectField
                    label="Nivel de escolaridad"
                    value={data.escolaridad || ""}
                    onChange={(e) => handleChange("escolaridad", e)}
                    options={[
                      {
                        value: "Primaria incompleta",
                        label: "Primaria incompleta",
                      },
                      {
                        value: "Primaria completa",
                        label: "Primaria completa",
                      },
                      {
                        value: "Secundaria incompleta",
                        label: "Secundaria incompleta",
                      },
                      {
                        value: "Secundaria completa",
                        label: "Secundaria completa",
                      },
                      {
                        value: "Universitaria incompleta",
                        label: "Universitaria incompleta",
                      },
                      {
                        value: "Universitaria completa",
                        label: "Universitaria completa",
                      },
                      {
                        value: "Posgrado incompleto",
                        label: "Posgrado incompleto",
                      },
                      {
                        value: "Posgrado completo",
                        label: "Posgrado completo",
                      },
                      { value: "Tecnico", label: "Tecnico" },
                      { value: "Tecnologia", label: "Tecnologia" },
                    ]}
                  />
                  <SelectField
                    label="Ocupacion"
                    value={data.ocupacion || ""}
                    onChange={(e) => handleChange("ocupacion", e)}
                    options={[
                      { value: "Hogar", label: "Hogar" },
                      {
                        value: "Trabajador independiente",
                        label: "Trabajador independiente",
                      },
                      {
                        value: "Trabajador dependiente",
                        label: "Trabajador dependiente",
                      },
                      { value: "Pensionado", label: "Pensionado" },
                      { value: "Otro", label: "Otro" },
                    ]}
                  />
                  <SelectField
                    label="Religion"
                    value={data.religion || ""}
                    onChange={(e) => handleChange("religion", e)}
                    options={[
                      { value: "Catolica", label: "Catolica" },
                      { value: "Cristiana", label: "Cristiana" },
                      { value: "Evangelica", label: "Evangelica" },
                      {
                        value: "Testigo de Jehova",
                        label: "Testigo de Jehova",
                      },
                      { value: "Otro", label: "Otro" },
                    ]}
                  />
                  <SelectField
                    label="Departamento"
                    value={data.departamento || ""}
                    onChange={(e) => handleChange("departamento", e)}
                    options={departamentList}
                  />
                  <SelectField
                    label="Ciudad"
                    value={data.municipio || ""}
                    onChange={(e) => handleChange("municipio", e)}
                    options={citiesList}
                  />
                  <InputField
                    label="Direccion"
                    value={data.direccion || ""}
                    onChange={(e) => handleChange("direccion", e)}
                  />
                  <InputField
                    label="Estrato"
                    value={data.estrato || ""}
                    onChange={(e) => handleChange("estrato", e)}
                  />
                  <InputField
                    label="Telefono/Celular"
                    value={data.telefono || ""}
                    onChange={(e) => handleChange("telefono", e)}
                    type="number"
                  />
                  <SelectField
                    label="Aseguradora"
                    value={data.aseguradora || ""}
                    onChange={(e) => handleChange("aseguradora", e)}
                    options={[
                      { value: "Asmetsalud", label: "Asmetsalud" },
                      { value: "Colpatria", label: "Colpatria" },
                      { value: "Comparta", label: "Comparta" },
                      { value: "Coomeva", label: "Coomeva" },
                      { value: "Coosalud", label: "Coosalud" },
                      { value: "Ecopetrol", label: "Ecopetrol" },
                      { value: "Ejército", label: "Ejército" },
                      { value: "Emdisalud", label: " Emdisalud" },
                      { value: "Famisanar", label: "Famisanar" },
                      { value: "Magisterio", label: "Magisterio" },
                      { value: "Medimás", label: "Medimás" },
                      { value: "Mutualser", label: "Mutualser" },
                      { value: "Nueva", label: "Nueva" },
                      { value: "EPS", label: "EPS" },
                      { value: "SaludMía", label: "SaludMía" },
                      { value: "SaludVida", label: " SaludVida" },
                      { value: "Sanitas", label: " Sanitas" },
                      { value: "Suramericana", label: " Suramericana" },
                      { value: "Saludtotal", label: "  Saludtotal" },
                      { value: "Otro", label: " Otro" },
                    ]}
                  />
                  <SelectField
                    label="Regimen"
                    value={data.regimen || ""}
                    onChange={(e) => handleChange("regimen", e)}
                    options={[
                      { value: "Regimen especial", label: "Regimen especial" },
                      { value: "Contributivo", label: "Contributivo" },
                      { value: "Subsidiado", label: "Subsidiado" },
                      {
                        value: "Poblacion pobre no asegurada",
                        label: "Población pobre no asegurada",
                      },
                    ]}
                  />
                  <SelectField
                    label="Tipo de cancer"
                    value={data.cancer || ""}
                    onChange={(e) => handleChange("cancer", e)}
                    options={[
                      { value: "Mama", label: "Mama" },
                      { value: "Utero", label: "Utero" },
                      { value: "Ovarios", label: "Ovarios" },
                    ]}
                  />
                  <InputField
                    label="Año de diagnostico"
                    value={data.tiempo || ""}
                    onChange={(e) => handleChange("tiempo", e)}
                  />
                  <InputField
                    label="Estadio clinico"
                    value={data.estadioclinico || ""}
                    onChange={(e) => handleChange("estado_clinico", e)}
                  />
                  <InputField
                    label="Tratamiento"
                    value={data.tratamiento || ""}
                    onChange={(e) => handleChange("tratamiento", e)}
                  />

                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Card>
              <Card>
                <h3>Informacion de persona responsable</h3>
                <div
                  className={`flex flex-wrap gap-6 justify-center ${styles.inputContainer}`}
                >
                  <InputField
                    label="Nombre completo"
                    value={data.personaresponsable || ""}
                    onChange={(e) => handleChange("personaresponsable", e)}
                  />
                  <InputField
                    label="Parentesco"
                    value={data.parentesco || ""}
                    onChange={(e) => handleChange("parentesco", e)}
                  />
                  <InputField
                    label="Telefono/Celular"
                    value={data.telefonop || ""}
                    onChange={(e) => handleChange("telefonop", e)}
                    type="number"
                  />
                  <div></div>
                </div>
              </Card>
              <Card>
                <h3>Informacion adicional</h3>
                <InputField
                  textarea
                  id="info"
                  label="Describa las necesidades encontradas y/o identificadas"
                  value={data.quepiensa || ""}
                  onChange={(e) => handleChange("quepiensa", e)}
                />
              </Card>
              <Button disabled={!enableButton}>
                {mode === "create" ? "Guardar" : "Actualizar cambios"}
              </Button>
            </form>
            <form
              className="flex flex-col gap-6 justify-center items-center mt-10 w-full"
              onSubmit={onConfirmTracking}
            >
              <Card>
                <h3>Seguimiento</h3>
                <InputField
                  textarea
                  id="info"
                  label="Ingrese aqui tus comentarios de seguimiento"
                  value={tracking || ""}
                  onChange={(e) => setTracking(e.target.value)}
                />
              </Card>
              <Button disabled={!enableTrackingButton}>Guardar</Button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

export default withAuth(DataPatient);
