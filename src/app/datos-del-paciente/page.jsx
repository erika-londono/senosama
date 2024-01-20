"use client";

import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import Input from "@/components/Input/Input";
import { useState } from "react";

export default function DataPatient() {
  const [document, setDocument] = useState("");
  return (
    <main className={styles.main}>
      <Navbar form />
      <div className={styles.background}>
        <h3>BASE DE DATOS</h3>
        <form>
          <label>Documento</label>
          <Input
            inputProps={{
              type: "number",
              id: "document",
              autoComplete: "off",
              value: document,
              onChange: (e) => setDocument(e.target.value),
            }}
          />
        </form>
      </div>
    </main>
  );
}
