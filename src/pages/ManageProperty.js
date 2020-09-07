import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { DASHBOARD_QUERY } from "../queries/dashboard";
import { format, parseISO, compareAsc } from "date-fns";
import { getPropertyBadge } from "../util/propertyStatus";
import Alert from "../components/Alert";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      price
      lotSize
      builtYear
      grossTaxesLastYear
      bedrooms
      bathrooms
      propertyType
      description
      listingId
      mainPicture
      status
      publishedStatus
      webPaidUntil
      username
    }
  }
`;

const SAVE_PROPERTY_MUTATION = gql`
  mutation SaveProperty($property: PropertyInput) {
    saveProperty(property: $property) {
      uuid
      title
      mainPicture
    }
  }
`;

const PUBLISH_PROPERTY_MUTATION = gql`
  mutation PublishProperty($propertyUuid: String) {
    publishProperty(propertyUuid: $propertyUuid)
  }
`;

export default function ManageProperty() {
  const { propertyId } = useParams();
  const history = useHistory();
  const { loading, error, data, refetch: refetchGetProperty } = useQuery(
    PROPERTY_QUERY,
    {
      variables: { uuid: propertyId },
    }
  );
  const [
    saveProperty,
    {
      loading: savePropertyLoading,
      error: savePropertyError,
      called: savePropertyCalled,
    },
  ] = useMutation(SAVE_PROPERTY_MUTATION);
  const [
    publishProperty,
    { loading: publishPropertyLoading, error: publishPropertyError },
  ] = useMutation(PUBLISH_PROPERTY_MUTATION);
  const { refetch } = useQuery(DASHBOARD_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const {
    uuid,
    mainPicture,
    webPaidUntil,
    status,
    publishedStatus,
    price,
    lotSize,
    builtYear,
    grossTaxesLastYear,
    bedrooms,
    bathrooms,
    propertyType,
    description,
    username,
    listingId,
  } = data?.property;

  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);

  const validPayment =
    webPaidUntil && compareAsc(parseISO(webPaidUntil), new Date()) === 1;

  const lat = 49.14700209999999;
  const lon = -122.6430761;

  return (
    <div className="">
      {/* {savePropertyCalled && (
        <Alert type="success" title="Property Saved" position="top-right" />
      )}

      {savePropertyError && (
        <Alert
          type="error"
          title="error saving property"
          position="top-right"
        />
      )} */}

      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Property Details
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                khjg asdfjkhg asdfjkhg oigsdafoiga sdfklhbxz cvlkhbxd fois
                dfgoisadfkh sdf
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Formik
              initialValues={{
                bedrooms: bedrooms || null,
                bathrooms: bathrooms || null,
                price: price || "",
                propertyType: propertyType || "",
                lotSize: lotSize || "",
                builtYear: builtYear || "",
                grossTaxesLastYear: grossTaxesLastYear || "",
                description: description || "",
                listingId: listingId || "",
              }}
              onSubmit={async (values) => {
                await saveProperty({
                  variables: {
                    property: {
                      uuid,
                      bedrooms: values.bedrooms,
                      bathrooms: values.bathrooms,
                      price: values.price,
                      propertyType: values.propertyType,
                      lotSize: values.lotSize,
                      builtYear: values.builtYear,
                      grossTaxesLastYear: values.grossTaxesLastYear,
                      description: values.description,
                      listingId: values.listingId,
                    },
                  },
                });
                refetch();
              }}
            >
              {({ values, isSubmitting, setFieldValue }) => {
                const submitButtonDisabled = isSubmitting;

                return (
                  <Form>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <label
                              htmlFor="company_website"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Website
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                copy
                              </span>
                              <input
                                id="company_website"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="www.example.com"
                                value={`${process.env.REACT_APP_STATIC_URI}${username}/${propertyId}`}
                                disabled
                              />
                            </div>
                          </div>

                          {/* TODO useField Formik custom input for this */}
                          <div className="col-span-6 sm:col-span-6">
                            <label
                              htmlFor="bedrooms"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Beds
                            </label>
                            <div className="relative z-0 inline-flex shadow-sm">
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 0 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 0, false)
                                }
                              >
                                0
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 1 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 1, false)
                                }
                              >
                                1
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 2 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 2, false)
                                }
                              >
                                2
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 3 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 3, false)
                                }
                              >
                                3
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 4 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 4, false)
                                }
                              >
                                4
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 5 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 5, false)
                                }
                              >
                                5
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 6 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 6, false)
                                }
                              >
                                6
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 7 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 7, false)
                                }
                              >
                                7
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 8 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 8, false)
                                }
                              >
                                8
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 9 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 9, false)
                                }
                              >
                                9
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms === 10 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 10, false)
                                }
                              >
                                10
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bedrooms > 10 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bedrooms", 11, false)
                                }
                              >
                                {" "}
                                +10
                              </button>
                            </div>
                          </div>

                          <div className="col-span-6 sm:col-span-6">
                            <label
                              htmlFor="bathrooms"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Baths
                            </label>
                            <div className="relative z-0 inline-flex shadow-sm">
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 0 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 0, false)
                                }
                              >
                                0
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 1 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 1, false)
                                }
                              >
                                1
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 2 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 2, false)
                                }
                              >
                                2
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 3 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 3, false)
                                }
                              >
                                3
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 4 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 4, false)
                                }
                              >
                                4
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 5 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 5, false)
                                }
                              >
                                5
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 6 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 6, false)
                                }
                              >
                                6
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 7 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 7, false)
                                }
                              >
                                7
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 8 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 8, false)
                                }
                              >
                                8
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 9 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 9, false)
                                }
                              >
                                9
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms === 10 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 10, false)
                                }
                              >
                                10
                              </button>
                              <button
                                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                                  values.bathrooms > 10 ? "bg-indigo-200" : ""
                                }`}
                                onClick={() =>
                                  setFieldValue("bathrooms", 11, false)
                                }
                              >
                                {" "}
                                +10
                              </button>
                            </div>
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
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Price ($)
                            </label>

                            <Field
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              id="price"
                              name="price"
                              placeholder="Property price in $"
                              type="number"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="lotSize"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Lot Size (SQFT)
                            </label>
                            <Field
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              id="lotSize"
                              name="lotSize"
                              placeholder="Property Lot Size in SQFT"
                              type="number"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="builtYear"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Built Year
                            </label>
                            <Field
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              id="builtYear"
                              name="builtYear"
                              placeholder=""
                              type="text"
                              type="number"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="grossTaxesLastYear"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Last Year Taxes ($)
                            </label>
                            <Field
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              id="grossTaxesLastYear"
                              name="grossTaxesLastYear"
                              placeholder=""
                              type="number"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="listingId"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Listing Id
                            </label>
                            <Field
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              id="listingId"
                              name="listingId"
                              placeholder=""
                              type="text"
                            />
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
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Location
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property address...
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        <option>Peru</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        id="street_address"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        State / Province
                      </label>
                      <select
                        id="country"
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
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        ZIP / Postal
                      </label>
                      <input
                        id="postal_code"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Community
                      </label>
                      <input
                        id="postal_code"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Map
                      </label>
                      <a
                        href={`https://maps.google.com/?q=${lat},${lon}&ll=${lat},${lon}&z=12`}
                        target="_blank"
                      >
                        {/* <img
                          src={`https://maps.googleapis.com/maps/api/staticmap?zoom=11&size=600x300&maptype=roadmap
  &markers=color:red%7Clabel:A%7C${lat},${lon}
  &key=${process.env.REACT_APP_MAPS_KEY}`}
                        /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Pictures
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property pictures....
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                              Upload a file
                            </button>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Pictures (rest of property pictures)
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                              Upload files
                            </button>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG up to 3MB per file
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Video
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property video....
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Video Provider
                      </label>

                      <div className="mt-4 flex items-center">
                        <input
                          id="push_youtube"
                          name="push_notifications"
                          type="radio"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <label htmlFor="push_youtube" className="ml-3">
                          <span className="block text-sm leading-5 font-medium text-gray-700">
                            YouTube
                          </span>
                        </label>
                      </div>
                      <div className="mt-4 flex items-center">
                        <input
                          id="push_vimeo"
                          name="push_notifications"
                          type="radio"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <label htmlFor="push_vimeo" className="ml-3">
                          <span className="block text-sm leading-5 font-medium text-gray-700">
                            Vimeo
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Video Id
                      </label>
                      <input
                        id="first_name"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium leading-5 text-gray-700">
                        Video
                      </label>
                      {/* Add iframe video here */}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Attachments
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property attachments....
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      Title
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50"></th>
                                    <th className="px-6 py-3 bg-gray-50"></th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                      Floorplans
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                      <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                      >
                                        Download
                                      </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                      <a
                                        href="#"
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Remove
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                      Design Details
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                      <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                      >
                                        Download
                                      </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                      <a
                                        href="#"
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Remove
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        id="first_name"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Attachment
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                              Upload a file
                            </button>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PDF up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Add Attachment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div>
