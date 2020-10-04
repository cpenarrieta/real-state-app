export const getLeadStatus = (action: string, currentStatus: string | undefined = "") => {
  if (action === "STARRED" && currentStatus !== "STARRED") return "STARRED";
  if (action === "STARRED" && currentStatus === "STARRED") return "CONTACTED";
  if (
    action === "CONTACTED" &&
    ["STARRED", "CONTACTED"].includes(currentStatus)
  )
    return "PENDING";
  if (
    action === "CONTACTED" &&
    !["STARRED", "CONTACTED"].includes(currentStatus)
  )
    return "CONTACTED";
  if (action === "ARCHIVED" && currentStatus !== "ARCHIVED") return "ARCHIVED";
  if (action === "ARCHIVED" && currentStatus === "ARCHIVED") return "CONTACTED";
  return action;
};