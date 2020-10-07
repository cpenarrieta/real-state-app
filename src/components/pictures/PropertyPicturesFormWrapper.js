import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import PropertyPicturesForm from "./PropertyPicturesForm";
import { ImagesGridProvider } from "./ImagesGridContext";
import { useAlert } from "../../context/AlertContext";

const IMAGES_QUERY = gql`
  query PropertyImages($uuid: String!) {
    propertyImages(uuid: $uuid) {
      id
      title
      url
      urlLowRes
      order
    }
  }
`;

export default function PropertyPicturesFormWrapper({
  saveProperty,
  savePropertyLoading,
  mainImageId,
  mainPictureLowRes,
}) {
  const { propertyId } = useParams();
  const { loading, error, data, refetch: refetchGetImages } = useQuery(
    IMAGES_QUERY,
    {
      variables: { uuid: propertyId },
    }
  );
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

  if (loading) return <p>loading</p>;

  const images = data?.propertyImages;

  return (
    <ImagesGridProvider initialItems={images}>
      <PropertyPicturesForm
        saveProperty={saveProperty}
        savePropertyLoading={savePropertyLoading}
        refetchGetImages={refetchGetImages}
        mainImageId={mainImageId}
        mainPictureLowRes={mainPictureLowRes}
      />
    </ImagesGridProvider>
  );
}
