import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useAlert } from "../../context/AlertContext";
import PropertyVideoForm from "../../components/video/PropertyVideoForm";
import PropertyAttachmentsForm from "../../components/attachments/PropertyAttachmentsForm";
import PropertyLocationForm from "../../components/address/PropertyLocationForm";
import PropertyDetailsForm from "../../components/details/PropertyDetailsForm";
import PropertyPicturesFormWrapper from "../../components/pictures/PropertyPicturesFormWrapper";
import PropertyThemeForm from "../../components/theme/PropertyThemeForm";
import OpenHouseForm from "../../components/openhouse/OpenHouseForm";
import { PROPERTY_QUERY } from "../../queries/getProperty";

const SAVE_PROPERTY_MUTATION = gql`
  mutation SaveProperty($property: PropertyInput) {
    saveProperty(property: $property) {
      uuid
      title
    }
  }
`;

export default function ManagePropertyEdit({
  uuid,
  price,
  currency,
  lotSize,
  builtYear,
  grossTaxesLastYear,
  bedrooms,
  bathrooms,
  propertyType,
  description,
  listingId,
  videoUrl,
  videoType,
  address1,
  zipCode,
  city,
  province,
  community,
  country,
  lat,
  lon,
  mainImageId,
  mainPictureLowRes,
  color,
  hidePrice,
  strata,
  openHouseActive,
}) {
  const [
    saveProperty,
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(SAVE_PROPERTY_MUTATION, {
    refetchQueries: [
      {
        query: PROPERTY_QUERY,
        variables: { uuid },
      },
    ],
    awaitRefetchQueries: true,
  });
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (savePropertyError) {
      setShowAlert(true);
    }
  }, [savePropertyError, setShowAlert]);

  return (
    <div className="">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Property Details
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                khjg asdfjkhg asdfjkhg oigsdafoiga sdfklhbxz cvlkhbxd fois
                dfgoisadfkh sdf
              </p>
            </div>
          </div>
          <PropertyDetailsForm
            uuid={uuid}
            saveProperty={saveProperty}
            savePropertyLoading={savePropertyLoading}
            price={price}
            currency={currency}
            lotSize={lotSize}
            builtYear={builtYear}
            grossTaxesLastYear={grossTaxesLastYear}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            propertyType={propertyType}
            description={description}
            listingId={listingId}
            hidePrice={hidePrice}
            strata={strata}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Location
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property address...
              </p>
            </div>
          </div>
          <PropertyLocationForm
            uuid={uuid}
            saveProperty={saveProperty}
            savePropertyLoading={savePropertyLoading}
            address1={address1}
            zipCode={zipCode}
            city={city}
            province={province}
            community={community}
            country={country}
            lat={lat}
            lon={lon}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Pictures
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property pictures....
              </p>
            </div>
          </div>
          <PropertyPicturesFormWrapper
            saveProperty={saveProperty}
            savePropertyLoading={savePropertyLoading}
            mainImageId={mainImageId}
            mainPictureLowRes={mainPictureLowRes}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Video
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property video....
              </p>
            </div>
          </div>
          <PropertyVideoForm
            uuid={uuid}
            saveProperty={saveProperty}
            savePropertyLoading={savePropertyLoading}
            videoType={videoType}
            videoUrl={videoUrl}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Attachments
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Property attachments....
              </p>
            </div>
          </div>
          <PropertyAttachmentsForm />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Open House
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Set open house schedule. Your property website will show open
                house information that is coming next, not if the open house
                date already happened.
              </p>
            </div>
          </div>
          <OpenHouseForm
            uuid={uuid}
            openHouseActive={openHouseActive}
            saveProperty={saveProperty}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-logoFont">
                Theme and Colors
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                theme and colors....
              </p>
            </div>
          </div>
          <PropertyThemeForm
            uuid={uuid}
            saveProperty={saveProperty}
            savePropertyLoading={savePropertyLoading}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}
