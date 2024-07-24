"use client";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import {
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
import TrackingSection from "@/components/TrackingSection/TrackingSection";
import getAge from "@/utils/age";
import { toast } from "react-toastify";
import ToastOptionsContainer from "@/components/ToastOptionsContainer/ToastOptionsContainer";

function DataPatient(props) {
  const [data, setData] = useState({ tipodocumento: "Cedula de ciudadania" });
  const [tracking, setTracking] = useState("");

  const [savedData, setSavedData] = useState();
  const [savedTrackingData, setSavedTrackingData] = useState("");

  const [trackingList, setTrackingList] = useState();
  const [cleanId, setCleanId] = useState(false);

  const [mode, setMode] = useState("search");
  const [loading, setLoading] = useState(false);
  const [addTracking, setAddTracking] = useState(false);
  const [tabSelected, setTabSelected] = useState("Paciente");
  const { settings } = useContext(AppStateContext);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const resetSearch = () => {
    setMode("search");
    setAddTracking(false);
    setTracking("");
    setSavedTrackingData("");
    setTrackingList();
    setData({});
  };

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e.target?.value ?? e;
      if (id === "departamento") {
        newState["municipio"] = "";
      }
      if (id === 'fecha_nac') {
        newState["existencia"] = (getAge(data.fecha_nac)).toString();
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

  const cleanIdInput = () => {
    setCleanId(true);
  };

  const onSearch = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
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
      toast.info("Paciente no encontrado", {
        className: styles.toastWithOptions,
        autoClose: 5000,
        closeButton: ({ closeToast }) => (
          <ToastOptionsContainer>
            <span
              onClick={() => {
                setMode("create");
                setData({ ...formData });
                closeToast();
              }}
            >
              Crear
            </span>
            <span
              onClick={() => {
                cleanIdInput();
                closeToast();
              }}
            >
              Cancelar
            </span>
          </ToastOptionsContainer>
        ),
      });
    }
    setLoading(false);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    if (!enableButton) {
      return;
    }
    setLoading(true);
    setSavedData(JSON.stringify(data));
    const response =
      mode === "create" ? await savePatient(data) : await updatePatient(data);
    const responseData = await response.json();
    alert(responseData?.message);
    if (mode === "create" && !responseData.error) {
      setMode("update");
      scrollTop();
    }
    setLoading(false);
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

    const response = await saveTracking(payload);
    const responseData = await response.json();
    if (response.status === 200 && !responseData.error) {
      toast.success("Seguimiento creado correctamente");
      setAddTracking(false);
      setTracking("");
      setSavedTrackingData("");
      getTrackingData();
    } else {
      toast.error("No se pudo crear");
    }

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
      toast.error("No se pudo encontrar seguimientos");
    }
  };

  useEffect(() => {
    if (tabSelected === "Seguimiento") {
      if (!trackingList) getTrackingData();
    } else {
      if (addTracking) setAddTracking(false);
    }
  }, [tabSelected]);

  const [years, setYears] = useState([]);

  const fillYear = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1980;
    const endYear = currentYear;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push({ value: year, label: year });
    }

    return years;
  };
  useEffect(() => {
    setYears(fillYear());
  }, []);
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
            <h3>DATOS DEL PACIENTE</h3>
            {mode === "update" && (
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
          <SearchUserForm
            loading={loading}
            onSubmit={onSearch}
            cleanId={cleanId}
            setCleanId={setCleanId}
          />
        ) : (
          <>
            {tabSelected !== "Seguimiento" && (
              <form
                className="flex flex-col gap-6 justify-center items-center w-full"
                onSubmit={onConfirm}
              >
                {(tabSelected === "Paciente" || mode === "create") && (
                  <Card>
                    <div
                      className={`flex flex-wrap gap-6 justify-center ${styles.inputContainer}`}
                    >
                      <SelectField
                        label="Tipo de cédula"
                        value={data.tipodocumento}
                        onChange={(e) => handleChange("tipodocumento", e)}
                        options={[
                          {
                            value: "Cédula",
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
                        label="Cédula"
                        value={data.cedula}
                        onChange={(e) => handleChange("cedula", e)}
                        type="number"
                      />
                      <InputField
                        label="Nombres"
                        value={data.nombre}
                        onChange={(e) => handleChange("nombre", e)}
                      />
                      <InputField
                        label="Apellidos"
                        value={data.apellidos}
                        onChange={(e) => handleChange("apellidos", e)}
                      />
                      <SelectField
                        label="Estado"
                        value={data.fallecidas}
                        onChange={(e) => handleChange("fallecidas", e)}
                        options={[
                          { value: "Activa", label: "Activa" },
                          { value: "Inactiva", label: "Inactiva" },
                        ]}
                      />
                      <InputField
                        label="Fecha de Ingreso"
                        value={data.fecha_ing}
                        onChange={(e) => handleChange("fecha_ing", e)}
                        type="date"
                        placeholder="dd/mm/aaaa"
                      />
                      <InputField
                        label="Email"
                        value={data.email}
                        onChange={(e) => handleChange("email", e)}
                      />
                      <InputField
                        label="Fecha de nacimiento"
                        value={data.fecha_nac}
                        onChange={(e) => handleChange("fecha_nac", e)}
                        type="date"
                        placeholder="dd/mm/aaaa"
                      />
                      <InputField
                        label="Edad"
                        value={getAge(data.fecha_nac) || ""}
                        readOnly
                      />
                      <SelectField
                        label="Sexo"
                        value={data.sexo}
                        onChange={(e) => handleChange("sexo", e)}
                        options={[
                          { value: "Femenino", label: "Femenino" },
                          { value: "Masculino", label: "Masculino" },
                        ]}
                      />
                      <SelectField
                        label="Estado civil"
                        value={data.estadocivil}
                        onChange={(e) => handleChange("estadocivil", e)}
                        options={[
                          { value: "Soltero(a)", label: "Soltero(a)" },
                          { value: "Casado(a)", label: "Casado(a)" },
                          { value: "Union libre", label: "Unión libre" },
                          { value: "Divorciado(a)", label: "Divorciado(a)" },
                          { value: "Viudo(a)", label: "Viudo(a)" },
                        ]}
                      />
                      <SelectField
                        label="Nivel de escolaridad"
                        value={data.escolaridad}
                        onChange={(e) => handleChange("escolaridad", e)}
                        options={[
                          {
                            value: "No estudio",
                            label: "No estudio",
                          },
                          {
                            value: "Primaria",
                            label: "Primaria",
                          },
                          {
                            value: "Secundaria",
                            label: "Secundaria",
                          },
                          {
                            value: "Universidad",
                            label: "Universidad",
                          },
                          {
                            value: "Posgrado",
                            label: "Posgrado",
                          },
                          {
                            value: "Técnico/Tecnología",
                            label: "Técnico/Tecnología",
                          },
                        ]}
                      />
                      <SelectField
                        label="Ocupación"
                        value={data.ocupacion}
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
                        label="Religión"
                        value={data.religion}
                        onChange={(e) => handleChange("religion", e)}
                        options={[
                          { value: "Catolica", label: "Católica" },
                          { value: "Cristiana", label: "Cristiana" },
                          { value: "Evangelica", label: "Evangélica" },
                          { value: "Adventista", label: "Adventista" },
                          {
                            value: "Testigo de Jehova",
                            label: "Testigo de Jehová",
                          },
                          { value: "Otro", label: "Otro" },
                        ]}
                      />
                      <SelectField
                        label="Departamento"
                        value={data.departamento}
                        onChange={(e) => handleChange("departamento", e)}
                        options={departamentList}
                      />
                      <SelectField
                        label="Ciudad"
                        value={data.municipio}
                        onChange={(e) => handleChange("municipio", e)}
                        options={citiesList}
                      />
                      <InputField
                        label="Dirección"
                        value={data.direccion}
                        onChange={(e) => handleChange("direccion", e)}
                      />
                      <SelectField
                        label="Estrato"
                        value={data.estrato}
                        onChange={(e) => handleChange("estrato", e)}
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                          { value: "4", label: "4" },
                          { value: "5", label: "5" },
                          { value: "6", label: "6" },
                          { value: "Rural", label: "Rural" },
                        ]}
                      />
                      <InputField
                        label="Teléfono/Celular"
                        value={data.telefono}
                        onChange={(e) => handleChange("telefono", e)}
                        type="number"
                      />
                      <SelectField
                        label="Aseguradora"
                        value={data.asegurador}
                        onChange={(e) => handleChange("asegurador", e)}
                        options={[
                          // { value: "Asmetsalud", label: "Asmetsalud" },
                          // { value: "Colpatria", label: "Colpatria" },
                          // { value: "Medimás", label: "Medimás" },
                          // { value: "Emdisalud", label: " Emdisalud" },
                          // { value: "Mutualser", label: "Mutualser" },
                          // { value: "SaludVida", label: " SaludVida" },
                          // { value: "Coomeva", label: "Coomeva" },
                          { value: "Comparta", label: "Comparta" },
                          { value: "Coosalud", label: "Coosalud" },
                          { value: "Ecopetrol", label: "Ecopetrol" },
                          { value: "Ejército", label: "Ejército" },
                          { value: "Famisanar", label: "Famisanar" },
                          { value: "Magisterio", label: "Magisterio" },
                          { value: "Nueva EPS", label: "Nueva EPS" },
                          { value: "SaludMía", label: "SaludMía" },
                          { value: "Sanitas", label: " Sanitas" },
                          { value: "Suramericana", label: " Suramericana" },
                          { value: "Saludtotal", label: "  Saludtotal" },
                          { value: "Otro", label: " Otro" },
                        ]}
                      />
                      <SelectField
                        label="Régimen"
                        value={data.regimen}
                        onChange={(e) => handleChange("regimen", e)}
                        options={[
                          {
                            value: "Regimen especial",
                            label: "Régimen especial",
                          },
                          { value: "Contributivo", label: "Contributivo" },
                          { value: "Subsidiado", label: "Subsidiado" },
                          {
                            value: "Poblacion pobre no asegurada",
                            label: "Población no asegurada",
                          },
                        ]}
                      />
                      <SelectField
                        label="Tipo de cáncer"
                        value={data.tipodecancer}
                        onChange={(e) => handleChange("tipodecancer", e)}
                        options={[
                          { value: "Mama", label: "Mama" },
                          { value: "Utero", label: "Útero" },
                          { value: "Ovarios", label: "Ovario" },
                          { value: "Cuello uterino", label: "Cuello uterino" },
                        ]}
                      />

                      <SelectField
                        label="Año de diagnóstico"
                        type="number"
                        id="year"
                        name="year"
                        options={years}
                        value={data.tiempo}
                        onChange={(e) => handleChange("tiempo", e)}
                      />
                      <SelectField
                        label="Estadio clínico"
                        value={data.estadioclinico}
                        onChange={(e) => handleChange("estadioclinico", e)}
                        options={[
                          { value: "1", label: "I" },
                          { value: "2", label: "II" },
                          { value: "3", label: "III" },
                          { value: "4", label: "IV" },
                        ]}
                      />
                      <SelectField
                        label="Tratamiento"
                        value={data.tratamiento}
                        onChange={(e) => handleChange("tratamiento", e)}
                        options={[
                          { value: "Quimioterapia", label: "Quimioterapia" },
                          { value: "Radioterapia", label: "Radioterapia" },
                          {
                            value: "Terapia neoadyuvante",
                            label: "Terapia neoadyuvante",
                          },
                          { value: "Controles", label: "Controles" },
                        ]}
                      />
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </Card>
                )}
                {(tabSelected === "Persona responsable" ||
                  mode === "create") && (
                  <Card>
                    {/* <h3>Informacion de persona responsable</h3> */}
                    <div
                      className={`flex flex-wrap gap-6 justify-center ${styles.inputContainer}`}
                    >
                      <InputField
                        label="Nombre completo"
                        value={data.personaresponsable}
                        onChange={(e) => handleChange("personaresponsable", e)}
                      />
                      <InputField
                        label="Parentesco"
                        value={data.parentesco}
                        onChange={(e) => handleChange("parentesco", e)}
                      />
                      <InputField
                        label="Teléfono/Celular"
                        value={data.telefonop}
                        onChange={(e) => handleChange("telefonop", e)}
                        type="number"
                      />
                      <div></div>
                    </div>
                  </Card>
                )}
                {(tabSelected === "Información adicional" ||
                  mode === "create") && (
                  <Card>
                    <InputField
                      textarea
                      id="info"
                      label="Describa las necesidades encontradas y/o identificadas"
                      value={data.quepiensa}
                      onChange={(e) => handleChange("quepiensa", e)}
                    />
                  </Card>
                )}
                <Button loading={loading} disabled={!enableButton}>
                  {mode === "create" ? "Guardar" : "Actualizar cambios"}
                </Button>
              </form>
            )}
            <TrackingSection
              show={tabSelected === "Seguimiento"}
              onConfirmTracking={onConfirmTracking}
              addTracking={addTracking}
              tracking={tracking}
              setTracking={setTracking}
              loading={loading}
              trackingList={trackingList}
              getTrackingData={getTrackingData}
              enableTrackingButton={enableTrackingButton}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default withAuth(DataPatient);
