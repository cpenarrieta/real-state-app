export const getPropertyBadge = (status, publishedStatus) => {
  if (status === "ACTIVE" && publishedStatus === "PUBLISHED") {
    return ["live", "teal"];
  }
  if (status === "ACTIVE" && publishedStatus === "DRAFT") {
    return ["draft", "yellow"];
  }
  if (status === "SOLD") {
    return ["sold", "orange"];
  }
  if (status === "INACTIVE") {
    return ["inactive", "red"];
  }
  return [status, "gray"];
};
