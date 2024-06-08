import React from "react";
import Card from "../Card";
import Edit from "../../assets/svg/Edit.svg";
import Delete from "../../assets/svg/Delete.svg";
import Image from "next/image";
import styles from "./TrackingCard.module.css";
import { deleteTracking } from "@/app/api/patient/tracking/fetch";

export default function TrackingCard({ data, getTrackingData }) {
  const date = new Date(data.fecha).toLocaleDateString("es-es", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    await deleteTracking(data.idseguimiento);
    getTrackingData();
  };

  return (
    <Card className={`p-5 py-3 flex justify-between ${styles.trackingCard}`}>
      <div>
        <p
          style={{
            color: "#7e0770",
            fontSize: 12,
            fontStyle: "italic",
          }}
        >
          {date}
        </p>
        <p style={{ color: "black", fontSize: 16 }}>{data.nota}</p>
      </div>
      <div
        className={`flex gap-3 ${styles.hiddenOptions}`}
        style={{ color: "black", fontSize: 16 }}
      >
        <Image
          className={`cursor-pointer ${styles.icon}`}
          src={Edit}
          alt={"Borrar"}
          width={30}
          height={30}
          onClick={() => alert("Soon!")}
        />
        <Image
          className={`cursor-pointer ${styles.icon}`}
          src={Delete}
          alt={"Editar"}
          width={30}
          height={30}
          onClick={handleDelete}
        />
      </div>
    </Card>
  );
}
