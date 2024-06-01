import React from "react";
import styles from "./Link.module.css";

export default function Link({ onClick, children }) {
  return (
    <p className={styles.root} onClick={onClick}>
      {children}
    </p>
  );
}
