import { useState } from "react";
import Card from "../Card";
import SelectField from "../SelectField";
import InputField from "../InputField";
import Button from "../Button/Button";
import styles from "./SearchUserForm.module.css";

export default function SearchUserForm({ title, onSubmit, loading }) {
  const [data, setData] = useState({
    tipodocumento: "Cedula de ciudadania",
    cedula: "6344408",
  });

  const handleChange = (id, e) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[id] = e.target.value;
      return newState;
    });
  };

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
            defaultValue="Cedula de ciudadania"
            value={data.tipodocumento || "Cedula de ciudadania"}
            onChange={(e) => handleChange("tipodocumento", e)}
            options={[
              { value: "Cedula de ciudadania", label: "Cedula de ciudadania" },
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
