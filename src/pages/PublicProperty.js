import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyPage from "../components/property/PropertyPage";

export default function PublicProperty() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    async function getProperty(propertyId) {
      let response = await fetch(
        `${process.env.REACT_APP_STATIC_URI}property/${propertyId}`
      );
      const data = await response.json();

      if (data && data.uuid) {
        setProperty(data);
      } else {
        setQueryDone(true);
      }
    }

    getProperty(propertyId);
    // eslint-disable-next-line
  }, []);

  if (!property && !queryDone) {
    return <div>Load schelethon</div>;
  }

  if (!property && queryDone) {
    return <div>Error or redirect to Home</div>;
  }

  return <PropertyPage {...property} />;
}
