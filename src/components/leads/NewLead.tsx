import React, { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { PropertyLead } from "../../types";
import { formatPhoneNumber } from "../../util/formatPhoneNumber";
import { getLeadStatus } from "../../util/leadStatus";
import { useMutation, gql } from "@apollo/client";
import { useAlert } from "../../context/AlertContext";
import { Link } from "react-router-dom";

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

type NewLeadProps = {
  lead: PropertyLead;
  setSelectedLead: React.Dispatch<React.SetStateAction<PropertyLead | null>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  fromProperty: boolean;
};

export default function NewLead({
  lead,
  setSelectedLead,
  setShowDetails,
  fromProperty = false,
}: NewLeadProps) {
  const { setShowAlert } = useAlert();
  const [updateLead, { error: errorUpdateLead }] = useMutation<{
    updateLead: boolean;
  }>(UPDATE_LEAD_MUTATION, {
    refetchQueries: [fromProperty ? "GetPropertyLeads" : "GetLeads"],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (errorUpdateLead) {
      setShowAlert(true);
    }
  }, [errorUpdateLead, setShowAlert]);

  const gridClass = fromProperty ? "grid-cols-4" : "grid-cols-5";
  const colClass = fromProperty ? "col-span-4" : "col-span-5";

  return (
    <li>
      <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
        <div className="px-4 py-4 sm:px-6">
          <div className={`grid ${gridClass} gap-6`}>
            <div className={`${colClass} sm:col-span-1`}>
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
                      {format(parseISO(lead.createdAt), "MMM do yyyy")}
                    </time>
                  </span>
                </div>
              </div>
            </div>
            <div className={`${colClass} sm:col-span-1`}>
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

            <div className={`${colClass} sm:col-span-1`}>
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

            {!fromProperty && (
              <div className={`${colClass} sm:col-span-1`}>
                <div className="flex overflow-hidden">
                  <span className="inline-flex rounded-md shadow-sm">
                    <Link
                      className="inline-flex items-center rounded-md text-indigo-600 focus:outline-none focus:shadow-outline-blue active:text-gray-800 transition ease-in-out duration-150"
                      to={`/manage-property/${lead.uuid}/leads`}
                    >
                      {lead.image ? (
                        <img
                          className="h-16 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:translate-y-1 hover:scale-105"
                          src={lead.image}
                          alt="order property house"
                        />
                      ) : (
                        <>{lead.title}</>
                      )}
                    </Link>
                  </span>
                </div>
              </div>
            )}

            <div className={`${colClass} sm:col-span-1`}>
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
                        uuid: lead.uuid,
                        leadStatus: getLeadStatus("ARCHIVED", lead.leadStatus),
                      },
                    });
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
                        uuid: lead.uuid,
                        leadStatus: getLeadStatus("CONTACTED", lead.leadStatus),
                      },
                    });
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
                        uuid: lead.uuid,
                        leadStatus: getLeadStatus("STARRED", lead.leadStatus),
                      },
                    });
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
}
