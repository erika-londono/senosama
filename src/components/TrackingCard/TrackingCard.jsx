import React, { useRef, useState } from "react";
import Card from "../Card";
import Edit from "../../assets/svg/Edit.svg";
import Delete from "../../assets/svg/Delete.svg";
import Close from "../../assets/svg/Close.svg";
import Check from "../../assets/svg/Check.svg";
import Image from "next/image";
import styles from "./TrackingCard.module.css";
import {
  deleteTracking,
  updateTracking,
} from "@/app/api/patient/tracking/fetch";
import InputField from "../InputField";

export default function TrackingCard({ data, getTrackingData }) {
  const [editMode, setEditMode] = useState(false);
  const [newData, setNewData] = useState("");
  const editFieldRef = useRef();

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

  const handleEdit = async () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setNewData(data.nota);
      setEditMode(true);
      setTimeout(() => {
        editFieldRef?.current?.focus();
        editFieldRef?.current?.setSelectionRange(
          data.nota.length,
          data.nota.length
        );
      }, 50);
    }
  };

  const handleSaveChanges = async () => {
    console.log("saveChanges");
    await updateTracking({ ...data, nota: newData });
    setEditMode(false);
    getTrackingData();
  };

  return (
    <Card
      className={`p-5 gap-2 py-3 px-4 flex justify-between ${styles.trackingCard}`}
    >
      <div className={`w-full`}>
        <p
          style={{
            color: "#7e0770",
            fontSize: 12,
            fontStyle: "italic",
          }}
        >
          {date}
        </p>
        {editMode ? (
          <InputField
            ref={editFieldRef}
            textarea
            id="note"
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
          />
        ) : (
          <p style={{ color: "black", fontSize: 16, padding: "14px 10px" }}>
            {data.nota}
          </p>
        )}
      </div>
      {editMode ? (
        <div className={`flex gap-3 `} style={{ color: "black", fontSize: 16 }}>
          <Image
            className={`cursor-pointer ${styles.icon}`}
            src={Check}
            alt={"Cancel"}
            width={30}
            height={30}
            onClick={handleSaveChanges}
          />
          <Image
            className={`cursor-pointer ${styles.icon}`}
            src={Close}
            alt={"Confirm"}
            width={30}
            height={30}
            onClick={handleEdit}
          />
        </div>
      ) : (
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
            onClick={handleEdit}
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
      )}
    </Card>
  );
}
