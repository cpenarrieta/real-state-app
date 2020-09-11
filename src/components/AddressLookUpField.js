import React, { useEffect, useState } from "react";
import TextField from "./TextField";
import { useFormikContext } from "formik";

const componentForm = {
  street_number: "short_name",
  neighborhood: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "short_name",
  postal_code: "short_name",
};

export default function AddressLookUpField() {
  const [addressResult, setAddressResult] = useState();
  const {
    values: { searchAddress },
    touched,
    setFieldValue,
  } = useFormikContext();

  
  useEffect(() => {
    let autocomplete;
    var script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&callback=initAutocomplete&libraries=places&v=weekly`;
    script.defer = true;
    document.head.appendChild(script);

    window.fillInAddress = function () {
      const place = autocomplete.getPlace();
      const res = {
        geometry: place.geometry.location,
      };
      for (const component of place.address_components) {
        const addressType = component.types[0];

        if (componentForm[addressType]) {
          const val = component[componentForm[addressType]];
          res[addressType] = val;
        }
      }
      setAddressResult(res);
    };

    window.initAutocomplete = function () {
      autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("searchAddress"),
        { types: ["geocode"] }
      );
      autocomplete.setFields(["address_component", "geometry"]);
      autocomplete.addListener("place_changed", window.fillInAddress);
    };
  }, []);

  useEffect(() => {
    if (
      addressResult &&
      Object.keys(addressResult).length > 0 &&
      searchAddress.trim() !== "" &&
      touched.searchAddress
    ) {
      setFieldValue("lat", addressResult.geometry.lat());
      setFieldValue("lon", addressResult.geometry.lng());

      if (addressResult.country) {
        setFieldValue("country", addressResult.country);
      }
      if (addressResult.administrative_area_level_1) {
        if (addressResult.country === "US") {
          setFieldValue(
            "provinceUSA",
            addressResult.administrative_area_level_1
          );
        }
        if (addressResult.country === "CA") {
          setFieldValue(
            "provinceCA",
            addressResult.administrative_area_level_1
          );
        }
      }
      if (addressResult.locality) {
        setFieldValue("city", addressResult.locality);
      }
      if (addressResult.postal_code) {
        setFieldValue("zipCode", addressResult.postal_code);
      }
      if (addressResult.neighborhood) {
        setFieldValue("community", addressResult.neighborhood);
      }
      if (addressResult.route && addressResult.street_number) {
        setFieldValue(
          "address1",
          `${addressResult.street_number} ${addressResult.route}`
        );
      }
    }
  }, [addressResult, searchAddress, touched.searchAddress, setFieldValue]);

  return (
    <TextField
      id="searchAddress"
      name="searchAddress"
      label="Property Address"
      placeholder="Enter the property address"
      labelClass="block text-sm font-medium leading-5 text-gray-700"
      className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
    />
  );
}
