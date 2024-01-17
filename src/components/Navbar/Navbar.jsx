"use client";

import React, { Fragment } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

export default function Navbar({ signup }) {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.logo}>LOGO</div>
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
}
