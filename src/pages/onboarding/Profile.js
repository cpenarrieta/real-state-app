import React, { useState, useCallback } from "react";
import TextField from "../../components/details/TextField";
import { Formik, Field, Form } from "formik";
import { useMutation, gql } from "@apollo/client";
import { singleImageUpload } from "../../util/imageUpload";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";

const SAVE_USER_MUTATION = gql`
  mutation SaveUser($user: UserInput) {
    saveUser(user: $user) {
      uuid
    }
  }
`;

const UserProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[a-zA-Z0-9]*$/, "invalid characters")
    .required("username is required"),
  about: Yup.string().max(500, "Too Long!"),
  firstName: Yup.string()
    .max(500, "Too Long!")
    .required("First Name is required"),
  lastName: Yup.string()
    .max(500, "Too Long!")
    .required("Last Name is required"),
  phone: Yup.string().max(10, "Too Long!").required("Phone is required"),
});

export default function OnboardingProfile({
  firstName,
  lastName,
  phone,
  picture,
  address1,
  city,
  province,
  zipCode,
  country,
  username,
  smallBio,
  email,
}) {
  const [profilePicture, setProfilePictture] = useState();
  const [
    saveUser,
    //TODO { loading: saveUserLoading, error: saveUserError },
  ] = useMutation(SAVE_USER_MUTATION);

  const onDrop = useCallback((acceptedFiles) => {
    setProfilePictture(
      Object.assign(acceptedFiles[0], {
        url: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5000000,
    accept:
      "image/jpg, image/jpeg, image/jfif, image/pjpeg, image/pjp, image/png, image/apng, image/bmp, image/gif, image/x-icon, image/svg+xml, image/tiff, image/webp",
  });

  return (
    <div>
      <Formik
        validationSchema={UserProfileSchema}
        initialValues={{
          username: username || "",
          about: smallBio || "",
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          phone: phone || "",
          country: country || "CA",
          provinceCA: country === "CA" ? province : "",
          provinceUSA: country === "US" ? province : "",
          address1: address1 || "",
          city: city || "",
          zipCode: zipCode || "",
        }}
        onSubmit={async (values) => {
          const prov =
            values.country === "US" ? values.provinceUSA : values.provinceCA;
          const varInput = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            smallBio: values.about,
            username: values.username,
            country: values.country,
            province: prov || null,
            address1: values.address1,
            city: values.city,
            zipCode: values.zipCode,
          };

          if (profilePicture) {
            const [lowImageRes, largeImageRes] = await singleImageUpload(
              profilePicture,
              values.username,
              process.env.REACT_APP_CLOUDINARY_PROFILE_PRESET
            );
            varInput.picture = largeImageRes;
            varInput.pictureLowRes = lowImageRes;
          }

          await saveUser({
            variables: {
              user: varInput,
            },
          });
        }}
      >
        {({ isSubmitting, errors, touched, values }) => {
          const submitButtonDisabled = isSubmitting;

          return (
            <Form>
              <div>
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      This information will be displayed in your property
                      websites so that your leads know about you and how to
                      contact you.
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Username
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            realtorapp.co/
                          </span>
                          <Field
                            id="username"
                            name="username"
                            className="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            type="text"
                          />
                        </div>
                        {errors.username && touched.username ? (
                          <div className="text-sm text-red-400">
                            {errors.username}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                      >
                        About
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <Field
                            className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            id="about"
                            name="about"
                            placeholder=""
                            rows="3"
                            component="textarea"
                            type="text"
                          />
                        </div>
                        {errors.about && touched.about ? (
                          <div className="text-sm text-red-400">
                            {errors.about}
                          </div>
                        ) : null}
                        <p className="mt-2 text-sm text-gray-500">
                          Write a few sentences about yourself.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Photo
                      </label>

                      {(profilePicture || picture) && (
                        <div className="mt-2 sm:mt-0 sm:col-span-1">
                          <div
                            className={`flex justify-center px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md`}
                          >
                            <img
                              src={
                                profilePicture ? profilePicture.url : picture
                              }
                              alt="Profile cover"
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className={`mt-2 sm:mt-0 ${
                          profilePicture || picture
                            ? "sm:col-span-1"
                            : "sm:col-span-2"
                        } `}
                      >
                        <div
                          className={`max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                            isDragActive ? "bg-green-100" : ""
                          }`}
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
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
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                              >
                                Upload a file
                              </button>
                              or drag and drop
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Personal Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      This information will be shared in your websites
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder=""
                        label="First Name"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder=""
                        label="Last Name"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder=""
                        label="Phone Number"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="email"
                        name="email"
                        type="text"
                        placeholder=""
                        label="Email address"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Location
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                      This can be your office or any address where leads can
                      reach you.
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-5">
                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Country
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                          <Field
                            as="select"
                            id="country"
                            name="country"
                            className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          >
                            <option value="CA">Canada</option>
                            <option value="US">United States</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {values.country === "CA" && (
                      <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="provinceCA"
                          className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        >
                          State / Province
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
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
                        </div>
                      </div>
                    )}

                    {values.country === "US" && (
                      <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="provinceUSA"
                          className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        >
                          State / Province
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
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
                        </div>
                      </div>
                    )}

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="address1"
                        name="address1"
                        type="text"
                        placeholder=""
                        label="Address"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="city"
                        name="city"
                        type="text"
                        placeholder=""
                        label="City"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <TextField
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        placeholder=""
                        label="ZIP / Postal"
                        labelClass="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-5">
                <div className="flex justify-end">
                  <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <button
                      className={`inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out ${
                        submitButtonDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      type="submit"
                      disabled={submitButtonDisabled}
                    >
                      {isSubmitting && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {isSubmitting ? "Processing" : "Save & Continue"}
                    </button>
                  </span>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
