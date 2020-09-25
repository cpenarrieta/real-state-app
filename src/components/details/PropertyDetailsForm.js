import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";
import TextField from "./TextField";
import PriceField from "./PriceField";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const PropertyDetailsSchema = Yup.object().shape({
  price: Yup.number()
    .typeError("invalid characters")
    .max(9999999999999, "Too Long!")
    .positive("Value must be positive")
    .integer()
    .notRequired(),
  lotSize: Yup.number()
    .typeError("invalid characters")
    .max(944735000000, "Too Long!")
    .positive("Value must be positive")
    .integer()
    .notRequired(),
  builtYear: Yup.number()
    .typeError("invalid characters")
    .min(100, "Too Short!")
    .max(3000, "Too Long!")
    .integer()
    .notRequired(),
  grossTaxesLastYear: Yup.number()
    .typeError("invalid characters")
    .min(0, "Too Short!")
    .max(9999999999999, "Too Long!")
    .integer()
    .notRequired(),
  listingId: Yup.string().max(12, "Too Long!"),
  description: Yup.string().max(1500, "Too Long!"),
});

export default function PropertyDetailsForm({
  uuid,
  saveProperty,
  savePropertyLoading,
  refetch,
  price,
  currency,
  lotSize,
  builtYear,
  grossTaxesLastYear,
  bedrooms,
  bathrooms,
  propertyType,
  description,
  listingId,
  hidePrice,
  strata,
}) {
  const [formDetailsSuccess, setFormDetailsSuccess] = useState(false);

  useEffect(() => {
    if (formDetailsSuccess) {
      const handler = window.setTimeout(() => {
        setFormDetailsSuccess(false);
      }, 1000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [formDetailsSuccess]);

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        validationSchema={PropertyDetailsSchema}
        initialValues={{
          bedrooms: bedrooms || "",
          bathrooms: bathrooms || "",
          price: price || "",
          propertyType: propertyType || "",
          lotSize: lotSize || "",
          builtYear: builtYear || "",
          grossTaxesLastYear: grossTaxesLastYear || "",
          description: description || "",
          listingId: listingId || "",
          currency: currency || "CAD",
          hidePrice: hidePrice || false,
          strata: strata || false,
        }}
        onSubmit={async (values) => {
          await saveProperty({
            variables: {
              property: {
                uuid,
                bedrooms: values.bedrooms || null,
                bathrooms: values.bathrooms || null,
                price: values.price || null,
                propertyType: values.propertyType || null,
                lotSize: values.lotSize || null,
                builtYear: values.builtYear || null,
                grossTaxesLastYear: values.grossTaxesLastYear || null,
                description: values.description,
                listingId: values.listingId,
                currency: values.currency,
                hidePrice: values.hidePrice || false,
                strata: values.strata || false,
              },
            },
          });
          setFormDetailsSuccess(true);
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
                    <div className="col-span-6 sm:col-span-6">
                      <RadioButtons name="bedrooms" label="Beds" />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <RadioButtons name="bathrooms" label="Baths" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="propertyType"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Property Type
                      </label>

                      <Field
                        as="select"
                        name="propertyType"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option value="">Select...</option>
                        <option value="HOUSE">House</option>
                        <option value="TOWNHOUSE">Townhouse</option>
                        <option value="CONDO">House</option>
                        <option value="LAND">Land</option>
                        <option value="OTHER">Other</option>
                      </Field>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <PriceField />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="lotSize"
                        name="lotSize"
                        type="number"
                        placeholder="Property Lot Size in SQFT"
                        label="Lot Size (SQFT)"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="builtYear"
                        name="builtYear"
                        type="number"
                        label="Built Year"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="grossTaxesLastYear"
                        name="grossTaxesLastYear"
                        type="number"
                        label="Last Year Taxes ($)"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="listingId"
                        name="listingId"
                        label="Listing Id"
                        placeholder="MLS Listing Id"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="hidePrice"
                            type="checkbox"
                            name="hidePrice"
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-5">
                          <label
                            htmlFor="hidePrice"
                            className="font-medium text-gray-700"
                          >
                            Hide Price
                          </label>
                          <p className="text-gray-500">
                            Price will be hidden in the property website.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="strata"
                            type="checkbox"
                            name="strata"
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-5">
                          <label
                            htmlFor="strata"
                            className="font-medium text-gray-700"
                          >
                            Strata
                          </label>
                          <p className="text-gray-500">
                            Is this a strata property?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm leading-5 font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="rounded-md shadow-sm">
                        <Field
                          className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          id="description"
                          name="description"
                          placeholder="give your property a summary description..."
                          rows="3"
                          component="textarea"
                          type="text"
                        />
                      </div>
                      {errors.description && touched.description ? (
                        <div className="text-sm text-red-400">
                          {errors.description}
                        </div>
                      ) : null}
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
                  {formDetailsSuccess && (
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
