import React from "react";
import { useField } from "formik";

export default function RadioButtons({ name, label }) {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const isSelected = (v) => v === value;

  return (
    <>
      <label
        htmlFor="bedrooms"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="relative z-0 inline-flex shadow-sm">
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(0) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(0, false)}
        >
          0
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(1) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(1, false)}
        >
          1
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(2) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(2, false)}
        >
          2
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(3) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(3, false)}
        >
          3
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(4) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(4, false)}
        >
          4
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(5) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(5, false)}
        >
          5
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(6) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(6, false)}
        >
          6
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(7) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(7, false)}
        >
          7
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(8) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(8, false)}
        >
          8
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(9) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(9, false)}
        >
          9
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(10) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(10, false)}
        >
          10
        </button>
        <button
          className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            isSelected(11) ? "bg-logoPink" : ""
          }`}
          onClick={() => setValue(11, false)}
        >
          +10
        </button>
      </div>
    </>
  );
}
