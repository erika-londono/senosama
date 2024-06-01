"use client";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button/Button";
import Card from "@/components/Card";
import {
  getPatientTest,
  updatePatientTest,
} from "../api/patient/test-psicosocial/fetch";
import SearchUserForm from "@/components/SearchUserForm/SearchUserForm";
import Link from "@/components/Link/Link";

export default function DataPatient() {
  const [data, setData] = useState({});
  const [savedData, setSavedData] = useState();
  const [mode, setMode] = useState("search");

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e.target.value;
      return newState;
    });
  };

  const onSearch = async (e, formData) => {
    e.preventDefault();
    const response = await getPatientTest(
      formData.tipodocumento,
      formData.cedula
    );
    const responseData = await response.json();

    if (responseData.data) {
      setData((prevState) => ({ ...prevState, ...responseData.data }));
      setSavedData(JSON.stringify(responseData.data));
      setMode("update");
    } else {
      //NEW TEST FORM
      setMode("create");
      setData({ ...formData });
    }
  };

  const onConfirm = (e) => {
    e.preventDefault();
    setSavedData(JSON.stringify(data));
    //updatePatientTest(data);
    //HARDCODED ID. TODO: ADD INPUT IN FRONT
    updatePatientTest({ ...data, cedula: "6344408" });
  };

  const searchAgain = () => {
    setData({});
    setMode("search");
  };

  const isSearchMode = mode === "search";

  const enableButton = JSON.stringify(data) !== savedData;

  return (
    <main className={styles.main}>
      <Navbar form />
      <div className={styles.background}>
        <div
          className={`flex w-full items-center ${
            isSearchMode ? "justify-center" : "justify-between"
          } mb-5`}
        >
          <h3>TEST PSICOSOCIAL</h3>
          {/* <Button onClick={() => setMode("search")}>
              Consultar otro paciente
            </Button> */}
          {mode !== "search" && (
            <Link onClick={searchAgain}>Consultar otro paciente</Link>
          )}
        </div>
        {isSearchMode ? (
          <SearchUserForm onSubmit={onSearch} />
        ) : (
          <Card>
            <form
              className="flex w-full flex-col gap-6 justify-center items-center"
              onSubmit={onConfirm}
            >
              <InputField
                textarea
                id="info"
                label="¿Estás dispuesta a compartir información conmigo acerca de tu enfermedad?"
                value={data.dispuestaacompartir || ""}
                onChange={(e) => handleChange("dispuestaacompartir", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Qué piensa de la enfermedad que tiene?"
                value={data.quepiensa || ""}
                onChange={(e) => handleChange("quepiensa", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Cómo te has sentido en la última semana?"
                value={data.sentido || ""}
                onChange={(e) => handleChange("sentido", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Te has sentido triste, desganada e irritable por más de dos semanas?"
                value={data.sentidotriste || ""}
                onChange={(e) => handleChange("sentidotriste", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Has buscado ayuda de algún tipo?"
                value={data.buscadoayuda || ""}
                onChange={(e) => handleChange("buscadoayuda", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Consideras que yo te puedo colaborar de alguna manera?"
                value={data.consideras || ""}
                onChange={(e) => handleChange("consideras", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Quién es la persona que ha sido el mayor apoyo para ti?"
                value={data.apoyo || ""}
                onChange={(e) => handleChange("apoyo", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Cómo es tu relación con los miembros de tu familia?"
                value={data.relacionfamilia || ""}
                onChange={(e) => handleChange("relacionfamilia", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Algún recuerdo de la infancia que tienes más vivo?"
                value={data.infancia || ""}
                onChange={(e) => handleChange("infancia", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Cuáles factores estresantes existieron en tu vida durante los 6 meses previos al diagnóstico?"
                value={data.injusta || ""}
                onChange={(e) => handleChange("injusta", e)}
              />
              <InputField
                textarea
                id="info"
                label="¿Cuál es el pronóstico de tu enfermedad?"
                value={data.pronostico || ""}
                onChange={(e) => handleChange("pronostico", e)}
              />
              <Button disabled={!enableButton}>Guardar</Button>
            </form>
          </Card>
        )}
      </div>
    </main>
  );
}
