import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { DASHBOARD_QUERY } from "../queries/dashboard";
import { format, parseISO, compareAsc } from "date-fns";
import { getPropertyBadge } from "../util/propertyStatus";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      title
      price
      mainPicture
      status
      publishedStatus
      webPaidUntil
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
    { loading: savePropertyLoading, error: savePropertyError },
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
    title,
    mainPicture,
    webPaidUntil,
    status,
    publishedStatus,
  } = data?.property;

  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);

  const savePropertyFunc = async (values) => {
    await saveProperty({
      variables: {
        property: {
          uuid,
          title: values.title,
          mainPicture: values.mainPicture,
        },
      },
    });
  };

  const validPayment =
    webPaidUntil && compareAsc(parseISO(webPaidUntil), new Date()) === 1;

  return (
    <div>
      <div className="flex justify-center">
        {(savePropertyLoading || publishPropertyLoading) && <p>Loading...</p>}
        {savePropertyError && <p>Error... Please try again</p>}
        {publishPropertyError && <p>Error publishing</p>}

        <Formik
          initialValues={{
            title: title || "",
            mainPicture: mainPicture || "",
          }}
          onSubmit={async (values) => {
            await savePropertyFunc(values);
            refetch();
          }}
        >
          {({ values, isSubmitting }) => {
            const submitButtonDisabled = isSubmitting;

            return (
              <div className="w-full max-w-3xl">
                <div className="flex justify-center">
                  {publishedStatus === "PUBLISHED" && validPayment && (
                    <Link
                      to={`/property/${propertyId}`}
                      target="_blank"
                      className="text-indigo-500 font-bold hover:text-indigo-700"
                    >
                      Live Page
                    </Link>
                  )}
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={() =>
                      history.push(`/manage-property/preview/${propertyId}`)
                    }
                  >
                    Preview
                  </button>
                  {validPayment && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      onClick={async () => {
                        await savePropertyFunc(values);
                        await publishProperty({
                          variables: {
                            propertyUuid: propertyId,
                          },
                        });
                        refetchGetProperty();
                        refetch();
                      }}
                    >
                      Publish
                    </button>
                  )}
                  {!validPayment && (
                    <button
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4"
                      onClick={() => {
                        history.push(`/payment/${propertyId}`);
                      }}
                    >
                      Activate
                    </button>
                  )}
                  {webPaidUntil && (
                    <div className="flex items-baseline ml-4">
                      <span
                        className={`inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
                      >
                        {format(parseISO(webPaidUntil), "MMM do yyyy")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline ml-4">
                    <span
                      className={`inline-block bg-${badgeColor}-200 text-${badgeColor}-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
                    >
                      {badgeText}
                    </span>
                  </div>
                </div>
                <Form>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="title"
                        name="title"
                        placeholder="Property Title"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="mainPicture"
                      >
                        Main Picture
                      </label>
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="mainPicture"
                        name="mainPicture"
                        placeholder="Main Picture"
                        type="text"
                      />
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
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
