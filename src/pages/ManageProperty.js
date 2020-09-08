import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { DASHBOARD_QUERY } from "../queries/dashboard";
import { format, parseISO, compareAsc } from "date-fns";
import { getPropertyBadge } from "../util/propertyStatus";
import { useAlert } from "../context/AlertContext";
import RadioButtons from "../components/RadioButtons";
import { TextField } from "../components/TextField";
import * as Yup from "yup";

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
      mainPictureLowRes
      status
      publishedStatus
      webPaidUntil
      username
      lat
      lon
    }
  }
`;

const SAVE_PROPERTY_MUTATION = gql`
  mutation SaveProperty($property: PropertyInput) {
    saveProperty(property: $property) {
      uuid
      title
    }
  }
`;

const PUBLISH_PROPERTY_MUTATION = gql`
  mutation PublishProperty($propertyUuid: String) {
    publishProperty(propertyUuid: $propertyUuid)
  }
`;

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
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(SAVE_PROPERTY_MUTATION);
  const [
    publishProperty,
    { loading: publishPropertyLoading, error: publishPropertyError },
  ] = useMutation(PUBLISH_PROPERTY_MUTATION);
  const { refetch } = useQuery(DASHBOARD_QUERY);
  const { setShowAlert } = useAlert();
  const [form1Success, setForm1Success] = useState(false);

  useEffect(() => {
    if (savePropertyError) {
      setShowAlert(true);
    }
  }, [savePropertyError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const {
    uuid,
    mainPicture,
    mainPictureLowRes,
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
    lat,
    lon,
  } = data?.property;

  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);

  const validPayment =
    webPaidUntil && compareAsc(parseISO(webPaidUntil), new Date()) === 1;

  return (
    <div className="">
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
              }}
              onSubmit={async (values) => {
                const res = await saveProperty({
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
                    },
                  },
                });
                setForm1Success(true);
              }}
            >
              {({ isSubmitting, errors, touched }) => {
                const submitButtonDisabled =
                  isSubmitting || savePropertyLoading;

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
                            <TextField
                              id="price"
                              name="price"
                              type="number"
                              placeholder="Property price in $"
                              label="Price ($)"
                              labelClass="block text-sm font-medium leading-5 text-gray-700"
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
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
                        {form1Success && (
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

                    {lat && lon && (
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
                          <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=11&size=600x300&maptype=roadmap
  &markers=color:red%7Clabel:A%7C${lat},${lon}
  &key=${process.env.REACT_APP_MAPS_KEY}`}
                          />
                        </a>
                      </div>
                    )}
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
