import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";
import { useUser } from "../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import userDefault from "../images/user-default.png";
import { Transition } from "@tailwindui/react";
import { useAlert } from "../context/AlertContext";

const NEW_PROPERTY_MUTATION = gql`
  mutation SaveProperty {
    saveProperty {
      uuid
    }
  }
`;

export default function SidebarMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  currentPath,
}) {
  const [
    saveProperty,
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(NEW_PROPERTY_MUTATION);
  let history = useHistory();
  const useUserCtx = useUser();
  const user = useUserCtx?.user;
  const { logout } = useAuth0();
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (savePropertyError) {
      setShowAlert(true);
    }
  }, [savePropertyError]);

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
    <div className="md:hidden">
      <Transition
        show={mobileMenuOpen}
        enter="transition-opacity ease-linear duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div ref={ref} className="fixed inset-0 flex z-40">
            <div className="fixed inset-0">
              <div
                className="absolute inset-0 bg-gray-600 opacity-75"
                onClick={() => setMobileMenuOpen(false)}
              ></div>
            </div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button
                  className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-white-600"
                  aria-label="Close sidebar"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
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

                  <span className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
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
              </div>
              {user && (
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <Link
                    to="/my-account"
                    className="flex-shrink-0 group block focus:outline-none"
                  >
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={user.pictureLowRes || userDefault}
                          alt="profile user"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base leading-6 font-medium text-gray-700 group-hover:text-gray-900">
                          {`${user.firstName}`}
                        </p>
                        <p className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
                          View profile
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex-shrink-0 flex px-4 py-2">
                  <Link
                    to="/support"
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Support
                  </Link>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className=" ml-auto block px-4 py-2 text-sm leading-5 text-red-700 hover:bg-red-100 hover:text-red-900 focus:outline-none focus:bg-red-100 focus:text-red-900"
                    role="menuitem"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
            <div className="flex-shrink-0 w-14"></div>
          </div>
        )}
      </Transition>
    </div>
  );
}
