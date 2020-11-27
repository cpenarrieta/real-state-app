import React, { useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import ManagePropertyEdit from "./ManagePropertyEdit";
import ManagePropertyLeads from "./ManagePropertyLeads";
import ManagePropertyPreview from "./ManagePropertyPreview";
import ManagePropertySettings from "./ManagePropertySettings";
import ManagePropertyAnalytics from "./ManagePropertyAnalytics";
import ManagePropertyPayment from "./ManagePropertyPayment";
import { getPublishedStatus } from "../../util/propertyStatus";
import ShareModal from "../../components/share/ShareModal";
import { PROPERTY_QUERY } from "../../queries/getProperty";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const ButtonNotSelected =
  "group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300";
const ButtonSelected =
  "group inline-flex items-center py-4 px-1 border-b-2 border-logoRed font-medium text-sm leading-5 text-logoRed focus:outline-none focus:text-logoRed focus:border-logoRed";
const IconNotSelected =
  "-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600";
const IconSelected =
  "-ml-0.5 mr-2 h-5 w-5 text-logoRed group-focus:text-logoRed";

export default function ManageProperty() {
  const { path } = useRouteMatch();
  const { propertyId } = useParams();
  const history = useHistory();
  const matchEdit = useRouteMatch("/manage-property/:propertyId/edit");
  const matchLeads = useRouteMatch("/manage-property/:propertyId/leads");
  const matchAnalytics = useRouteMatch(
    "/manage-property/:propertyId/analytics"
  );
  const matchPayment = useRouteMatch("/manage-property/:propertyId/payment");
  const matchSettings = useRouteMatch("/manage-property/:propertyId/settings");
  const matchPreview = useRouteMatch("/manage-property/:propertyId/preview");
  const { loading, error, data } = useQuery(PROPERTY_QUERY, {
    variables: { uuid: propertyId },
  });
  const [showShareModal, setShowShareModal] = useState(false);

  const isRoot =
    !matchEdit &&
    !matchLeads &&
    !matchAnalytics &&
    !matchPreview &&
    !matchSettings &&
    !matchPayment;

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { title, status, publishedStatus, username } = data?.property;

  const [publishedText, publishedColor] = getPublishedStatus(publishedStatus);

  const isPropertyActive = publishedStatus === "PUBLISHED";

  const liveWebsiteUrl = `${process.env.REACT_APP_STATIC_URI}${username}/${propertyId}`;

  return (
    <div>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-logoFont sm:text-3xl sm:leading-9 sm:truncate">
            {title || "[property title]"}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-${publishedColor}-100 text-${publishedColor}-800 mt-2 flex items-center text-sm leading-5 sm:mr-6`}
            >
              {publishedText}
            </span>
            {status === "SOLD" && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-orange-100 text-orange-800 mt-2 items-centersm:mr-6`}
              >
                sold
              </span>
            )}
            {isPropertyActive && (
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

                <span className="text-blue-500 pl-1">Lifetime Access</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {isPropertyActive && (
            <span className="sm:block ml-3 shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-logoFont bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out hover:bg-logoPink"
                onClick={() => setShowShareModal(true)}
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5 text-logoFont"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </span>
          )}

          {isPropertyActive && (
            <a href={liveWebsiteUrl} rel="noopener noreferrer" target="_blank">
              <span className="sm:block ml-3 shadow-sm rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-logoRed hover:bg-logoRed-500 focus:outline-none focus:shadow-outline-logoRed focus:border-logoRed active:bg-logoRed transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-white-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Go to live Website
                </button>
              </span>
            </a>
          )}

          {!isPropertyActive && (
            <span className="sm:ml-3 shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:shadow-outline-green focus:border-green-700 active:bg-green-700 transition duration-150 ease-in-out"
                onClick={() => {
                  history.push(`/manage-property/${propertyId}/payment`);
                }}
              >
                <svg
                  className="-ml-1 mr-2 h-4 w-4"
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
                Activate
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="pt-5">
        <div className="block">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
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
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Preview</span>
              </button>
              {isPropertyActive && (
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
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span>Leads</span>
                </button>
              )}
              {isPropertyActive && (
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
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span>Analytics</span>
                </button>
              )}
              {!isPropertyActive && (
                <button
                  onClick={() =>
                    history.push(`/manage-property/${propertyId}/payment`)
                  }
                  className={`ml-8 ${
                    matchPayment ? ButtonSelected : ButtonNotSelected
                  }`}
                >
                  <svg
                    className={`${
                      matchPayment ? IconSelected : IconNotSelected
                    }`}
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
                  <span>Activate</span>
                </button>
              )}
              <button
                onClick={() =>
                  history.push(`/manage-property/${propertyId}/settings`)
                }
                className={`ml-8 ${
                  matchSettings ? ButtonSelected : ButtonNotSelected
                }`}
              >
                <svg
                  className={`${
                    matchSettings ? IconSelected : IconNotSelected
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className={`${matchPreview ? "pt-0" : "pt-5"} `}>
        <Switch>
          <Route exact path={path}>
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
          <Route exact path={`${path}/settings`}>
            <ManagePropertySettings
              status={status}
              publishedStatus={publishedStatus}
            />
          </Route>
          <Route exact path={`${path}/analytics`}>
            <ManagePropertyAnalytics />
          </Route>
          <Route exact path={`${path}/payment`}>
            <ManagePropertyPayment />
          </Route>
          <Redirect to={path} />
        </Switch>
      </div>
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        liveWebsiteUrl={liveWebsiteUrl}
      />
    </div>
  );
}
