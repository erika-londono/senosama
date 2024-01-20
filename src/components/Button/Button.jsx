"use client";
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button className={styles.root} {...props}>
      {props.children}
    </button>
  );
}
