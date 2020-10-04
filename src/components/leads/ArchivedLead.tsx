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

type ArchivedLeadProps = {
  lead: PropertyLead;
  setSelectedLead: React.Dispatch<React.SetStateAction<PropertyLead | null>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  fromProperty: boolean;
};

export default function ArchivedLead({
  lead,
  setSelectedLead,
  setShowDetails,
  fromProperty = false,
}: ArchivedLeadProps) {
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
      <div className="block bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
        <div className="px-4 py-4 sm:px-6">
          <div className={`grid ${gridClass} gap-6`}>
            <div className={`${colClass} sm:col-span-1`}>
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>

                  <span className="font-normal text-sm text-gray-500">
                    <Link
                      to={`/manage-property/${lead.uuid}/leads`}
                      className="hover:text-indigo-400 truncate"
                    >
                      {lead.title}
                    </Link>
                  </span>
                </div>
              </div>
            )}
            <div className={`${colClass} sm:col-span-1`}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
