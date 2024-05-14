"use client";

const SelectField = ({ label, name, onChange, options, className, value }) => {
  return (
    <div className={`w-full sm:col-span-2 flex flex-col ${className || ""}`}>
      <label
        htmlFor={name || label}
        className={`mb-1 block text-md leading-6 font-semibold text-gray-800 focus:text-fuchsia-500 focus-visible:text-fuchsia-500 pl-5`}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value || undefined}
        onChange={onChange}
        className={`cursor-pointer h-11 border-2 px-4 border-solid border-gray-400  focus:border-fuchsia-800 outline-none block w-full rounded-full py-2 text-gray-900 sm:text-sm sm:leading-6 shadow-md`}
      >
        <option disabled value>
          Selecciona una opción
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
