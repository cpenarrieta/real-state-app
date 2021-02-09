import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import { getColorThemeText, getColorThemeBackground } from "./utils/colorTheme";
import { formatPhoneNumber } from "./utils/formatPhoneNumber";

export default function LeadForm({
  userEmail,
  userPhone,
  userAddress1,
  userCity,
  userProvince,
  userZipcode,
  userFirstName,
  userLastName,
  userPicture,
  userSmallBio,
  color,
  uuid,
  visitorSource,
  username,
  address,
  instagramLink,
  twitterLink,
  facebookLink,
  website,
}) {
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [colorMain, colorSec] = getColorThemeText(color);
  const [colorMainBg, colorSecBg] = getColorThemeBackground(color);

  const showSuccessAlert = successMessage && !errorMessage;
  const buttonDisabled = !email || !name || !phone || showSuccessAlert;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (visitorSource === "prod") {
        const { data } = await axios.post("/api/lead", {
          email,
          name,
          uuid,
          username,
          phone,
          type: "PROPERTY",
        });
        setSuccessMessage(data?.st);
      } else if (visitorSource === "agent_site") {
        const { data } = await axios.post("/api/lead", {
          email,
          name,
          username,
          phone,
          type: "USER",
        });
        setSuccessMessage(data?.st);
      } else {
        setSuccessMessage("ok");
      }
    } catch (err) {
      setErrorMessage(true);
    }
  }

  return (
    <div
      className={`relative ${
        visitorSource === "agent_site" ? "bg-white" : "bg-gray-50"
      } `}
      id="form-lead-section"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
        <div className="bg-white-50 py-16 px-4 sm:px-6 lg:col-span-3 lg:px-8 lg:py-12 xl:pr-12">
          <h2
            className={`text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 pb-5 ${colorMain}`}
          >
            Let's work together
          </h2>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
            <div className="relative pt-5">
              <div
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  overflow: "hidden",
                  position: "relative",
                  boxSizing: "border-box",
                  margin: 0,
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    maxWidth: "100%",
                  }}
                >
                  {userPicture && (
                    <img
                      style={{
                        maxWith: "100%",
                        display: "block",
                      }}
                      alt=""
                      aria-hidden="true"
                      role="presentation"
                      src={userPicture}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div
                  className={`text-lg leading-6 font-medium space-y-1 ${colorMain}`}
                >
                  <a href={`https://realtorapp.co/${username}/`}>
                    <h4>{`${userFirstName} ${userLastName}`}</h4>
                  </a>
                  <p className="text-gray-500">Real Estate Agent</p>
                </div>
                <div className="text-lg leading-7">
                  <p className="text-base text-gray-500">{userSmallBio}</p>
                </div>

                <dl className="mt-8 text-base leading-6 text-gray-500">
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd>
                      <p>{userAddress1}</p>
                      <p>
                        {userCity}, {userProvince} {userZipcode}
                      </p>
                    </dd>
                  </div>
                  <div className="mt-6">
                    <dt className="sr-only">Phone number</dt>
                    <dd className="flex">
                      <svg
                        className={`flex-shrink-0 h-6 w-6 ${colorMain}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href={`tel:+1${userPhone}`}>
                        <span className={`ml-3 ${colorMain}`}>
                          {formatPhoneNumber(userPhone)}
                        </span>
                      </a>
                    </dd>
                  </div>
                  <div className="mt-3">
                    <dt className="sr-only">Email</dt>
                    <dd className="flex">
                      <svg
                        className={`flex-shrink-0 h-6 w-6 ${colorMain}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {visitorSource === "agent_site" ? (
                        <a href={`mailto:${userEmail}`}>
                          <span className={`ml-3 ${colorMain}`}>
                            {userEmail}
                          </span>
                        </a>
                      ) : (
                        <a
                          href={`mailto:${userEmail}?subject=RealtorApp | Interested in Property: ${address}`}
                        >
                          <span className={`ml-3 ${colorMain}`}>
                            {userEmail}
                          </span>
                        </a>
                      )}
                    </dd>
                  </div>
                </dl>

                <ul className="flex space-x-5">
                  <li>
                    <a
                      href={website || `https://realtorapp.co/${username}/`}
                      className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="sr-only">Web</span>
                      <svg
                        className={`w-5 h-5 hover:${colorSec}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </a>
                  </li>
                  {instagramLink && (
                    <li>
                      <a
                        href={instagramLink}
                        className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg
                          className={`w-5 h-5 hover:${colorSec}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                  {twitterLink && (
                    <li>
                      <a
                        href={twitterLink}
                        className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg
                          className={`w-5 h-5 hover:${colorSec}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                  )}
                  {facebookLink && (
                    <li>
                      <a
                        href={facebookLink}
                        className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="sr-only">Facebook</span>
                        <svg
                          className={`w-5 h-5 hover:${colorSec}`}
                          className="h-6 w-6"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-2 lg:py-12 lg:px-8 xl:pl-12 rounded-lg">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 row-gap-6"
              id="form-lead-section-form"
            >
              <div>
                <label htmlFor="full_name" className="sr-only">
                  Full name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    id="full_name"
                    className="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={2}
                    maxLength={100}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    id="email"
                    type="email"
                    className="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    id="phone"
                    className="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    minLength={10}
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    disabled={buttonDisabled}
                    className={`inline-flex justify-center py-3 px-6 border border-transparent text-base leading-6 font-medium rounded-md text-white ${
                      buttonDisabled ? "bg-gray-600" : colorMainBg
                    } ${
                      buttonDisabled ? "" : `hover:${colorMainBg}`
                    } focus:outline-none focus:border-${colorMain} focus:shadow-outline-${color} active:${colorMainBg} transition duration-150 ease-in-out`}
                  >
                    Submit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {successMessage && !errorMessage && (
        <Alert
          type="success"
          title="Thanks for expressing you interest in this property!"
          position="top-right"
        />
      )}

      {errorMessage && (
        <Alert
          type="error"
          title="Sorry, Something went wrong"
          position="top-right"
        />
      )}
    </div>
  );
}
