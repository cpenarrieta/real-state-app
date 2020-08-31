import React from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";
import { useUser } from "../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import userDefault from "../images/user-default.png";
import { Transition } from "@tailwindui/react";

const NEW_PROPERTY_MUTATION = gql`
  mutation SaveProperty {
    saveProperty {
      uuid
    }
  }
`;

export default function SidebarDesktop({
  dropdownOpen,
  setDropdownOpen,
  currentPath,
}) {
  const [
    saveProperty,
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(NEW_PROPERTY_MUTATION);
  let history = useHistory();
  const useUserCtx = useUser();
  const user = useUserCtx?.user
  const { logout } = useAuth0();

  const savePropertyOnClick = async () => {
    const propertyResponse = await saveProperty({
      variables: {
        property: {
          uuid: null,
        },
      },
    });

    const propertyUuid = propertyResponse?.data?.saveProperty?.uuid;

    if (propertyUuid) {
      history.push(`/manage-property/${propertyUuid}`);
    }
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      {savePropertyError && (
        <Alert
          type="error"
          title="error creating property"
          position="top-right"
        />
      )}
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              <Link
                to="/dashboard"
                className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md ${
                  currentPath === "/dashboard" ? "bg-gray-100" : ""
                } hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-${
                  currentPath === "/dashboard" ? "200" : "50"
                } transition ease-in-out duration-150`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                to="/my-properties"
                className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md ${
                  currentPath === "/my-properties" ? "bg-gray-100" : ""
                } hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-${
                  currentPath === "/my-properties" ? "200" : "50"
                } transition ease-in-out duration-150`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Properties
              </Link>

              <Link
                to="/leads"
                className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md ${
                  currentPath === "/leads" ? "bg-gray-100" : ""
                } hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-${
                  currentPath === "/leads" ? "200" : "50"
                } transition ease-in-out duration-150`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Leads
              </Link>

              <Link
                to="/analytics"
                className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md ${
                  currentPath === "/analytics" ? "bg-gray-100" : ""
                } hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-${
                  currentPath === "/analytics" ? "200" : "50"
                } transition ease-in-out duration-150`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analytics
              </Link>

              <Link
                to="/settings"
                className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md ${
                  currentPath === "/settings" ? "bg-gray-100" : ""
                } hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-${
                  currentPath === "/settings" ? "200" : "50"
                } transition ease-in-out duration-150`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </Link>

              <span className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                <button
                  type="button"
                  onClick={savePropertyOnClick}
                  disabled={savePropertyLoading}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  <svg
                    className="mr-3 h-6 w-6 text-white-400 group-hover:text-white-500 group-focus:text-white-500 transition ease-in-out duration-150"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  New Property
                </button>
              </span>
            </nav>
            <Transition
              show={dropdownOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="origin-bottom-left relative left-0 mt-2 w-full rounded-md shadow-lg">
                <div
                  className="rounded-md bg-white shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Signed in as</p>
                    <p className="text-sm leading-5 font-medium text-gray-900 truncate">
                      {user && user.email}
                    </p>
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div className="py-1">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      Account settings
                    </Link>
                    <Link
                      to="/support"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      Support
                    </Link>
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div className="py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          {user && (
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Link to="/my-account" className="flex-shrink-0  group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src={user.pictureLowRes || userDefault}
                      alt="profile user"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                      {`${user.firstName}`}
                    </p>
                    <p className="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-700 transition ease-in-out duration-150">
                      View profile
                    </p>
                  </div>
                </div>
              </Link>

              <div className="ml-auto self-center">
                <svg
                  className="-mr-1 ml-2 h-5 w-5 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
