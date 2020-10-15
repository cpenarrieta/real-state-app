import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { PropertyPage } from "@cpenarrieta/real-state-property-components";
import { parseISO } from "date-fns";

const formatData = (propertyOpenHouse) => {
  return propertyOpenHouse?.map((o) => {
    return {
      id: o.id,
      date: parseISO(o.date.substring(0, o.date.length - 1)),
      start: parseISO(o.timeStart.substring(0, o.timeStart.length - 1)),
      end: parseISO(o.timeEnd.substring(0, o.timeEnd.length - 1)),
    };
  });
};

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
      uuid
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
      uuid
      title
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
    propertyOpenHouse(uuid: $uuid) {
      id
      date
      timeStart
      timeEnd
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
  const openHouseData = formatData(data?.propertyOpenHouse || []);

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
      openHouse={openHouseData}
    />
  );
}
