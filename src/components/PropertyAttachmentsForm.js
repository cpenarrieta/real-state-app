import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation, gql } from "@apollo/client";
import TextField from "./TextField";
import DeleteAttachmentModal from "./DeleteAttachmentModal";

const S3_SIGN_MUTATION = gql`
  mutation SignS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      signedRequest
      url
    }
  }
`;

const SAVE_ATTACHMENT_MUTATION = gql`
  mutation SaveAttachment($url: String!, $title: String!, $uuid: String!) {
    saveAttachment(url: $url, title: $title, uuid: $uuid)
  }
`;

const ATTACHMENTS_QUERY = gql`
  query Attachments($uuid: String!) {
    attachments(uuid: $uuid) {
      id
      title
      url
    }
  }
`;

const formatFilename = (filename, propertyId) => {
  const date = format(new Date(), "yyyyLLdd");
  const randomString = Math.random().toString(36).substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `attachments/${propertyId}/${date}-${randomString}-${cleanFileName}`;
  return newFilename.substring(0, 60);
};

export default function PropertyAttachmentsForm() {
  const { propertyId } = useParams();
  const [file, setFile] = useState();
  const [formAttachmentsSuccess, setFormAttachmentsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState();

  const { loading, error, data, refetch } = useQuery(ATTACHMENTS_QUERY, {
    variables: { uuid: propertyId },
  });
  const [signS3, { loading: loadingSignS3, error: errorSignS3 }] = useMutation(
    S3_SIGN_MUTATION
  );
  const [
    saveAttachment,
    { loading: loadingSaveAttachment, error: errorSaveAttachment },
  ] = useMutation(SAVE_ATTACHMENT_MUTATION);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setFormAttachmentsSuccess(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 3000000,
    accept: "application/pdf",
  });

  useEffect(() => {
    if (formAttachmentsSuccess) {
      const handler = window.setTimeout(() => {
        setFormAttachmentsSuccess(false);
      }, 1000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [formAttachmentsSuccess]);

  const uploadToS3 = async (signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const saveAttachmentClick = async ({ attachmentTitle }) => {
    const response = await signS3({
      variables: {
        filename: formatFilename(attachmentTitle || file.name, propertyId),
        filetype: file.type,
      },
    });

    const { signedRequest, url } = response?.data?.signS3;
    await uploadToS3(signedRequest);
    await saveAttachment({
      variables: {
        url,
        title: attachmentTitle,
        uuid: propertyId,
      },
    });
    setFile(null);
    setFormAttachmentsSuccess(true);
    await refetch();
  };

  const attachments = data?.attachments;

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
        initialValues={{
          attachmentTitle: "",
        }}
        onSubmit={saveAttachmentClick}
      >
        {({ isSubmitting, handleSubmit, values }) => {
          const submitButtonDisabled =
            isSubmitting ||
            loadingSaveAttachment ||
            loadingSignS3 ||
            !(file && values.attachmentTitle);

          return (
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  {attachments?.length > 0 && (
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
                                  {attachments.map((attachment) => (
                                    <tr key={attachment.id}>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        {attachment.title}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                        <a
                                          className="text-indigo-600 hover:text-indigo-900"
                                          href={attachment.url}
                                          rel="noopener noreferrer"
                                          target="_blank"
                                        >
                                          Download
                                        </a>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                        <button
                                          className="text-red-600 hover:text-red-900"
                                          onClick={() => {
                                            setAttachmentToDelete(
                                              attachment.id
                                            );
                                            setShowModal(true);
                                          }}
                                        >
                                          Remove
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Form className="col-span-6 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextField
                        id="attachmentTitle"
                        name="attachmentTitle"
                        type="text"
                        label="Attachment Title"
                        labelClass="block text-sm font-medium leading-5 text-gray-700"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Attachment
                      </label>
                      <div
                        className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                          isDragActive ? "bg-green-100" : ""
                        }`}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div className="text-center">
                          {!file && (
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          )}
                          {file && (
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
                                Set an Attachment title and click Save.
                              </p>
                            </>
                          )}
                          <p className="mt-1 text-sm text-gray-600">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                              Upload a file
                            </button>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            .PDF up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row-reverse">
                <button
                  className={`inline-flex items-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out ${
                    submitButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSubmit}
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
                {formAttachmentsSuccess && (
                  <p className="text-sm text-green-500 py-2 px-4">
                    Attachments Saved!
                  </p>
                )}
              </div>
            </div>
          );
        }}
      </Formik>
      <DeleteAttachmentModal
        showModal={showModal}
        setShowModal={setShowModal}
        attachmentToDelete={attachmentToDelete}
        refetch={refetch}
      />
    </div>
  );
}
