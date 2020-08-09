import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      title
    }
  }
`;

const NEW_PROPERTY_MUTATION = gql`
  mutation SaveProperty($property: PropertyInput) {
    saveProperty(property: $property) {
      uuid
      title
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
    { loading: savePropertyLoading, error: savePropertyError }, //TODO manage errors
  ] = useMutation(NEW_PROPERTY_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { uuid, title } = data?.property;

  return (
    <div>
      <h3>Manage your Property</h3>
      <Formik
        initialValues={{
          title: title || "",
        }}
        onSubmit={async (values) => {
          const propertyResponse = await saveProperty({
            variables: {
              property: {
                uuid,
                title: values.title,
              },
            },
          });
          console.log(propertyResponse?.data?.saveProperty);
        }}
      >
        <Form>
          <label htmlFor="title">Property Title</label>
          <Field id="title" name="title" placeholder="Property Title" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
