import React from "react";
import { useField } from "formik";

export const TextField = ({ label, labelClass, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className={labelClass} htmlFor={props.name}>
        {label}
      </label>
      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="text-sm text-red-400">{meta.error}</div>
      ) : null}
    </>
  );
};
