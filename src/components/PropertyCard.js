import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ uuid, title }) {
  return (
    <div>
      <Link to={`/property/manage/${uuid}`}>Edit</Link>
      <h4>{uuid}</h4>
      <p>{title}</p>
    </div>
  );
}
