import React, { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import { singleImageUpload, multipleImageUpload } from "../util/imageUpload";
import { useDropzone } from "react-dropzone";

export default function PropertyPicturesForm({
  uuid,
  saveProperty,
  savePropertyLoading,
  mainPictureLowRes,
  pictures = [],
  refetch,
}) {
  const [formPicturesSuccess, setFormPicturesSuccess] = useState(false);

  const [fileMain, setFileMain] = useState();
  const [fileMainUrl, setFileMainUrl] = useState();
  const onDropMain = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length <= 0) return;

    setFileMainUrl(URL.createObjectURL(acceptedFiles[0]));
    setFileMain(acceptedFiles[0]);
    setFormPicturesSuccess(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropMain,
    maxSize: 3000000,
    accept: "image/jpeg, image/png",
    multiple: false,
  });

  const [files, setFiles] = useState([]);
  const onDropRest = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length <= 0) return;
    setFiles((f) => {
      // TODO logic for existing images
      if (f.length <= 0) {
        return acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          })
        );
      }
      return f.concat(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          })
        )
      );
    });
    setFormPicturesSuccess(false);
  }, []);
  const {
    getRootProps: getRootPropsRest,
    getInputProps: getInputPropsRest,
    isDragActive: isDragActiveRest,
  } = useDropzone({
    onDrop: onDropRest,
    maxSize: 3000000,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{}}
        onSubmit={async (values) => {
          let lowRes, largeRes, resImages;
          if (fileMain) {
            [lowRes, largeRes] = await singleImageUpload(
              fileMain,
              uuid,
              process.env.REACT_APP_CLOUDINARY_PROPERTY_PRESET
            );
          }
          if (files.length > 0) {
            resImages = await multipleImageUpload(
              files,
              uuid,
              process.env.REACT_APP_CLOUDINARY_PROPERTY_PRESET
            );
          }
          await saveProperty({
            variables: {
              property: {
                uuid,
                mainPicture: largeRes || null,
                mainPictureLowRes: lowRes || null,
                pictures: resImages ? resImages.map((r) => r[1]) : null,
              },
            },
          });
          setFormPicturesSuccess(true);
          refetch();
        }}
      >
        {({ isSubmitting }) => {
          const submitButtonDisabled =
            isSubmitting ||
            savePropertyLoading ||
            !(fileMain || files.length > 0);

          return (
            <Form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Cover Photo
                      </label>
                      <div
                        className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                          isDragActive ? "bg-green-100" : ""
                        }`}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div className="text-center">
                          {!fileMain && (
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
                          )}
                          {fileMain && (
                            <>
                              <svg
                                className="mx-auto h-12 w-12 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                              </svg>
                              <p className="mt-1 text-xs text-gray-500">
                                Now click Save.
                              </p>
                            </>
                          )}
                          <p className="mt-1 text-sm text-gray-600">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                              Upload a single file
                            </button>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG up to 3MB per file
                          </p>
                        </div>
                      </div>
                      {(fileMainUrl || mainPictureLowRes) && (
                        <img
                          className="col-span-6 mt-1 rounded-sm"
                          style={{
                            maxWidth: "400px",
                          }}
                          src={fileMainUrl || mainPictureLowRes}
                        />
                      )}
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Pictures
                      </label>
                      <div
                        className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                          isDragActiveRest ? "bg-green-100" : ""
                        }`}
                        {...getRootPropsRest()}
                      >
                        <input {...getInputPropsRest()} />
                        <div className="text-center">
                          {files.length <= 0 && (
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
                          )}
                          {files.length > 0 && (
                            <>
                              <svg
                                className="mx-auto h-12 w-12 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                              </svg>
                              <p className="mt-1 text-xs text-gray-500">
                                Now click Save.
                              </p>
                            </>
                          )}
                          <p className="mt-1 text-sm text-gray-600">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                              Upload all of your property pictures
                            </button>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG up to 3MB per file
                          </p>
                        </div>
                      </div>
                      {files.length > 0 ? (
                        <div className="grid grid-cols-6 gap-6 mt-1">
                          {files.map((f) => (
                            <img
                              key={f.url}
                              className="col-span-1 rounded-sm"
                              src={f.url}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-6 gap-6 mt-1">
                          {pictures?.map((p) => (
                            <img
                              key={p}
                              className="col-span-1 rounded-sm"
                              src={p}
                            />
                          ))}
                        </div>
                      )}
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
  );
}
