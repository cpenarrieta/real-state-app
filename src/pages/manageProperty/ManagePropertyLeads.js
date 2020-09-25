import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import PropertyLeadSlide from "../../components/leads/PropertyLeadSlide";
import { useAlert } from "../../context/AlertContext";

const GET_LEADS = gql`
  query GetLeads($uuid: String!) {
    propertyLeads(uuid: $uuid) {
      id
      name
      phone
      email
      visitorId
      leadStatus
      createdAt
      order
      notes
    }
  }
`;

const UPDATE_LEAD_MUTATION = gql`
  mutation UpdateLead(
    $id: Int!
    $uuid: String!
    $leadStatus: LEAD_STATUS!
    $notes: String
  ) {
    updateLead(id: $id, uuid: $uuid, leadStatus: $leadStatus, notes: $notes)
  }
`;

const formatPhoneNumber = (str) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return str;
};

const getLeadStatus = (action, currentStatus) => {
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

export default function ManagePropertyLeads() {
  const { propertyId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_LEADS, {
    variables: { uuid: propertyId },
  });
  const [updateLead, { error: errorUpdateLead }] = useMutation(
    UPDATE_LEAD_MUTATION
  );
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (errorUpdateLead) {
      setShowAlert(true);
    }
  }, [errorUpdateLead, setShowAlert]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const leads = data?.propertyLeads;

  const notContactedLeads = leads.filter((l) => l.leadStatus === "PENDING");
  const starred = leads.filter((l) => l.leadStatus === "STARRED");
  const contacted = leads.filter((l) => l.leadStatus === "CONTACTED");
  const contactedLeads = starred.concat(contacted);
  const archivedLeads = leads.filter((l) => l.leadStatus === "ARCHIVED");

  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          <li>
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                New Leads
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                The leads below have not been contacted yet, you can contact the
                lead, mark it as starred or archive them.
              </p>
            </div>
          </li>
          {notContactedLeads && notContactedLeads.length <= 0 && (
            <li key="noNotcontactedLeads">
              <div className="block bg-gray-50 focus:outline-none transition duration-150 ease-in-out">
                <div className="px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-4">
                      <span className="mt-1 text-sm leading-5 text-gray-500">
                        No more new leads.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )}
          {notContactedLeads.map((lead) => {
            return (
              <li key={lead.id}>
                <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-1">
                        <div className="text-sm leading-5 font-medium text-green-500 truncate">
                          {lead.name}
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              <time dateTime="2020-01-07">
                                {format(
                                  parseISO(lead.createdAt),
                                  "MMM do yyyy"
                                )}
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex overflow-hidden">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-normal text-sm text-gray-500">
                            <a href={`mailto:${lead.name}`}>{lead.email}</a>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex overflow-hidden">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="font-normal text-sm text-gray-500">
                            {formatPhoneNumber(lead.phone)}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex flex-row-reverse justify-between overflow-hidden">
                          {/* ARCHIVED */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-red-500 focus:text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "ARCHIVED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                            <path
                              fillRule="evenodd"
                              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* ANALYTICS */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-indigo-500 focus:text-indigo-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowDetails(true);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {/* CONTACTED */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-green-500 focus:text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "CONTACTED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                          {/* STARRED */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-yellow-300 focus:text-yellow-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "STARRED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          <li>
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Contacted Leads
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                The leads below have been contacted because they are marked as
                started or contacted
              </p>
            </div>
          </li>
          {contactedLeads && contactedLeads.length <= 0 && (
            <li key="noNotcontactedLeads">
              <div className="block bg-gray-50 focus:outline-none transition duration-150 ease-in-out">
                <div className="px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-4">
                      <span className="mt-1 text-sm leading-5 text-gray-500">
                        Empty list.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )}
          {contactedLeads.map((lead) => {
            return (
              <li key={lead.id}>
                <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-1">
                        <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                          {lead.name}
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              <time dateTime="2020-01-07">
                                {format(
                                  parseISO(lead.createdAt),
                                  "MMM do yyyy"
                                )}
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex overflow-hidden">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-normal text-sm text-gray-500">
                            <a href={`mailto:${lead.name}`}>{lead.email}</a>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex overflow-hidden">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="font-normal text-sm text-gray-500">
                            {formatPhoneNumber(lead.phone)}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex flex-row-reverse justify-between overflow-hidden">
                          {/* ARCHIVED */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-red-500 focus:text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "ARCHIVED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                            <path
                              fillRule="evenodd"
                              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* ANALYTICS */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-indigo-500 focus:text-indigo-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowDetails(true);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {/* CONTACTED */}
                          <svg
                            className={`h-6 w-6 mr-2 cursor-pointer ${
                              ["CONTACTED", "STARRED"].includes(lead.leadStatus)
                                ? "text-green-500 hover:text-gray-500"
                                : "text-gray-500 hover:text-green-500"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "CONTACTED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>

                          {/* STARRED */}
                          <svg
                            className={`h-6 w-6 mr-2 cursor-pointer ${
                              lead.leadStatus === "STARRED"
                                ? "text-yellow-300 hover:text-gray-300 focus:text-gray-300"
                                : "text-gray-500 hover:text-yellow-300 focus:text-yellow-300"
                            }  `}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "STARRED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          <li>
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Archived leads
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Here are the list you mark as archived.
              </p>
            </div>
          </li>
          {archivedLeads && archivedLeads.length <= 0 && (
            <li key="noNotcontactedLeads">
              <div className="block bg-gray-50 focus:outline-none transition duration-150 ease-in-out">
                <div className="px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-4">
                      <span className="mt-1 text-sm leading-5 text-gray-500">
                        No archived leads.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )}
          {archivedLeads.map((lead) => {
            return (
              <li key={lead.id}>
                <div className="block bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-1">
                        <div className="text-sm leading-5 font-medium text-gray-500 truncate">
                          {lead.name}
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              <time dateTime="2020-01-07">
                                {format(
                                  parseISO(lead.createdAt),
                                  "MMM do yyyy"
                                )}
                              </time>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex overflow-hidden">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-normal text-sm text-gray-500">
                            <a href={`mailto:${lead.name}`}>{lead.email}</a>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex overflow-hidden">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="font-normal text-sm text-gray-500">
                            {formatPhoneNumber(lead.phone)}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-1">
                        <div className="flex flex-row-reverse overflow-hidden">
                          {/* ARCHIVED */}
                          <svg
                            className={`h-6 w-6 mr-2 cursor-pointer text-red-300 hover:text-gray-300 focus:text-gray-300`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={async () => {
                              await updateLead({
                                variables: {
                                  id: lead.id,
                                  uuid: propertyId,
                                  leadStatus: getLeadStatus(
                                    "ARCHIVED",
                                    lead.leadStatus
                                  ),
                                },
                              });
                              await refetch();
                            }}
                          >
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                            <path
                              fillRule="evenodd"
                              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* ANALYTICS */}
                          <svg
                            className="h-6 w-6 text-gray-500 mr-2 cursor-pointer hover:text-indigo-500 focus:text-indigo-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowDetails(true);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <PropertyLeadSlide
        showDetails={showDetails}
        selectedLead={selectedLead}
        setShowDetails={setShowDetails}
        updateLead={updateLead}
        refetch={refetch}
      />
    </div>
  );
}
