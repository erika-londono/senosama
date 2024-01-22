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
        <Card>
          <form
            className="flex w-full flex-col gap-6 justify-center items-center"
            onSubmit={onConfirm}
          >
            <h3>TEST PSICOSOCIAL</h3>
            <InputField
              textarea
              id="info"
              label="¿Estás dispuesta a compartir información conmigo acerca de tu enfermedad?"
              value={data.question1 || ""}
              onChange={(e) => handleChange("question1", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Qué piensa de la enfermedad que tiene?"
              value={data.question2 || ""}
              onChange={(e) => handleChange("question2", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Cómo te has sentido en la última semana?"
              value={data.question3 || ""}
              onChange={(e) => handleChange("question3", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Te has sentido triste, desganada e irritable por más de dos semanas?"
              value={data.question4 || ""}
              onChange={(e) => handleChange("question4", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Has buscado ayuda de algún tipo?"
              value={data.question5 || ""}
              onChange={(e) => handleChange("question5", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Consideras que yo te puedo colaborar de alguna manera?"
              value={data.question6 || ""}
              onChange={(e) => handleChange("question6", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Quién es la persona que ha sido el mayor apoyo para ti?"
              value={data.question7 || ""}
              onChange={(e) => handleChange("question7", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Cómo es tu relación con los miembros de tu familia?"
              value={data.question8 || ""}
              onChange={(e) => handleChange("question8", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Algún recuerdo de la infancia que tienes más vivo?"
              value={data.question9 || ""}
              onChange={(e) => handleChange("question9", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Cuáles factores estresantes existieron en tu vida durante los 6 meses previos al diagnóstico?"
              value={data.question10 || ""}
              onChange={(e) => handleChange("question10", e)}
            />
            <InputField
              textarea
              id="info"
              label="¿Cuál es el pronóstico de tu enfermedad?"
              value={data.question11 || ""}
              onChange={(e) => handleChange("question11", e)}
            />
            <Button disabled={!enableButton}>Guardar</Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