//   <div className="flex justify-center">
//     {(savePropertyLoading || publishPropertyLoading) && <p>Loading...</p>}
//     {savePropertyError && <p>Error... Please try again</p>}
//     {publishPropertyError && <p>Error publishing</p>}

//     <Formik
//       initialValues={{
//         title: title || "",
//         mainPicture: mainPicture || "",
//       }}
//       onSubmit={async (values) => {
//         await savePropertyFunc(values);
//         refetch();
//       }}
//     >
//       {({ values, isSubmitting }) => {
//         const submitButtonDisabled = isSubmitting;

//         return (
//           <div className="w-full max-w-3xl">
//             <div className="flex justify-center">
//               {publishedStatus === "PUBLISHED" && validPayment && (
//                 <a
//                   href={`${process.env.REACT_APP_STATIC_URI}${username}/${propertyId}`}
//                   rel="noopener noreferrer"
//                   target="_blank"
//                   className="text-indigo-500 font-bold hover:text-indigo-700"
//                 >
//                   Live Page
//                 </a>
//               )}
//               <button
//                 className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
//                 onClick={() =>
//                   history.push(`/manage-property/${propertyId}/preview`)
//                 }
//               >
//                 Preview
//               </button>
//               {validPayment && (
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
//                   onClick={async () => {
//                     await savePropertyFunc(values);
//                     await publishProperty({
//                       variables: {
//                         propertyUuid: propertyId,
//                       },
//                     });
//                     refetchGetProperty();
//                     refetch();
//                   }}
//                 >
//                   Publish
//                 </button>
//               )}
//               {validPayment && (
//                 <button
//                   className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
//                   onClick={() =>
//                     history.push(`/manage-property/${propertyId}/leads`)
//                   }
//                 >
//                   <svg
//                     className="w-5"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
//                     />
//                   </svg>
//                 </button>
//               )}
//               {!validPayment && (
//                 <button
//                   className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
//                   onClick={() => {
//                     history.push(`/payment/${propertyId}`);
//                   }}
//                 >
//                   Activate
//                 </button>
//               )}
//               {webPaidUntil && (
//                 <div className="flex items-baseline ml-4">
//                   <span
//                     className={`inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
//                   >
//                     {format(parseISO(webPaidUntil), "MMM do yyyy")}
//                   </span>
//                 </div>
//               )}
//               <div className="flex items-baseline ml-4">
//                 <span
//                   className={`inline-block bg-${badgeColor}-200 text-${badgeColor}-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
//                 >
//                   {badgeText}
//                 </span>
//               </div>
//             </div>
//             <Form>
//               <div className="flex flex-wrap -mx-3 mb-6">
//                 <div className="w-full px-3 mb-6 md:mb-0">
//                   <label
//                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                     htmlFor="title"
//                   >
//                     Title
//                   </label>
//                   <Field
//                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//                     id="title"
//                     name="title"
//                     placeholder="Property Title"
//                     type="text"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap -mx-3 mb-6">
//                 <div className="w-full px-3 mb-6 md:mb-0">
//                   <label
//                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                     htmlFor="mainPicture"
//                   >
//                     Main Picture
//                   </label>
//                   <Field
//                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//                     id="mainPicture"
//                     name="mainPicture"
//                     placeholder="Main Picture"
//                     type="text"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap -mx-3 mb-6 my-8">
//                 <div className="w-full px-3">
//                   <button
//                     className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
//                       submitButtonDisabled
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     type="submit"
//                     disabled={submitButtonDisabled}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           </div>
//         );
//       }}
//     </Formik>
//   </div>
// </div>
