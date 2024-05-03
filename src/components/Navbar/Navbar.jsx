"use client";

import React, { Fragment, useContext } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../assets/img/logo.png";
import { AppStateContext } from "@/context/appStateProvider";

export default function Navbar({ signup, form }) {
  const router = useRouter();
  const { user } = useContext(AppStateContext);

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
              {user?.nombre}
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
        onClick={() => router.push(`/`)}
      />
    </div>
  );

  return form ? <FormHeader /> : <MainBar />;
}
