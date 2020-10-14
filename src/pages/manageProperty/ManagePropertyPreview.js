import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { PropertyPage } from "@cpenarrieta/real-state-property-components";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      title
      price
      currency
      lotSize
      builtYear
      grossTaxesLastYear
      bedrooms
      bathrooms
      propertyType
      description
      listingId
      mainPicture
      mainPictureLowRes
      mainImageId
      status
      publishedStatus
      username
      videoUrl
      videoType
      address1
      zipCode
      city
      province
      community
      country
      lat
      lon
      color
      hidePrice
      strata
    }
    attachments(uuid: $uuid) {
      id
      title
      url
    }
    me {
      email
      firstName
      lastName
      phone
      address
      address1
      address2
      city
      province
      zipCode
      country
      picture
      pictureLowRes
      username
      smallBio
    }
    otherProperties(uuid: $uuid) {
      title
      uuid
      bedrooms
      bathrooms
      price
      mainPictureLowRes
      currency
      status
      city
    }
    propertyImages(uuid: $uuid) {
      id
      order
      title
      description
      url
      urlLowRes
    }
  }
`;

export default function ManagePropertyPreview() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(PROPERTY_QUERY, {
    variables: { uuid: propertyId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const property = data?.property;
  const attachments = data?.attachments;
  const otherProperties = data?.otherProperties;
  const images = data?.propertyImages;
  const {
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    phone: userPhone,
    picture: userPicture,
    pictureLowRes: userPictureLowRes,
    address1: userAddress1,
    address2: userAddress2,
    city: userCity,
    province: userProvince,
    zipCode: userZipCode,
    country: userCountry,
    smallBio: userSmallBio,
    username,
  } = data?.me;

  return (
    <PropertyPage
      {...property}
      attachments={attachments}
      otherProperties={otherProperties}
      images={images}
      mapKey={process.env.REACT_APP_MAPS_KEY}
      username={username}
      visitorSource="preview"
      userEmail={userEmail}
      userFirstName={userFirstName}
      userLastName={userLastName}
      userPhone={userPhone}
      userPicture={userPicture}
      userPictureLowRes={userPictureLowRes}
      userAddress1={userAddress1}
      userAddress2={userAddress2}
      userCity={userCity}
      userProvince={userProvince}
      userZipCode={userZipCode}
      userCountry={userCountry}
      userSmallBio={userSmallBio}
    />
  );
}
