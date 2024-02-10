"use client";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import Card from "@/components/Card";
import SelectField from "@/components/SelectField";

export default function DataPatient() {
  const [data, setData] = useState({});
  const [savedData, setSavedData] = useState({});

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e.target.value;
      return newState;
    });
  };

  const onConfirm = (e) => {
    e.preventDefault();
    setSavedData(JSON.stringify(data));
    //TODO: send data to server
  };

  const enableButton = JSON.stringify(data) !== savedData;
  return (
    <main className={styles.main}>
      <Navbar form />
      <div className={styles.background}>
        <h3>DATOS DEL PACIENTE</h3>
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
                  { value: "CC", label: "Cedula de ciudadania" },
                  { value: "CE", label: "Cedula de extranjeria" },
                  { value: "P", label: "Pasaporte" },
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
                  { value: "1", label: "Activa" },
                  { value: "0", label: "Inactiva" },
                ]}
              />
              <InputField
                label="Fecha"
                value={data.date || ""}
                onChange={(e) => handleChange("date", e)}
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

              {/* <InputField
                label="Edad"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              /> */}
              <SelectField
                label="Sexo"
                value={data.sexo || ""}
                onChange={(e) => handleChange("sexo", e)}
                options={[
                  { value: "M", label: "Masculino" },
                  { value: "F", label: "Femenino" },
                ]}
              />
              <SelectField
                label="Estado civil"
                value={data.estadocivil || ""}
                onChange={(e) => handleChange("estadocivil", e)}
                options={[
                  { value: "S", label: "Soltero" },
                  { value: "C", label: "Casado" },
                  { value: "UL", label: "Union libre" },
                  { value: "D", label: "Divorciado" },
                  { value: "V", label: "Viudo" },
                ]}
              />
              <SelectField
                label="Nivel de escolaridad"
                value={data.escolaridad || ""}
                onChange={(e) => handleChange("escolaridad", e)}
                options={[
                  { value: "PI", label: "Primaria incompleta" },
                  { value: "PC", label: "Primaria completa" },
                  { value: "SI", label: "Secundaria incompleta" },
                  { value: "SC", label: "Secundaria completa" },
                  { value: "UI", label: "Universitaria incompleta" },
                  { value: "UC", label: "Universitaria completa" },
                  { value: "PI", label: "Posgrado incompleto" },
                  { value: "PC", label: "Posgrado completo" },
                  { value: "Tecnico", label: "Tecnico" },
                  { value: "Tecnnologia", label: "Tecnnologia" },
                ]}
              />
              <SelectField
                label="Ocupacion"
                value={data.ocupacion || ""}
                onChange={(e) => handleChange("ocupacion", e)}
                options={[
                  { value: "H", label: "Hogar" },
                  { value: "TI", label: "Trabajador independiente" },
                  { value: "TD", label: "Trabajador dependiente" },
                  { value: "P", label: "Pensionado" },
                  { value: "O", label: "Otro" },
                ]}
              />
              <SelectField
                label="Religion"
                value={data.religion || ""}
                onChange={(e) => handleChange("religion", e)}
                options={[
                  { value: "C", label: "Catolica" },
                  { value: "CR", label: "Cristiana" },
                  { value: "E", label: "Evangelica" },
                  { value: "TJ", label: "Testigo de Jehova" },
                  { value: "O", label: "Otro" },
                ]}
              />
              <SelectField
                label="Departamento"
                value={data.departamento || ""}
                onChange={(e) => handleChange("departamento", e)}
                options={[{ value: "C", label: "Integrar servicio" }]}
              />
              <SelectField
                label="Ciudad"
                value={data.municipio || ""}
                onChange={(e) => handleChange("municipio", e)}
                options={[{ value: "C", label: "Integrar servicio" }]}
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
                value={data.movil || ""}
                onChange={(e) => handleChange("movil", e)}
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
                  { value: "1", label: "Regimen especial" },
                  { value: "2", label: "Contributivo" },
                  { value: "3", label: "Subsidiado" },
                  { value: "4", label: "Poblacion pobre no asegurada" },
                ]}
              />
              <SelectField
                label="Tipo de cancer"
                value={data.cancer || ""}
                onChange={(e) => handleChange("cancer", e)}
                options={[
                  { value: "1", label: "Mama" },
                  { value: "2", label: "Utero" },
                  { value: "3", label: "Ovarios" },
                ]}
              />
              <InputField
                label="Año de diagnostico"
                value={data.diagnostico_año || ""}
                onChange={(e) => handleChange("diagnostico_año", e)}
              />
              <InputField
                label="Estado clinico"
                value={data.estado_clinico || ""}
                onChange={(e) => handleChange("estado_clinico", e)}
              />
              <InputField
                label="Tratamiento"
                value={data.dispuestaacompartir || ""}
                onChange={(e) => handleChange("dispuestaacompartir", e)}
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
              //className="w-full outline-none shadow-md bg-white text-gray-900 resize-none border-2 border-solid placeholder-gray-700 border-gray-400 focus:border-fuchsia-800 p-2 rounded-xl"
              label="Describa las necesidades encontradas y/o identificadas"
              value={data.quepiensa || ""}
              onChange={(e) => handleChange("quepiensa", e)}
            />
          </Card>
          <Button disabled={!enableButton}>Guardar </Button>
        </form>
      </div>
    </main>
  );
}
