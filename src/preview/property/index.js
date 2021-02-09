import React from "react";
import LeadForm from "./LeadForm";
import ImageGrid from "./ImageGrid";
import Footer from "./Footer";
import OtherProperties from "./OtherProperties";
import PropertyVideo from "./PropertyVideo";
import TechSpecs from "./TechSpecs";
import HeroBackground from "./HeroBackground";

export default function PropertyPage({
  title,
  address1,
  bedrooms,
  bathrooms,
  city,
  province,
  zipCode,
  community,
  lotSize,
  mainPicture,
  price,
  userEmail,
  userPhone,
  userAddress1,
  userCity,
  userProvince,
  userZipcode,
  images,
  otherProperties,
  userFirstName,
  userLastName,
  userPicture,
  status,
  publishedStatus,
  userSmallBio,
  videoUrl,
  videoType,
  description,
  propertyType,
  builtYear,
  grossTaxesLastYear,
  lat,
  lon,
  attachments,
  openHouse,
  color,
  username,
  uuid,
  hidePrice = false,
  strata = false,
  visitorSource = "prod",
  mapKey,
  userInstagramLink,
  userTwitterLink,
  userFacebookLink,
  userWebsite,
  seoTitle,
}) {
  return (
    <div className="h-full bg-gray-50">
      <HeroBackground
        title={title}
        mainPicture={mainPicture}
        price={price}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        city={city}
        province={province}
        status={status}
        publishedStatus={publishedStatus}
        zipCode={zipCode}
        lotSize={lotSize}
        color={color}
        hidePrice={hidePrice}
        openHouse={openHouse}
        uuid={uuid}
        username={username}
        seoTitle={seoTitle}
      />

      {videoUrl && <PropertyVideo videoUrl={videoUrl} videoType={videoType} />}

      {images && <ImageGrid images={images} />}

      <TechSpecs
        address1={address1}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        city={city}
        province={province}
        zipCode={zipCode}
        lotSize={lotSize}
        description={description}
        propertyType={propertyType}
        builtYear={builtYear}
        grossTaxesLastYear={grossTaxesLastYear}
        community={community}
        lat={lat}
        lon={lon}
        attachments={attachments}
        color={color}
        strata={strata}
        mapKey={mapKey}
      />

      <LeadForm
        uuid={uuid}
        username={username}
        userEmail={userEmail}
        userPhone={userPhone}
        userAddress1={userAddress1}
        userCity={userCity}
        userProvince={userProvince}
        userZipcode={userZipcode}
        userFirstName={userFirstName}
        userLastName={userLastName}
        userPicture={userPicture}
        userSmallBio={userSmallBio}
        color={color}
        visitorSource={visitorSource}
        address={`${address1}, ${city}, ${province}`}
        instagramLink={userInstagramLink}
        twitterLink={userTwitterLink}
        facebookLink={userFacebookLink}
        website={userWebsite}
      />

      {otherProperties && otherProperties.length > 0 && (
        <OtherProperties
          otherProperties={otherProperties}
          userFirstName={userFirstName}
          color={color}
          username={username}
        />
      )}

      <Footer color={color} />
    </div>
  );
}
