import React, { useState, useEffect } from "react";
import AddressLookUpField from "./AddressLookUpField";
import TextField from "./TextField";
import { Formik, Field, Form } from "formik";

export default function PropertyLocationForm({
  uuid,
  saveProperty,
  savePropertyLoading,
  refetch,
  address1,
  zipCode,
  city,
  province,
  community,
  country,
  lat,
  lon,
}) {
  const [formLocationSuccess, setFormLocationSuccess] = useState(false);

  useEffect(() => {
    if (formLocationSuccess) {
      const handler = window.setTimeout(() => {
        setFormLocationSuccess(false);
      }, 1000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [formLocationSuccess]);

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{
          searchAddress: "",
          address1: address1 || "",
          city: city || "",
          community: community || "",
          zipCode: zipCode || "",
          provinceCA: country === "CA" ? province : "",
          provinceUSA: country === "US" ? province : "",
          country: country || "CA",
          lat: lat || null,
          lon: lon || null,
        }}
        onSubmit={async (values) => {
          const prov =
            values.country === "US" ? values.provinceUSA : values.provinceCA;
          await saveProperty({
            variables: {
              property: {
                uuid,
                address1: values.address1 || null,
                city: values.city || null,
                community: values.community || null,
                zipCode: values.zipCode || null,
                country: values.country || null,
                lat: values.lat || null,
                lon: values.lon || null,
                province: prov || null,
              },
            },
          });
          setFormLocationSuccess(true);
          refetch();
        }}
      >
        {({ values, isSubmitting }) => {
          const submitButtonDisabled = isSubmitting || savePropertyLoading;

          return (
            <Form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <AddressLookUpField />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Country
                      </label>
                      <Field
                        as="select"
                        id="country"
                        name="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                      </Field>
                    </div>

                    <div className="col-span-6">
                      <TextField
                        id="address1"
                        name="address1"
                        label="Street address"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    {values.country === "CA" && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="provinceCA"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          State / Province
                        </label>
                        <Field
                          as="select"
                          id="provinceCA"
                          name="provinceCA"
                          className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        >
                          <option>Select...</option>
                          <option>BC</option>
                          <option>ON</option>
                          <option>AB</option>
                          <option>QC</option>
                          <option>MB</option>
                          <option>NB</option>
                          <option>NL</option>
                          <option>NT</option>
                          <option>NS</option>
                          <option>NU</option>
                          <option>PE</option>
                          <option>SK</option>
                          <option>YT</option>
                        </Field>
                      </div>
                    )}

                    {values.country === "US" && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="provinceUSA"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          State / Province
                        </label>
                        <Field
                          as="select"
                          id="provinceUSA"
                          name="provinceUSA"
                          className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        >
                          <option>Select...</option>
                          <option>AL</option>
                          <option>AZ</option>
                          <option>AR</option>
                          <option>CA</option>
                          <option>CO</option>
                          <option>CT</option>
                          <option>DE</option>
                          <option>FL</option>
                          <option>GA</option>
                          <option>ID</option>
                          <option>IL</option>
                          <option>IN</option>
                          <option>IA</option>
                          <option>KS</option>
                          <option>KY</option>
                          <option>LA</option>
                          <option>ME</option>
                          <option>MD</option>
                          <option>MA</option>
                          <option>MI</option>
                          <option>MN</option>
                          <option>MS</option>
                          <option>MO</option>
                          <option>MT</option>
                          <option>NE</option>
                          <option>NV</option>
                          <option>NH</option>
                          <option>NJ</option>
                          <option>NM</option>
                          <option>NY</option>
                          <option>NC</option>
                          <option>ND</option>
                          <option>OH</option>
                          <option>OK</option>
                          <option>OR</option>
                          <option>PA</option>
                          <option>RI</option>
                          <option>SC</option>
                          <option>SD</option>
                          <option>TN</option>
                          <option>TX</option>
                          <option>UT</option>
                          <option>VT</option>
                          <option>VA</option>
                          <option>WA</option>
                          <option>WV</option>
                          <option>WI</option>
                          <option>WY</option>
                        </Field>
                      </div>
                    )}

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="city"
                        name="city"
                        label="City"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="zipCode"
                        name="zipCode"
                        label="ZipCode"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="community"
                        name="community"
                        label="Community"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    {values.lat && values.lon && (
                      <div className="col-span-6 ">
                        <label
                          htmlFor="postal_code"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Map
                        </label>
                        <a
                          href={`https://maps.google.com/?q=${values.lat},${values.lon}&ll=${values.lat},${values.lon}&z=12`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=11&size=600x300&maptype=roadmap
  &markers=color:red%7Clabel:A%7C${values.lat},${values.lon}
  &key=${process.env.REACT_APP_MAPS_KEY}`}
                            alt="Property Location"
                          />
                        </a>
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
                  {formLocationSuccess && (
                    <p className="text-sm text-green-500 py-2 px-4">
                      Location Saved!
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
