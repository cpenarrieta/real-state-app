import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";

const ME_QUERY = gql`
  query MeQuery {
    me {
      email
      firstName
      lastName
      phone
      address1
      address2
      city
      province
      zipCode
      country
      pictureLowRes
      username
    }
  }
`;

const SAVE_USER_MUTATION = gql`
  mutation SaveUser($user: UserInput) {
    saveUser(user: $user) {
      uuid
    }
  }
`;

const SavedSuccess = () => {
  return (
    <div
      className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 my-8"
      role="alert"
    >
      <p className="font-bold">Success</p>
      <p className="text-sm">Your information was saved successfully</p>
    </div>
  );
};

const uploadSingleFile = async (e) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_SECRET);

  const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  });
  const file = await res.json();
  return [file.secure_url, file.eager[0].secure_url];
};

export default function MyAccount() {
  const { loading, error, data } = useQuery(ME_QUERY);
  const [
    saveUser,
    { loading: saveUserLoading, error: saveUserError },
  ] = useMutation(SAVE_USER_MUTATION);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const {
    email,
    firstName,
    lastName,
    phone,
    pictureLowRes,
    address1,
    address2,
    city,
    province,
    zipCode,
    username,
  } = data?.me;

  return (
    <div className="flex justify-center">
      {saveUserLoading && <p>Loading...</p>}
      {saveUserError && <p>Error... Please try again</p>}

      <Formik
        initialValues={{
          email: email || "",
          firstName: firstName || "",
          lastName: lastName || "",
          phone: phone || "",
          address1: address1 || "",
          address2: address2 || "",
          city: city || "",
          province: province || "",
          zipCode: zipCode || "",
          username: username || "",
        }}
        onSubmit={async (values) => {
          await saveUser({
            variables: {
              user: {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                province: values.province,
                zipCode: values.zipCode,
                picture: largeImage,
                pictureLowRes: image,
              },
            },
          });

          setShowSuccess(true);
        }}
      >
        {({ isSubmitting }) => {
          const submitButtonDisabled = uploadImageLoading || isSubmitting;

          return (
            <div className="w-full max-w-3xl">
              <Form className="">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Jane.Dow@gmail.com"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="4023658899"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="address1"
                    >
                      Address
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="address1"
                      name="address1"
                      type="text"
                      placeholder="address 1"
                    />
                  </div>
                  <div className="w-full px-3">
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="address2"
                      name="address2"
                      type="text"
                      placeholder="address 2"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Vancouver"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="province"
                    >
                      State
                    </label>
                    <div className="relative">
                      <Field
                        component="select"
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="province"
                        name="province"
                        multiple={false}
                      >
                        <option value="">Please Select</option>
                        <option value="BC">British Columbia</option>
                        <option value="ON">Ontario</option>
                        <option value="AL">Alberta</option>
                      </Field>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="zipCode"
                    >
                      Zip
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      placeholder="V2Y0Y6"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="file"
                    >
                      {uploadImageLoading ? "Uploading image..." : "Image"}
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="file"
                      id="file"
                      name="file"
                      placeholder="Upload an image"
                      onChange={async (e) => {
                        setUploadImageLoading(true);
                        const [
                          imageRes,
                          largeImageRes,
                        ] = await uploadSingleFile(e);

                        setLargeImage(largeImageRes);
                        setImage(imageRes);
                        setUploadImageLoading(false);
                      }}
                    />
                    {(image || pictureLowRes) && (
                      <div className="flex justify-center">
                        <img
                          width="200"
                          src={image || pictureLowRes}
                          alt="Upload Preview"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6 my-8">
                  <div className="w-full px-3">
                    <button
                      className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
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

              {showSuccess && <SavedSuccess />}
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
