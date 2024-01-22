"use client";
const InputField = ({
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
}) => {
  return (
    <div className={`w-full sm:col-span-2 ${className || ""}`}>
      <label
        htmlFor={name || label}
        className={` block text-md leading-6 font-semibold text-gray-800 focus:text-fuchsia-500 focus-visible:text-fuchsia-500 ${
          textarea ? "pl-2" : "pl-5"
        } `}
      >
        {label}
      </label>
      <div className="mt-1">
        {textarea ? (
          <textarea
            rows={3}
            type={type}
            name={name || label}
            id={name || label}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            autoComplete={autoComplete}
            className="w-full outline-none shadow-md bg-white text-gray-900 resize-none border-2 border-solid placeholder-gray-700 border-gray-400 focus:border-fuchsia-800 p-2 rounded-xl"
          />
        ) : (
          <input
            type={type}
            name={name || label}
            id={name || label}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            autoComplete={autoComplete}
            className="border-2 px-4 border-solid border-gray-400  focus:border-fuchsia-800 outline-none block w-full rounded-full py-2 text-gray-900 sm:text-sm sm:leading-6 shadow-md"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
