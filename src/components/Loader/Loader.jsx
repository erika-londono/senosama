import React from "react";
import styles from "./Loader.module.css";

export default function Loader({ size, white }) {
  return (
    <div
      className={`${styles.loader} ${white ? styles.white : ""}`}
      style={size ? { width: size } : {}}
    ></div>
  );
}
