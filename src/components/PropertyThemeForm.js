import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import themeDefault from "../images/theme_1.png";

export default function PropertyThemeForm({
  uuid,
  saveProperty,
  savePropertyLoading,
  color,
  refetch,
}) {
  const [formThemeSuccess, setFormThemeSuccess] = useState(false);

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{
          color: color || "indigo",
        }}
        onSubmit={async (values) => {
          await saveProperty({
            variables: {
              property: {
                uuid,
                color: values.color || "indigo",
              },
            },
          });
          setFormThemeSuccess(true);
          refetch();
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const submitButtonDisabled = isSubmitting || savePropertyLoading;

          return (
            <Form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="propertyTheme"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Theme
                      </label>
                      <p className="text-sm leading-5 text-gray-500">
                        More themes coming soon.
                      </p>
                      <img
                        className="mt-1 rounded-lg shadow-xl rounded-lg border-2 border-indigo-600"
                        src={themeDefault}
                        alt={uuid}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="propertyTheme"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Color Variation
                      </label>
                      <div className="mt-1">
                        <div className="max-w-lg">
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="indigo"
                              value="indigo"
                              className="form-radio h-4 w-4 text-indigo-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="indigo" className="ml-3">
                              <span className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Indigo
                              </span>
                            </label>
                          </div>
                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="red"
                              value="red"
                              className="form-radio h-4 w-4 text-red-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="red" className="ml-3">
                              <span className="inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Red
                              </span>
                            </label>
                          </div>
                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="orange"
                              value="orange"
                              className="form-radio h-4 w-4 text-orange-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="orange" className="ml-3">
                              <span className="inline-block bg-orange-200 text-orange-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Orange
                              </span>
                            </label>
                          </div>
                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="yellow"
                              value="yellow"
                              className="form-radio h-4 w-4 text-yellow-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="yellow" className="ml-3">
                              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Yellow
                              </span>
                            </label>
                          </div>

                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="green"
                              value="green"
                              className="form-radio h-4 w-4 text-green-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="green" className="ml-3">
                              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Green
                              </span>
                            </label>
                          </div>

                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="teal"
                              value="teal"
                              className="form-radio h-4 w-4 text-teal-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="teal" className="ml-3">
                              <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Teal
                              </span>
                            </label>
                          </div>

                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="blue"
                              value="blue"
                              className="form-radio h-4 w-4 text-blue-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="blue" className="ml-3">
                              <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Blue
                              </span>
                            </label>
                          </div>

                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="purple"
                              value="purple"
                              className="form-radio h-4 w-4 text-purple-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="purple" className="ml-3">
                              <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Purple
                              </span>
                            </label>
                          </div>

                          <div className="mt-4 flex items-center">
                            <Field
                              type="radio"
                              name="color"
                              id="pink"
                              value="pink"
                              className="form-radio h-4 w-4 text-pink-400 transition duration-150 ease-in-out"
                            />
                            <label htmlFor="pink" className="ml-3">
                              <span className="inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                Pink
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row-reverse">
                  <button
                    className={`py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out ${
                      submitButtonDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    type="submit"
                    disabled={submitButtonDisabled}
                  >
                    Save
                  </button>
                  {formThemeSuccess && (
                    <p className="text-sm text-green-500 py-2 px-4">
                      Theme Saved!
                    </p>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
