import { useEffect, useState } from "react";
import Card from "../Card";
import SelectField from "../SelectField";
import InputField from "../InputField";
import Button from "../Button/Button";
import styles from "./SearchUserForm.module.css";

export default function SearchUserForm({
  title,
  onSubmit,
  loading,
  cleanId,
  setCleanId,
}) {
  const [data, setData] = useState({
    tipodocumento: "Cédula",
    cedula: "6344408",
  });

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e?.target?.value ?? e;
      return newState;
    });
  };

  useEffect(() => {
    if (cleanId) {
      handleChange("cedula", "");
      setCleanId(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanId]);

  return (
    <form
      className="flex flex-col gap-6 justify-center items-center"
      onSubmit={(e) => onSubmit(e, data)}
    >
      <Card>
        {title && <h3>{title}</h3>}
        <div
          className={`flex flex-wrap gap-6 justify-center ${styles.inputContainer}`}
        >
          <SelectField
            label="Tipo de cedula"
            defaultValue="Cédula"
            value={data.tipodocumento || "Cédula"}
            onChange={(e) => handleChange("tipodocumento", e)}
            options={[
              { value: "Cédula", label: "Cédula de ciudadanía" },
              {
                value: "Cedula de extranjeria",
                label: "Cedula de extranjeria",
              },
              { value: "Pasaporte", label: "Pasaporte" },
            ]}
          />
          <InputField
            label="Cedula"
            value={data.cedula}
            onChange={(e) => handleChange("cedula", e)}
            type="number"
          />
        </div>
        <footer className={`flex justify-center mt-8`}>
          <Button
            loading={loading}
            disabled={!data.cedula || !data.tipodocumento}
          >
            Consultar
          </Button>
        </footer>
      </Card>
    </form>
  );
}
