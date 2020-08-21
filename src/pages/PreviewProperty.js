import React from 'react'
import { useParams } from "react-router-dom";
import PropertyPage from '../components/property/PropertyPage'

export default function PreviewProperty() {
  const { propertyId } = useParams();

  return <PropertyPage propertyId={propertyId}  />
}
