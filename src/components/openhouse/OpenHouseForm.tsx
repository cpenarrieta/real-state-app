import React, { useState, useEffect } from "react";
import { MutationFunctionOptions, FetchResult } from "@apollo/client";
import { Formik, Form } from "formik";
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
        {({ isSubmitting }) => {
          const submitButtonDisabled = isSubmitting;

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

                    <OpenHouseRow />
                    <OpenHouseRow />
                    <OpenHouseRow />
                    <OpenHouseRow />
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
