import React, { useState, useEffect } from "react";
import { MutationFunctionOptions, FetchResult } from "@apollo/client";
import { Formik, Form, FieldArray } from "formik";
import ToogleIcon from "./ToogleIcon";
import OpenHouseRow from "./OpenHouseRow";

type OpenHouseFormProps = {
  uuid: string;
  openHouseActive: Boolean;
  saveProperty: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};

export default function OpenHouseForm({
  uuid,
  openHouseActive,
  saveProperty,
}: OpenHouseFormProps) {
  const [formOpenHouseFormSuccess, setFormOpenHouseFormSuccess] = useState(
    false
  );

  useEffect(() => {
    if (formOpenHouseFormSuccess) {
      const handler = window.setTimeout(() => {
        setFormOpenHouseFormSuccess(false);
      }, 2000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [formOpenHouseFormSuccess]);

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{
          openHouseActive: openHouseActive || false,
          openHouseDates: [
            {
              date: new Date(),
              start: new Date(),
              end: new Date(),
            },
          ],
        }}
        onSubmit={async (values) => {
          await saveProperty({
            variables: {
              property: {
                uuid,
                openHouseActive: values.openHouseActive,
              },
            },
          });
          setFormOpenHouseFormSuccess(true);
        }}
      >
        {({ isSubmitting, values }) => {
          const submitButtonDisabled = isSubmitting;
          const { openHouseActive } = values;

          return (
            <Form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 flex">
                      <label className="text-sm font-medium leading-5 text-gray-700 mr-5">
                        Activate Open House
                      </label>
                      <ToogleIcon name="openHouseActive" />
                    </div>

                    {openHouseActive && (
                      <div className="col-span-6 border-b border-gray-200 sm:rounded-lg divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="px-6 py-3  flex justify-between text-left text-xs leading-5 font-medium text-gray-500 bg-gray-50  leading-4 uppercase">
                          <div>Date</div>
                          <div>From</div>
                          <div>To</div>
                          <div>Action</div>
                        </div>
                        <div className="bg-white divide-y divide-gray-200">
                          <FieldArray name="openHouseDates">
                            {({ insert, remove, push }) => {
                              return (
                                <>
                                  {values.openHouseDates.length > 0 &&
                                    values.openHouseDates.map(
                                      (openHouseDate, index) => (
                                        <OpenHouseRow
                                          key={`open-house-${index}`}
                                          index={index}
                                          remove={remove}
                                        />
                                      )
                                    )}
                                  <div className="col-span-6 py-3 px-6">
                                    <span className="inline-flex rounded-md shadow-sm">
                                      <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          push({
                                            date: new Date(),
                                            start: new Date(),
                                            end: new Date(),
                                          });
                                        }}
                                      >
                                        <svg
                                          className="-ml-0.5 mr-2 h-4 w-4"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        Add Date
                                      </button>
                                    </span>
                                  </div>
                                </>
                              );
                            }}
                          </FieldArray>
                        </div>
                      </div>
                    )}
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
                  {formOpenHouseFormSuccess && (
                    <p className="text-sm text-green-500 py-2 px-4">
                      Property Saved!
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
