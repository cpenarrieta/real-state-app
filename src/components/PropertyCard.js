import React from "react";

export default function PropertyCard({ uuid, title }) {
  return (
    <div>
      <h4>{uuid}</h4>
      <p>{title}</p>
    </div>
  );
}
