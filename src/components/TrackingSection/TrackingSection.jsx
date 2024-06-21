import React, { Fragment } from "react";
import Card from "../Card";
import InputField from "../InputField";
import Button from "../Button/Button";
import TrackingCard from "../TrackingCard/TrackingCard";
import Loader from "../Loader/Loader";

export default function TrackingSection({
  show,
  onConfirmTracking,
  addTracking,
  trackingList,
  tracking,
  setTracking,
  loading,
  getTrackingData,
  enableTrackingButton,
}) {
  if (!show) {
    return null;
  }

  return (
    <Fragment>
      <form
        className="flex flex-col gap-6 justify-center items-center  w-full mb-5"
        onSubmit={onConfirmTracking}
      >
        <Card className="flex flex-col gap-3 p-5">
          {addTracking && (
            <div>
              <InputField
                textarea
                id="info"
                label="Ingrese aqui tus comentarios de seguimiento"
                value={tracking || ""}
                onChange={(e) => setTracking(e.target.value)}
              />
            </div>
          )}
          <Button
            style={{ alignSelf: "center" }}
            disabled={addTracking && !enableTrackingButton}
            loading={loading}
          >
            {addTracking ? "Guardar" : "Añadir seguimiento"}
          </Button>
        </Card>
      </form>
      {trackingList ? (
        <div className="flex flex-col w-full gap-4">
          {trackingList.map((track) => (
            <TrackingCard
              key={track.idseguimiento}
              data={track}
              getTrackingData={getTrackingData}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
}
