import React from "react";
import DatePicker from "react-datepicker";
import { useField } from "formik";

class ExampleCustomInput extends React.Component {
  render() {
    return (
      <button
        className="text-sm leading-5 font-medium text-gray-900"
        onClick={(e) => {
          e.preventDefault();
          this.props.onClick(e);
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

export default function DatePickerFormik({ name, ...props }) {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      selected={value}
      onChange={(date) => setValue(date)}
      customInput={<ExampleCustomInput />}
      {...props}
    />
  );
}
