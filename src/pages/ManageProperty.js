import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import ManagePropertyEdit from "./ManagePropertyEdit";
import ManagePropertyLeads from "./ManagePropertyLeads";
import ManagePropertyPreview from "./ManagePropertyPreview";
import { getPropertyBadge } from "../util/propertyStatus";
import { format, parseISO, compareAsc } from "date-fns";

const ButtonNotSelected =
  "group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300";
const ButtonSelected =
  "group inline-flex items-center py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700";
const IconNotSelected =
  "-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600";
const IconSelected =
  "-ml-0.5 mr-2 h-5 w-5 text-indigo-500 group-focus:text-indigo-600";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      title
      uuid
      price
      lotSize
      builtYear
      grossTaxesLastYear
      bedrooms
      bathrooms
      propertyType
      description
      listingId
      mainPicture
      mainPictureLowRes
      status
      publishedStatus
      webPaidUntil
      lat
      lon
      username
    }
  }
`;

const PUBLISH_PROPERTY_MUTATION = gql`
  mutation PublishProperty($propertyUuid: String) {
    publishProperty(propertyUuid: $propertyUuid)
  }
`;

export default function ManageProperty() {
  const { path } = useRouteMatch();
  const { propertyId } = useParams();
  const history = useHistory();
  const matchEdit = useRouteMatch("/manage-property/:propertyId/edit");
  const matchLeads = useRouteMatch("/manage-property/:propertyId/leads");
  const matchAnalytics = useRouteMatch(
    "/manage-property/:propertyId/analytics"
  );
  const matchBilling = useRouteMatch("/manage-property/:propertyId/billing");
  const matchPreview = useRouteMatch("/manage-property/:propertyId/preview");
  const { loading, error, data } = useQuery(PROPERTY_QUERY, {
    variables: { uuid: propertyId },
  });
  const [
    publishProperty,
    { loading: publishPropertyLoading, error: publishPropertyError },
  ] = useMutation(PUBLISH_PROPERTY_MUTATION);

  const isRoot =
    !matchEdit &&
    !matchLeads &&
    !matchAnalytics &&
    !matchPreview &&
    !matchBilling;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const {
    title,
    uuid,
    mainPicture,
    mainPictureLowRes,
    webPaidUntil,
    status,
    publishedStatus,
    price,
    lotSize,
    builtYear,
    grossTaxesLastYear,
    bedrooms,
    bathrooms,
    propertyType,
    description,
    username,
    listingId,
    lat,
    lon,
  } = data?.property;

  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);

  const validPayment =
    webPaidUntil && compareAsc(parseISO(webPaidUntil), new Date()) === 1;

  return (
    <div>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
            {title || "[property title]"}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-${badgeColor}-100 text-${badgeColor}-800 mt-2 flex items-center text-sm leading-5 sm:mr-6`}
            >
              {badgeText}
            </span>
            {webPaidUntil && (
              <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
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
                Active until
                <span className="text-blue-500 pl-1">
                  {format(parseISO(webPaidUntil), "MMM do yyyy")}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {validPayment && (
            <a
              href={`${process.env.REACT_APP_STATIC_URI}${username}/${propertyId}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sm:block ml-3 shadow-sm rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View
                </button>
              </span>
            </a>
          )}

          {validPayment && (
            <span className="sm:ml-3 shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Publish
              </button>
            </span>
          )}
          {!validPayment && (
            <span className="sm:ml-3 shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:shadow-outline-green focus:border-green-700 active:bg-green-700 transition duration-150 ease-in-out"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Activate
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="pt-5">
        <div className="block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`${
                  matchEdit || isRoot ? ButtonSelected : ButtonNotSelected
                }`}
                onClick={() =>
                  history.push(`/manage-property/${propertyId}/edit`)
                }
              >
                <svg
                  className={`${
                    matchEdit || isRoot ? IconSelected : IconNotSelected
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Edit Property</span>
              </button>
              <button
                onClick={() =>
                  history.push(`/manage-property/${propertyId}/preview`)
                }
                className={`ml-8 ${
                  matchPreview ? ButtonSelected : ButtonNotSelected
                }`}
              >
                <svg
                  className={`${matchPreview ? IconSelected : IconNotSelected}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Preview</span>
              </button>
              <button
                className={`ml-8 ${
                  matchLeads ? ButtonSelected : ButtonNotSelected
                }`}
                onClick={() =>
                  history.push(`/manage-property/${propertyId}/leads`)
                }
              >
                <svg
                  className={`${matchLeads ? IconSelected : IconNotSelected}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Leads</span>
              </button>
              <button
                onClick={() =>
                  history.push(`/manage-property/${propertyId}/analytics`)
                }
                className={`ml-8 ${
                  matchAnalytics ? ButtonSelected : ButtonNotSelected
                }`}
              >
                <svg
                  className={`${
                    matchAnalytics ? IconSelected : IconNotSelected
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>Analytics</span>
              </button>
              <button
                onClick={() =>
                  history.push(`/manage-property/${propertyId}/billing`)
                }
                className={`ml-8 ${
                  matchBilling ? ButtonSelected : ButtonNotSelected
                }`}
              >
                <svg
                  className={`${matchBilling ? IconSelected : IconNotSelected}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Billing</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <Switch>
          <Route exact path={`${path}`}>
            <ManagePropertyEdit {...data?.property} />
          </Route>
          <Route exact path={`${path}/edit`}>
            <ManagePropertyEdit {...data?.property} />
          </Route>
          <Route exact path={`${path}/leads`}>
            <ManagePropertyLeads />
          </Route>
          <Route exact path={`${path}/preview`}>
            <ManagePropertyPreview />
          </Route>
          <Route exact path={`${path}/billing`}>
            <div>Billing</div>
          </Route>
          <Route exact path={`${path}/analytics`}>
            <div>Analytics</div>
          </Route>

          <Redirect to={path} />
        </Switch>
      </div>
    </div>
  );
}
