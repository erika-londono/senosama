"use client";

import React, { Fragment } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../assets/img/logo.png";

export default function Navbar({ signup, form }) {
  const router = useRouter();

  const MainBar = () => (
    <div className={styles.root}>
      <Image
        className={styles.logo}
        src={Logo}
        alt={"Senosama"}
        width={200}
        height={200}
        priority
      />
      {!signup ? (
        <Fragment>
          <p className={styles.title}>Aplicativo SENOSama</p>
          <div className={styles.login}>
            <h3>Bienvenido</h3>
            <span onClick={() => router.push(`/login`)}>
              <div></div>
              Nombre
            </span>
          </div>
        </Fragment>
      ) : (
        <p className={`${styles.title} ${styles.welcome}`}>Bienvenidos</p>
      )}
    </div>
  );

  const FormHeader = () => (
    <div className={styles.formRoot}>
      <Image
        className={styles.logo}
        src={Logo}
        alt={"Senosama"}
        width={200}
        height={200}
        priority
      />
    </div>
  );

  return form ? <FormHeader /> : <MainBar />;
}
