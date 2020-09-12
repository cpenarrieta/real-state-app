import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { useAlert } from "../context/AlertContext";
import RadioButtons from "../components/RadioButtons";
import TextField from "../components/TextField";
import PriceField from "../components/PriceField";
import VideoUrlField from "../components/VideoUrlField";
import AddressLookUpField from "../components/AddressLookUpField";
import AttachmentsDropZone from "../components/AttachmentsDropZone";
import { singleImageUpload } from "../util/imageUpload";
import * as Yup from "yup";

const SAVE_PROPERTY_MUTATION = gql`
  mutation SaveProperty($property: PropertyInput) {
    saveProperty(property: $property) {
      uuid
      title
    }
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

export default function ManagePropertyEdit({
  uuid,
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
  videoUrl,
  videoType,
  address1,
  zipCode,
  city,
  province,
  community,
  country,
  lat,
  lon,
  mainPictureLowRes,
  refetch,
}) {
  const [
    saveProperty,
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(SAVE_PROPERTY_MUTATION);
  const { setShowAlert } = useAlert();
  const [formDetailsSuccess, setFormDetailsSuccess] = useState(false);
  const [formLocationSuccess, setFormLocationSuccess] = useState(false);
  const [formPicturesSuccess, setFormPicturesSuccess] = useState(false);
  const [formVideoSuccess, setFormVideoSuccess] = useState(false);
  const [mainPictureUpload, setMainPictureUpload] = useState();
  const [mainPictureLowResUpload, setMainPictureLowResUpload] = useState();
  const [uploadMainImageLoading, setUploadMainImageLoading] = useState(false);

  useEffect(() => {
    if (savePropertyError) {
      setShowAlert(true);
    }
  }, [savePropertyError, setShowAlert]);

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
                currency: currency || "CAD",
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
                    },
                  },
                });
                setFormDetailsSuccess(true);
                refetch();
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
                  values.country === "US"
                    ? values.provinceUSA
                    : values.provinceCA;
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
                const submitButtonDisabled =
                  isSubmitting || savePropertyLoading;

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
                Pictures
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property pictures....
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Formik
              initialValues={{}}
              onSubmit={async (values) => {
                await saveProperty({
                  variables: {
                    property: {
                      uuid,
                      mainPicture: mainPictureUpload || null,
                      mainPictureLowRes: mainPictureLowResUpload || null,
                    },
                  },
                });
                setFormPicturesSuccess(true);
              }}
            >
              {({ isSubmitting }) => {
                const submitButtonDisabled =
                  isSubmitting || savePropertyLoading;

                return (
                  <Form>
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
                                  <label
                                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out cursor-pointer"
                                    htmlFor="mainPicture"
                                  >
                                    Upload file
                                  </label>
                                  <input
                                    className="w-0 h-0 overflow-hidden absolute z--1"
                                    type="file"
                                    id="mainPicture"
                                    onChange={async (e) => {
                                      setUploadMainImageLoading(true);
                                      const [
                                        lowRes,
                                        largeRes,
                                      ] = await singleImageUpload(
                                        e,
                                        uuid,
                                        process.env
                                          .REACT_APP_CLOUDINARY_PROPERTY_PRESET
                                      );

                                      setMainPictureLowResUpload(lowRes);
                                      setMainPictureUpload(largeRes);
                                      setUploadMainImageLoading(false);
                                    }}
                                  />{" "}
                                  or drag and drop
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  PNG, JPG up to 5MB
                                </p>
                              </div>
                            </div>
                            {(mainPictureLowRes || mainPictureLowResUpload) && (
                              <div className="flex">
                                <img
                                  width="200"
                                  src={
                                    mainPictureLowRes || mainPictureLowResUpload
                                  }
                                  alt="Upload Preview"
                                />
                              </div>
                            )}
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
                        {formPicturesSuccess && (
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
                Video
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property video....
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Formik
              initialValues={{
                videoUrl: "",
                videoType: videoType || "",
                videoId: videoUrl || "",
              }}
              onSubmit={async (values) => {
                await saveProperty({
                  variables: {
                    property: {
                      uuid,
                      videoType: values.videoType || null,
                      videoUrl: values.videoId,
                    },
                  },
                });
                setFormVideoSuccess(true);
                refetch();
              }}
            >
              {({ values, isSubmitting }) => {
                const submitButtonDisabled =
                  isSubmitting || savePropertyLoading;

                return (
                  <Form>
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <VideoUrlField
                              id="videoUrl"
                              name="videoUrl"
                              label="Video URL"
                              placeholder="paste your video url here"
                              labelClass="block text-sm font-medium leading-5 text-gray-700"
                              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                              Supported video prodivers: YouTube and Vimeo
                            </p>
                          </div>

                          {values.videoId && (
                            <div className="col-span-6">
                              <div className="px-1">
                                {values.videoType === "YOUTUBE" && (
                                  <iframe
                                    className="mx-auto w-full h-64 md:h-85"
                                    src={`https://www.youtube-nocookie.com/embed/${values.videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Property video"
                                  ></iframe>
                                )}
                                {values.videoType === "VIMEO" && (
                                  <iframe
                                    className="mx-auto w-full h-64 md:h-85"
                                    src={`https://player.vimeo.com/video/${values.videoId}?title=0&byline=0&portrait=0`}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    title="Property video"
                                  ></iframe>
                                )}
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
                        {formVideoSuccess && (
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
                Attachments
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property attachments....
              </p>
            </div>
          </div>
          <AttachmentsDropZone />
        </div>
      </div>
    </div>
  );
}
