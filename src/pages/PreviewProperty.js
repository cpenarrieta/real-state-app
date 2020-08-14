import React from 'react'
import { useParams } from "react-router-dom";

export default function PreviewProperty() {
  const { propertyId } = useParams();

  return (
    <div>
      Preview Property - {propertyId}
    </div>
  )
}
