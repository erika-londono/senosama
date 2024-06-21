"use client";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import Card from "@/components/Card";
import SelectField from "@/components/SelectField";
import { getPatient, savePatient, updatePatient } from "../api/patient/fetch";
import { AppStateContext } from "@/context/appStateProvider";
import withAuth from "@/HOC/withAuth";
import { getTracking, saveTracking } from "../api/patient/tracking/fetch";
import SearchUserForm from "@/components/SearchUserForm/SearchUserForm";
import Link from "@/components/Link/Link";
import TabSelector from "@/components/TabSelector/TabSelector";
import Loader from "@/components/Loader/Loader";
import TrackingCard from "@/components/TrackingCard/TrackingCard";

function DataPatient(props) {
  const [data, setData] = useState({ tipodocumento: "Cedula de ciudadania" });
  const [tracking, setTracking] = useState("");

  const [savedData, setSavedData] = useState();
  const [savedTrackingData, setSavedTrackingData] = useState("");

  const [trackingList, setTrackingList] = useState();

  const [mode, setMode] = useState("search");
  const [loading, setLoading] = useState(false);
  const [addTracking, setAddTracking] = useState(false);
  const [tabSelected, setTabSelected] = useState("Paciente");
  const { settings } = useContext(AppStateContext);

  useLayoutEffect(() => {
    const { mode, tipodocumento, cedula } = props.searchParams;
    if (mode) {
      setMode(mode);
      setData({ tipodocumento, cedula });
    }
  }, [props.searchParams]);

  const departamentList = settings?.departamentos?.map((dep) => ({
    value: dep.Departamento,
    label: dep.Departamento,
  }));

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e.target?.value || e;
      if (id === "departamento") {
        newState["municipio"] = "";
      }
      return newState;
    });
  };

  const citiesList = useMemo(() => {
    if (data.departamento) {
      const idDepartament = settings?.departamentos.find(
        (dep) => dep.Departamento === data.departamento
      )?.idDepartamento;
      return settings?.ciudades
        ?.filter((city) => city.idDepartamento === idDepartament)
        ?.map((city) => ({ value: city.Ciudad, label: city.Ciudad }));
    } else {
      return [{ value: "C", label: "Seleccionar departamento" }];
    }
  }, [data.departamento]);

  const onSearch = async (e, formData) => {
    e.preventDefault();
    const response = await getPatient(
      formData.tipodocumento,
      formData.cedula.trim()
    );
    const responseData = await response.json();
    if (responseData.data) {
      setData(responseData.data);
      setSavedData(JSON.stringify(responseData.data));
      setTabSelected("Paciente");
      setMode("update");
    } else {
      setMode("create");
      setData({ ...formData });
    }
  };

  const onConfirm = (e) => {
    e.preventDefault();
    setSavedData(JSON.stringify(data));
    mode === "create" ? savePatient(data) : updatePatient(data);
  };

  const onConfirmTracking = async (e) => {
    e.preventDefault();

    if (!addTracking) {
      setAddTracking(true);
      return;
    }
    setLoading(true);
    const payload = {
      nota: tracking,
      fecha: new Date(),
      cedula: data.cedula,
    };
    await saveTracking(payload);
    setSavedTrackingData(tracking);
    setAddTracking(false);
    setTracking("");
    setSavedTrackingData("");
    getTrackingData();
    setLoading(false);
  };

  const enableButton = JSON.stringify(data) !== savedData && data.cedula;

  const enableTrackingButton = tracking !== savedTrackingData;

  const getTrackingData = async () => {
    const response = await getTracking(data.tipodocumento, data.cedula);
    const responseData = await response.json();

    if (responseData?.data?.length) {
      setTrackingList(responseData.data.reverse());
    } else {
      setTrackingList([]);
      alert(`No se pudo encontrar seguimientos.`);
    }
  };

  useEffect(() => {
    if (tabSelected === "Seguimiento") {
      if (!trackingList) getTrackingData();
    } else {
      if (addTracking) setAddTracking(false);
    }
  }, [tabSelected]);

  const resetSearch = () => {
    setMode("search");
    setAddTracking(false);
    setTracking("");
    setSavedTrackingData("");
    setTrackingList();
    setData({});
  };

  return (
    <main className={styles.main}>
      <Navbar form />
      <div className={styles.background}>
        <div
          className={`flex w-full  ${
            mode === "search" ? "justify-center" : "justify-between"
          } mb-5`}
        >
          <div>
            <h3>
              {mode === "create" ? "ALTA DE PACIENTE" : "DATOS DEL PACIENTE"}
            </h3>
            {mode !== "search" && (
              <TabSelector
                options={[
                  "Paciente",
                  "Persona responsable",
                  "Información adicional",
                  "Seguimiento",
                ]}
                active={tabSelected}
                setActive={setTabSelected}
              />
            )}
          </div>
          {mode !== "search" && (
            <Link onClick={resetSearch}>Consultar otro paciente</Link>
          )}
        </div>

        {mode === "search" ? (
          <SearchUserForm onSubmit={onSearch} />
        ) : (
          <>
            {tabSelected !== "Seguimiento" && (
              <form
                className="flex flex-col gap-6 justify-center items-center w-full"
                onSubmit={onConfirm}
              >
                {tabSelected === "Paciente" && (
                  <Card>
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
                            value: "primaria: incompleta",
                            label: "Primaria incompleta",
                          },
                          {
                            value: "primaria: completa",
                            label: "Primaria completa",
                          },
                          {
                            value: "secundaria: incompleta",
                            label: "Secundaria incompleta",
                          },
                          {
                            value: "secundaria: completa",
                            label: "Secundaria completa",
                          },
                          {
                            value: "universitaria: incompleta",
                            label: "Universitaria incompleta",
                          },
                          {
                            value: "universitaria: completa",
                            label: "Universitaria completa",
                          },
                          {
                            value: "posgrado: incompleto",
                            label: "Posgrado incompleto",
                          },
                          {
                            value: "posgrado: completo",
                            label: "Posgrado completo",
                          },
                          { value: "tecnico", label: "Tecnico" },
                          { value: "tecnologia", label: "Tecnologia" },
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
                        value={data.asegurador || ""}
                        onChange={(e) => handleChange("asegurador", e)}
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
                          { value: "Nueva EPS", label: "Nueva EPS" },
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
                          {
                            value: "Regimen especial",
                            label: "Regimen especial",
                          },
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
                        value={data.tipodecancer || ""}
                        onChange={(e) => handleChange("tipodecancer", e)}
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
                )}
                {tabSelected === "Persona responsable" && (
                  <Card>
                    {/* <h3>Informacion de persona responsable</h3> */}
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
                )}
                {tabSelected === "Información adicional" && (
                  <Card>
                    <InputField
                      textarea
                      id="info"
                      label="Describa las necesidades encontradas y/o identificadas"
                      value={data.quepiensa || ""}
                      onChange={(e) => handleChange("quepiensa", e)}
                    />
                  </Card>
                )}
                <Button disabled={!enableButton}>
                  {mode === "create" ? "Guardar" : "Actualizar cambios"}
                </Button>
              </form>
            )}
            {tabSelected === "Seguimiento" && (
              <Fragment>
                <form
                  className="flex flex-col gap-6 justify-center items-center  w-full mb-5"
                  onSubmit={onConfirmTracking}
                >
                  <Card className="flex flex-col gap-3 p-5">
                    {addTracking && (
                      <div>
                        <InputField
                          textarea
                          id="info"
                          label="Ingrese aqui tus comentarios de seguimiento"
                          value={tracking || ""}
                          onChange={(e) => setTracking(e.target.value)}
                        />
                      </div>
                    )}
                    <Button
                      style={{ alignSelf: "center" }}
                      disabled={addTracking && !enableTrackingButton}
                      loading={loading}
                    >
                      {addTracking ? "Guardar" : "Añadir seguimiento"}
                    </Button>
                  </Card>
                </form>
                {trackingList ? (
                  <div className="flex flex-col w-full gap-4">
                    {trackingList.map((track) => (
                      <TrackingCard
                        key={track.idseguimiento}
                        data={track}
                        getTrackingData={getTrackingData}
                      />
                    ))}
                  </div>
                ) : (
                  <Loader />
                )}
              </Fragment>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default withAuth(DataPatient);
