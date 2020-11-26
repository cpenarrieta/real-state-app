import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { multipleImageUpload } from "../../util/imageUpload";
import PropertyPicture from "./PropertyPicture";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useImagesGrid } from "./ImagesGridContext";
import DragItem from "./DragItem";
import { useAlert } from "../../context/AlertContext";
import { mobileAndTabletCheck } from "../../util/checkMobileOrTablet";

const SAVE_IMAGES_MUTATION = gql`
  mutation SavePropertyImages($images: [ImagesInput]!, $uuid: String!) {
    savePropertyImages(images: $images, uuid: $uuid)
  }
`;

const MAX_IMAGE_SIZE = 50;

export default function PropertyPicturesForm({
  saveProperty,
  refetchGetImages,
  mainImageId,
  mainPictureLowRes,
}) {
  const { propertyId } = useParams();
  const [savePropertyImages, { error: errorSavePropertyImages }] = useMutation(
    SAVE_IMAGES_MUTATION
  );
  const [files, setFiles] = useState([]);
  const [formPicturesSuccess, setFormPicturesSuccess] = useState(false);
  const { items, moveItem, setItems } = useImagesGrid();
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (errorSavePropertyImages) {
      setShowAlert(true);
    }
  }, [errorSavePropertyImages, setShowAlert]);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length <= 0) return;
    setFiles((f) => {
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 3000000,
    accept:
      "image/jpg, image/jpeg, image/jfif, image/pjpeg, image/pjp, image/png, image/apng, image/bmp, image/gif, image/x-icon, image/svg+xml, image/tiff, image/webp",
  });

  useEffect(() => {
    if (formPicturesSuccess) {
      const handler = window.setTimeout(() => {
        setFormPicturesSuccess(false);
      }, 2000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [formPicturesSuccess]);

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{}}
        onSubmit={async () => {
          if (files && files.length) {
            const resImages = await multipleImageUpload(
              files,
              propertyId,
              process.env.REACT_APP_CLOUDINARY_PROPERTY_PRESET
            );

            await savePropertyImages({
              variables: {
                uuid: propertyId,
                images: resImages,
              },
            });
          }

          setFiles([]);
          setFormPicturesSuccess(true);
          const newImages = await refetchGetImages();
          if (newImages?.data?.propertyImages?.length > 0) {
            setItems(newImages?.data?.propertyImages);
          }
        }}
      >
        {({ isSubmitting }) => {
          const submitButtonDisabled = isSubmitting;

          return (
            <Form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {mainImageId && (
                      <div className="col-span-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Cover Picture
                        </label>
                        <div
                          className={`mt-2 flex justify-center px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md`}
                        >
                          <img src={mainPictureLowRes} alt="Cover Property" />
                        </div>
                      </div>
                    )}
                    {items && items.length > 0 && (
                      <div className="col-span-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Existing Pictures
                        </label>
                        <div
                          className={`mt-2 flex justify-center px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md`}
                        >
                          {mobileAndTabletCheck() && (
                            <DndProvider backend={TouchBackend}>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-1">
                                {items.map((image) => (
                                  <DragItem
                                    key={image.id}
                                    id={image.id}
                                    onMoveItem={moveItem}
                                  >
                                    <PropertyPicture
                                      {...image}
                                      saveProperty={saveProperty}
                                      refetchGetImages={refetchGetImages}
                                      propertyId={propertyId}
                                    />
                                  </DragItem>
                                ))}
                              </div>
                            </DndProvider>
                          )}
                          {!mobileAndTabletCheck() && (
                            <DndProvider backend={HTML5Backend}>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-1">
                                {items.map((image) => (
                                  <DragItem
                                    key={image.id}
                                    id={image.id}
                                    onMoveItem={moveItem}
                                  >
                                    <PropertyPicture
                                      {...image}
                                      saveProperty={saveProperty}
                                      refetchGetImages={refetchGetImages}
                                      propertyId={propertyId}
                                    />
                                  </DragItem>
                                ))}
                              </div>
                            </DndProvider>
                          )}
                        </div>
                      </div>
                    )}
                    {items?.length < MAX_IMAGE_SIZE && (
                      <div className="col-span-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Add more Pictures
                        </label>
                        <div
                          className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                            isDragActive ? "bg-green-100" : ""
                          }`}
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
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
                              <button className="font-medium text-logoRed hover:text-logoRed-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                Upload all of your property pictures
                              </button>{" "}
                              or drag and drop
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG up to 3MB per file
                            </p>
                          </div>
                        </div>
                        {files.length > 0 && (
                          <div className="grid grid-cols-6 gap-6 mt-1">
                            {files.map((f) => (
                              <img
                                key={f.url}
                                className="col-span-1 rounded-sm"
                                src={f.url}
                                alt="file uploaded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {items?.length >= MAX_IMAGE_SIZE && (
                      <div className="col-span-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700 text-center">
                          You reached the maximun amount of pictures (
                          {MAX_IMAGE_SIZE}).
                        </label>
                        <label className="block text-sm leading-5 font-medium text-gray-700 text-center">
                          You can remove some current pictures and replace them
                          with new ones.
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row-reverse">
                  <button
                    className={`inline-flex items-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-logoRed shadow-sm hover:bg-logoRed-500 focus:outline-none focus:shadow-outline-blue active:bg-logoRed-500 transition duration-150 ease-in-out ${
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
                    {isSubmitting ? "Processing" : "Save"}
                  </button>
                  {formPicturesSuccess && (
                    <p className="text-sm text-green-500 py-2 px-4">
                      Pictures Saved!
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
