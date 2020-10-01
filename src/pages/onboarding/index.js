import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import OnboardingProfile from "./Profile";
import EmailVerify from "./EmailVerify";
import Summary from "./Summary";

export default function Onboarding() {
  const { path } = useRouteMatch();
  const mOnboarding = useRouteMatch("/onboarding");
  const matchOnboarding = mOnboarding && mOnboarding.isExact;
  const matchEmail = useRouteMatch("/onboarding/email_verify");
  const matchSummary = useRouteMatch("/onboarding/summary");
  const useUserCtx = useUser();
  const user = useUserCtx?.user;
  const { user: authUser } = useAuth0();

  if (!user) {
    return <p>loading</p>
  }

  const profileCompleted = user?.profileComplete;
  const emailVerified = authUser.email_verified;

  return (
    <div>
      <div className="lg:border-t lg:border-b lg:border-gray-200 mb-5">
        <nav className="mx-auto max-w-screen-xl ">
          <ul className="rounded-md overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none">
            <li className="relative overflow-hidden lg:flex-1">
              <div className="border border-gray-200 overflow-hidden border-b-0 rounded-t-md lg:border-0">
                <Link to="/onboarding" className="group">
                  {matchOnboarding ? (
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"></div>
                  ) : (
                    <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 group-focus:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"></div>
                  )}

                  <div className="px-6 py-5 flex items-start text-sm leading-5 font-medium space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 flex items-center justify-center border-2 ${
                          matchOnboarding
                            ? "border-indigo-600"
                            : "border-gray-300"
                        }   
                        ${
                          profileCompleted
                            ? "bg-indigo-600 border-indigo-600"
                            : ""
                        }
                        rounded-full`}
                      >
                        {profileCompleted ? (
                          <svg
                            className="w-6 h-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <p
                            className={`${
                              matchOnboarding
                                ? "text-indigo-600"
                                : "text-gray-500"
                            } `}
                          >
                            01
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-0.5 min-w-0">
                      <h3
                        className={`text-xs leading-4 font-semibold uppercase tracking-wide ${
                          matchOnboarding ? "text-indigo-600" : "text-gray-500"
                        }`}
                      >
                        Profile Information
                      </h3>
                      <p className="text-sm leading-5 font-medium text-gray-500">
                        {profileCompleted
                          ? "profile information completed"
                          : "fill your profile information"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </li>

            <li className="relative overflow-hidden lg:flex-1">
              <div className="border border-gray-200 overflow-hidden lg:border-0">
                <Link to="/onboarding/email_verify" className="group">
                  {matchEmail ? (
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"></div>
                  ) : (
                    <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 group-focus:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"></div>
                  )}

                  <div className="px-6 py-5 flex items-start text-sm leading-5 font-medium space-x-4 lg:pl-9">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 flex items-center justify-center border-2 ${
                          matchEmail ? "border-indigo-600" : "border-gray-300"
                        } 
                        ${
                          emailVerified ? "bg-indigo-600 border-indigo-600" : ""
                        }
                        rounded-full`}
                      >
                        {emailVerified ? (
                          <svg
                            className="w-6 h-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <p
                            className={`${
                              matchEmail ? "text-indigo-600" : "text-gray-500"
                            } `}
                          >
                            02
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-0.5 min-w-0">
                      <h3
                        className={`text-xs leading-4 font-semibold ${
                          matchEmail ? "text-indigo-600" : "text-gray-500"
                        } uppercase tracking-wide`}
                      >
                        Verrify Email
                      </h3>
                      <p className="text-sm leading-5 font-medium text-gray-500">
                        {emailVerified
                          ? "email verified"
                          : "we need to verify your email"}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="hidden absolute top-0 left-0 w-3 inset-0 lg:block">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </li>

            <li className="relative overflow-hidden lg:flex-1">
              <div className="border border-gray-200 overflow-hidden border-t-0 rounded-b-md lg:border-0">
                <Link to="/onboarding/summary" className="group">
                  {matchSummary ? (
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"></div>
                  ) : (
                    <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 group-focus:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"></div>
                  )}

                  <div className="px-6 py-5 flex items-start text-sm leading-5 font-medium space-x-4 lg:pl-9">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 flex items-center justify-center border-2 ${
                          matchSummary ? "border-indigo-600" : "border-gray-300"
                        } rounded-full`}
                      >
                        <p
                          className={`${
                            matchSummary ? "text-indigo-600" : "text-gray-500"
                          } `}
                        >
                          03
                        </p>
                      </div>
                    </div>
                    <div className="mt-0.5 min-w-0">
                      <h3
                        className={`text-xs leading-4 font-semibold ${
                          matchSummary ? "text-indigo-600" : "text-gray-500"
                        }  uppercase tracking-wide`}
                      >
                        Summary
                      </h3>
                      <p className="text-sm leading-5 font-medium text-gray-500">
                        review your details before creating your first property
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="hidden absolute top-0 left-0 w-3 inset-0 lg:block">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path={path}>
          <OnboardingProfile {...user} email={authUser.email} />
        </Route>
        <Route exact path={`${path}/email_verify`}>
          <EmailVerify />
        </Route>
        <Route exact path={`${path}/summary`}>
          <Summary />
        </Route>
      </Switch>
    </div>
  );
}
