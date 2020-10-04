import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import { UserProvider } from "../../context/UserContext";
import ErrorAlert from "../ErrorAlert";

const AppShell = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistory();
  const matchOnboarding = useRouteMatch("/onboarding");
  const matchReactivateAccount = useRouteMatch("/reactivate_account");
  const hideMenu = matchOnboarding || matchReactivateAccount

  useEffect(() => {
    history.listen(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    });
  }, [history]);

  return (
    <UserProvider>
      <div
        className={`h-screen flex overflow-hidden ${
          hideMenu ? "bg-white" : "bg-gray-100"
        } `}
      >
        {!hideMenu && (
          <>
            <SidebarMobile
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              currentPath={history?.location?.pathname}
            />

            <SidebarDesktop
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              currentPath={history?.location?.pathname}
            />
          </>
        )}

        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
              aria-label="Open sidebar"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex="0"
          >
            <ErrorAlert />

            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
};

export default AppShell;
