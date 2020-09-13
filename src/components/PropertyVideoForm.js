import React, { useState } from "react";
import { Formik, Form } from "formik";
import VideoUrlField from "./VideoUrlField";

export default function PropertyVideoForm({
  uuid,
  saveProperty,
  savePropertyLoading,
  refetch,
  videoType,
  videoUrl,
}) {
  const [formVideoSuccess, setFormVideoSuccess] = useState(false);

  return (
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
          const submitButtonDisabled = isSubmitting || savePropertyLoading;

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
  );
}
