"use client";
import React from "react";
import styles from "./Pill.module.css";
import Document from "../../assets/svg/Document.svg";
import Image from "next/image";

export default function Pill({ label, icon, onClick }) {
  return (
    <div className={styles.root} onClick={onClick}>
      <Image src={icon} alt={label} width={120} height={120} />
      <p>{label}</p>
    </div>
  );
}
