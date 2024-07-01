"use client";
import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  {
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    type = "text",
    className,
    autoComplete,
    textarea,
    readOnly,
    disabled,
  },
  ref
) {
  return (
    <div className={`w-full sm:col-span-2 ${className || ""}`}>
      <label
        htmlFor={name || label}
        className={`mb-1 block text-md font-semibold text-gray-800 focus:text-fuchsia-500 focus-visible:text-fuchsia-500 ${
          textarea ? "pl-2" : "pl-5"
        } `}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={ref}
          rows={3}
          type={type}
          name={name || label}
          id={name || label}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={readOnly || disabled}
          className="w-full outline-none shadow-md bg-white text-gray-900 resize-none border-2 border-solid placeholder-gray-700 border-gray-400 focus:border-fuchsia-800 p-2 rounded-xl"
        />
      ) : (
        <input
          ref={ref}
          type={type}
          name={name || label}
          id={name || label}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={readOnly || disabled}
          className={`${
            type === "date" ? "cursor-text" : ""
          } border-2 px-4 border-solid h-11 border-gray-400  focus:border-fuchsia-800 outline-none block w-full rounded-full py-2 text-gray-900 sm:text-sm sm:leading-6 shadow-md`}
        />
      )}
    </div>
  );
});

export default InputField;
