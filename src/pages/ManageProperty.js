import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { DASHBOARD_QUERY } from "../queries/dashboard";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      title
      price
      mainPicture
      status
      publishedStatus
    }
  }
`;

const NEW_PROPERTY_MUTATION = gql`
  mutation SaveProperty($property: PropertyInput) {
    saveProperty(property: $property) {
      uuid
      title
      mainPicture
    }
  }
`;

export default function ManageProperty() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(PROPERTY_QUERY, {
    variables: { uuid: propertyId },
  });
  const [
    saveProperty,
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(NEW_PROPERTY_MUTATION);
  const { refetch } = useQuery(DASHBOARD_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const { uuid, title, mainPicture } = data?.property;

  return (
    <div>
      <h3>Manage your Property</h3>
      {savePropertyLoading && <p>Loading...</p>}
      {savePropertyError && <p>Error... Please try again</p>}
      <Formik
        initialValues={{
          title: title || "",
          mainPicture: mainPicture || "",
        }}
        onSubmit={async (values) => {
          await saveProperty({
            variables: {
              property: {
                uuid,
                title: values.title,
                mainPicture: values.mainPicture,
              },
            },
          });

          refetch();
        }}
      >
        <Form>
          <label htmlFor="title">Property Title</label>
          <Field id="title" name="title" placeholder="Property Title" />

          <label htmlFor="mainPicture">Main Picture</label>
          <Field
            id="mainPicture"
            name="mainPicture"
            placeholder="Main Picture"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}