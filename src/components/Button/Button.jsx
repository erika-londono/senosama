"use client";
import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button
      className={`${styles.root} ${props.disabled ? styles.disabled : ""}`}
      {...props}
    >
      {props.loading ? <Spinner /> : props.children}
    </button>
  );
}
