export const getPropertyBadge = (status, publishedStatus) => {
  if (status === "ACTIVE" && publishedStatus === "PUBLISHED") {
    return ["available", "bg-green-200 text-green-800"];
  }
  if (status === "ACTIVE" && publishedStatus === "DRAFT") {
    return ["draft", "bg-yellow-200 text-yellow-800"];
  }
  if (status === "SOLD") {
    return ["sold", "bg-orange-200 text-orange-800"];
  }
  if (status === "INACTIVE") {
    return ["inactive", "bg-red-200 text-red-800"];
  }
  return [status, "bg-gray-200 text-gray-800"];
};
