import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import PropertyLeadSlide from "../../components/leads/PropertyLeadSlide";
import { useAlert } from "../../context/AlertContext";
import NewLead from "../../components/leads/NewLead";
import ContactedLead from "../../components/leads/ContactedLead";
import ArchivedLead from "../../components/leads/ArchivedLead";

const GET_PROPERTY_LEADS = gql`
  query GetPropertyLeads($uuid: String!) {
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

export default function ManagePropertyLeads() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(GET_PROPERTY_LEADS, {
    variables: { uuid: propertyId },
  });
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

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
              <h3 className="text-lg leading-6 font-medium text-logoFont">
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
              <NewLead
                key={lead.id}
                lead={{ ...lead, uuid: propertyId }}
                setSelectedLead={setSelectedLead}
                setShowDetails={setShowDetails}
                fromProperty={true}
              />
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
              <h3 className="text-lg leading-6 font-medium text-logoFont">
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
              <ContactedLead
                key={lead.id}
                lead={{ ...lead, uuid: propertyId }}
                setSelectedLead={setSelectedLead}
                setShowDetails={setShowDetails}
                fromProperty={true}
              />
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
              <h3 className="text-lg leading-6 font-medium text-logoFont">
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
              <ArchivedLead
                key={lead.id}
                lead={{ ...lead, uuid: propertyId }}
                setSelectedLead={setSelectedLead}
                setShowDetails={setShowDetails}
                fromProperty={true}
              />
            );
          })}
        </ul>
      </div>

      <PropertyLeadSlide
        showDetails={showDetails}
        selectedLead={selectedLead}
        setShowDetails={setShowDetails}
        fromProperty={true}
        propertyId={propertyId}
      />
    </div>
  );
}
