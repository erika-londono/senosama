"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./page.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import BackgroundContainer from "@/components/BackgroundContainer/BackgroundContainer";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    router.push(`/`);
  };

  return (
    <main className={styles.main}>
      <Navbar signup />
      <BackgroundContainer>
        <div style={{ padding: "0 10%" }}>
          <h1>Aplicativo SENOSama</h1>
          <form className={styles.form} onSubmit={onSubmit}>
            <h2>Identifícate</h2>
            <h3>Usuario</h3>
            <Input
              inputProps={{
                type: "email",
                id: "email",
                autoComplete: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <h3>Contraseña</h3>
            <Input
              inputProps={{
                type: "password",
                id: "password",
                autoComplete: "current-password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
            <Button>Continuar</Button>
          </form>
        </div>
      </BackgroundContainer>
    </main>
  );
}
