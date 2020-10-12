import React from "react";
import DatePickerFormik from "./DatePickerFormik";

export default function OpenHouseRow({ index, remove }) {
  return (
    <div className="col-span-6 py-3 px-6">
      <div className="flex justify-between text-sm leading-5 font-medium text-gray-900">
        <DatePickerFormik
          name={`openHouseDates.${index}.date`}
          dateFormat="MMMM d, yyyy"
          placeholderText="Click to select a date"
        />

        <DatePickerFormik
          name={`openHouseDates.${index}.start`}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          closeOnScroll={true}
          placeholderText="Click to select a time"
        />

        <DatePickerFormik
          name={`openHouseDates.${index}.end`}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          closeOnScroll={true}
          placeholderText="Click to select a time"
        />

        <button
          className="text-red-600 hover:text-red-900"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
