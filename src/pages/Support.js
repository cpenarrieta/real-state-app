import React from "react";
import PageHeader from "../components/PageHeader";
import { useUser } from "../context/UserContext";
import TextField from "../components/details/TextField";
import { Formik, Field, Form } from "formik";

export default function Support() {
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  let fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;
  if (fullName === " ") fullName = "";

  return (
    <div>
      <PageHeader title="Support" />

      <div className="relative bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-100"></div>
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                We're here to help
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Leave us a message and we'll get back to you as soon as
                possible. You can submit this form or send us an email.
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href={`mailto:hello@realtorapp.co`}>
                      <span className={`ml-3`}>hello@realtorapp.co</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <Formik
                initialValues={{
                  name: fullName || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                  message: "",
                }}
                onSubmit={async (values) => {}}
              >
                {({ isSubmitting, errors, touched, values }) => {

                  return (
                    <Form className="grid grid-cols-1 gap-y-6">
                      <div>
                        <TextField
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Full Name"
                          label="Full Name"
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-logoRed focus:border-logoRed border-gray-300 rounded-md"
                          labelClass="sr-only"
                        />
                      </div>
                      <div>
                        <TextField
                          id="email"
                          name="email"
                          type="text"
                          placeholder="Email"
                          label="Email"
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-logoRed focus:border-logoRed border-gray-300 rounded-md"
                          labelClass="sr-only"
                        />
                      </div>
                      <div>
                        <TextField
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Phone"
                          label="Phone"
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-logoRed focus:border-logoRed border-gray-300 rounded-md"
                          labelClass="sr-only"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">
                          Message
                        </label>
                        <Field
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-logoRed focus:border-logoRed border-gray-300 rounded-md"
                          id="message"
                          name="message"
                          placeholder="Message"
                          rows="4"
                          component="textarea"
                          type="text"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-logoRed hover:bg-logoFont focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-logoRed"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
