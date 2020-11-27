import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { PropertyPage } from "@cpenarrieta/real-state-property-components";
import { parseISO } from "date-fns";
import { Link, useRouteMatch } from "react-router-dom";
import Loading from '../../components/Loading'
import Error from '../../components/Error'

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
  const matchNewWindow = useRouteMatch("/preview/:propertyId");

  if (loading) return <Loading />;
  if (error) return <Error />;

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
    <div>
      <div className="bg-white px-1 py-2 border-b border-logoRed sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-4 grid grid-cols-4 gap-5">
            <h3 className="text-lg leading-6 font-medium text-gray-600">
              Preview Page
            </h3>

            {!matchNewWindow && (
              <span className="inline-flex rounded-md ">
                <Link
                  to={`/preview/${propertyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-logoFont bg-logoPink hover:bg-logoRed-500 focus:outline-none focus:border-logoRed hover:text-white focus:shadow-outline-indigo active:bg-logoRed transition ease-in-out duration-150"
                >
                  <svg
                    className="-ml-0.5 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  New Window
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
}
