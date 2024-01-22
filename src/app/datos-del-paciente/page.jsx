"use client";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import Card from "@/components/Card";

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
              <InputField
                label="Tipo de cedula"
                value={data.tipodocumento || ""}
                onChange={(e) => handleChange("tipodocumento", e)}
              />
              <InputField
                label="Cedula"
                value={data.cedula || ""}
                onChange={(e) => handleChange("cedula", e)}
                type="number"
              />
              <InputField
                label="Estado"
                value={data.status || ""}
                onChange={(e) => handleChange("status", e)}
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
              />
              <InputField
                label="Edad"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Sexo"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Estado civil"
                value={data.estadocivil || ""}
                onChange={(e) => handleChange("estadocivil", e)}
              />
              <InputField
                label="Nivel de escolaridad"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Ocupacion"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Religion"
                value={data.religion || ""}
                onChange={(e) => handleChange("religion", e)}
              />
              <InputField
                label="Departamento"
                value={data.departamento || ""}
                onChange={(e) => handleChange("departamento", e)}
              />
              <InputField
                label="Ciudad"
                value={data.municipio || ""}
                onChange={(e) => handleChange("municipio", e)}
              />
              <InputField
                label="Direccion"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Estrato"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Telefono/Celular"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Aseguradora"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Regimen"
                value={data.regimen || ""}
                onChange={(e) => handleChange("regimen", e)}
              />
              <InputField
                label="Tipo de cancer"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Año de diagnostico"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
              />
              <InputField
                label="Estado clinico"
                value={data.edad || ""}
                onChange={(e) => handleChange("edad", e)}
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
