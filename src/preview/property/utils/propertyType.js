export const getPropertyType = (propertyType) => {
  if (propertyType === "HOUSE") return "House";
  if (propertyType === "CONDO") return "Condo";
  if (propertyType === "TOWNHOUSE") return "Townhouse";
  if (propertyType === "LAND") return "Land";
  return "Other";
};
