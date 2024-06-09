"use client";
import Loader from "../Loader/Loader";
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button
      className={`flex justify-center items-center ${styles.root} ${
        props.disabled ? styles.disabled : ""
      } ${props.className || ""}`}
      style={props.style}
      {...props.buttonProps}
    >
      {props.loading ? <Loader white /> : props.children}
    </button>
  );
}
