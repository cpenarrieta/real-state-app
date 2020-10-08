import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useAccessToken } from "../../context/AccessTokenContext";
import { useUser } from "../../context/UserContext";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

const fetchCheckoutSession = async ({
  productType,
  locale,
  propertyId,
  email,
  accessToken,
}) => {
  return fetch(`${process.env.REACT_APP_API_URI}create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      productType,
      locale,
      propertyId,
      email,
    }),
  }).then((res) => res.json());
};

const fetchProducts = async (country) => {
  return fetch(`${process.env.REACT_APP_API_URI}config/${country}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export default function ManagePropertyPayment() {
  const [lifetime, setLifetime] = useState();
  const [oneYear, setOneYear] = useState();
  const { accessToken } = useAccessToken();
  const { propertyId } = useParams();
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  useEffect(() => {
    async function asyncFetchProducts() {
      const { lifetime, oneYear } = await fetchProducts(user.country);
      setLifetime(lifetime);
      setOneYear(oneYear);
    }
    asyncFetchProducts();
  }, [user.country]);

  const handleClick = async (tier) => {
    const { sessionId } = await fetchCheckoutSession({
      productType: tier,
      locale: "en",
      propertyId,
      email: user.email,
      accessToken,
    });

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    console.log(error.message);
  };

  // check if property needs to be purchased (check date)
  // show date, if current give extension

  return (
    <div className="bg-gray-100">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">
              Simple no-tricks pricing
            </h2>
            <p className="mt-4 text-xl leading-7 text-gray-600">
              If you're not satisfied, contact us within the first 30 days and
              we'll send you a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100"></div>
          {lifetime && (
            <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
                    Lifetime
                  </h3>
                  <p className="mt-6 text-base leading-6 text-gray-500">
                    Lifetime access to property website, edit site anytime.
                    Realtime leads and analytics. Access to new features a soon
                    as they are released.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">
                        What's included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200"></div>
                    </div>
                    <ul className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Website
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          30 High quality pictures
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Leads management
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Analytics
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          5 PDF Attachments
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          1 Video from Youtube or Vimeo
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Pay once, own it forever
                  </p>
                  <div className="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold text-gray-900">
                    <span>${lifetime.amount}</span>
                    <span className="ml-3 text-xl leading-7 font-medium text-gray-500 uppercase">
                      {lifetime.currency}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="rounded-md shadow">
                      <button
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        onClick={() => handleClick(lifetime.id)}
                      >
                        Buy Lifetime
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {oneYear && (
            <div className="mt-10 relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
                    1 Year
                  </h3>
                  <p className="mt-6 text-base leading-6 text-gray-500">
                    One year access to property website, edit site anytime.
                    Realtime leads and analytics. Access to new features a soon
                    as they are released.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">
                        What's included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200"></div>
                    </div>
                    <ul className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Website
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          30 High quality pictures
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Leads management
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Analytics
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          5 PDF Attachments
                        </p>
                      </li>
                      <li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          1 Video from Youtube or Vimeo
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Pay once, own for 1 year
                  </p>
                  <div className="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold text-gray-900">
                    <span>${oneYear.amount}</span>
                    <span className="ml-3 text-xl leading-7 font-medium text-gray-500 uppercase">
                      {oneYear.currency}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="rounded-md shadow">
                      <button
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        onClick={() => handleClick(oneYear.id)}
                      >
                        Buy 1 year
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
