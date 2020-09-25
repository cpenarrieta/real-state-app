import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const ANALYTICS_QUERY = gql`
  query PropertyAnalytics($uuid: String!) {
    propertyAnalytics(uuid: $uuid) {
      id
      visits {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
        totalViews
      }
      leads {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
        totalViews
      }
      users {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
        totalViews
      }
    }
  }
`;

const AnalyticRow = ({ title, visits, leads, users }) => {
  return (
    <div>
      <h3 className="mt-2 text-base leading-6 font-medium text-gray-600">
        {title}
        {title === "Total" && (
          <span className="ml-2 text-xs leading-5 font-medium text-gray-500">
            from last 6 months
          </span>
        )}
      </h3>
      <div className="max-w-4xl mt-2 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow sm:grid-cols-3">
        <div>
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-base leading-6 font-normal text-gray-600">
                Sessions
              </dt>
              <dd className="mt-1 flex justify-between items-baseline sm:block lg:flex">
                <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-500">
                  {new Intl.NumberFormat("en-us").format(visits)}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="border-t border-gray-200 sm:border-0 sm:border-l">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-base leading-6 font-normal text-gray-600">
                Users
              </dt>
              <dd className="mt-1 flex justify-between items-baseline sm:block lg:flex">
                <div className="flex items-baseline text-2xl leading-8 font-semibold text-yellow-500">
                  {new Intl.NumberFormat("en-us").format(users)}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="border-t border-gray-200 sm:border-0 sm:border-l">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-base leading-6 font-normal text-gray-600">
                Leads
              </dt>
              <dd className="mt-1 flex justify-between items-baseline sm:block lg:flex">
                <div className="flex items-baseline text-2xl leading-8 font-semibold text-teal-500">
                  {new Intl.NumberFormat("en-us").format(leads)}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ManagePropertyAnalytics() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(ANALYTICS_QUERY, {
    variables: { uuid: propertyId },
  });

  if (loading) {
    return <p>loading</p>;
  }

  const visits = data?.propertyAnalytics?.visits;
  const leads = data?.propertyAnalytics?.leads;
  const users = data?.propertyAnalytics?.users;

  return (
    <div>
      <AnalyticRow
        title="Total"
        visits={visits.totalViews}
        leads={leads.totalViews}
        users={users.totalViews}
      />
      <AnalyticRow
        title="Today"
        visits={visits.today}
        leads={leads.today}
        users={users.today}
      />
      <AnalyticRow
        title="Yesterday"
        visits={visits.yesterday}
        leads={leads.yesterday}
        users={users.yesterday}
      />
      <AnalyticRow
        title="Last 7 Days"
        visits={visits.last7Days}
        leads={leads.last7Days}
        users={users.last7Days}
      />
      {visits.last15Days !== visits.last7Days && (
        <AnalyticRow
          title="Last 15 Days"
          visits={visits.last15Days}
          leads={leads.last15Days}
          users={users.last15Days}
        />
      )}
      {visits.last30Days !== visits.last15Days && (
        <AnalyticRow
          title="Last 30 Days"
          visits={visits.last30Days}
          leads={leads.last30Days}
          users={users.last30Days}
        />
      )}
    </div>
  );
}
