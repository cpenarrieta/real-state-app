import React from "react";
import { useParams } from "react-router-dom";

export default function PropertyManage() {
  const { propertyId } = useParams();

  return <div>Current Property: {propertyId}</div>;
}
