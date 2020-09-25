import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Transition } from "@tailwindui/react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useAlert } from "../../context/AlertContext";

const LEADS_QUERY = gql`
  query LeadAnalytics($id: Int!, $uuid: String!) {
    leadAnalytics(id: $id, uuid: $uuid) {
      id
      today
      yesterday
      last7Days
      last15Days
      last30Days
      last180Days
      totalViews
    }
  }
`;

export default function PropertyLeadSlide({
  showDetails,
  selectedLead,
  setShowDetails,
  updateLead,
  refetch,
}) {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(LEADS_QUERY, {
    variables: { uuid: propertyId, id: selectedLead?.id },
    skip: !showDetails || !selectedLead,
  });
  const [formNotesSuccess, setFormNotesSuccess] = useState(false);
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

  useEffect(() => {
    if (formNotesSuccess) {
      const handler = window.setTimeout(() => {
        setFormNotesSuccess(false);
      }, 1000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [formNotesSuccess]);

  const leadAnalytics = data?.leadAnalytics;

  let mainbody = <p>loading</p>;

  if (!loading && leadAnalytics) {
    mainbody = (
      <div className="h-full">
        <div>
          <h3 className="text-md leading-6 font-medium text-gray-700">
            Visits for this property
          </h3>
          <span className="text-sm leading-5 font-medium text-gray-500">
            Analytics for last 6 months.
          </span>
          <div className="mt-5 grid grid-cols-2 rounded-lg bg-white overflow-hidden shadow">
            <div className="col-span-2 border-b border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-base leading-6 font-normal text-gray-900">
                    Total
                  </dt>
                  <dd className="mt-1 flex justify-between items-baseline  ">
                    <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                      {new Intl.NumberFormat("en-us").format(
                        leadAnalytics.totalViews
                      )}
                      <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                        sessions
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="col-span-1 border-b border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-base leading-6 font-normal text-gray-900">
                    Today
                  </dt>
                  <dd className="mt-1 flex justify-between items-baseline ">
                    <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                      {new Intl.NumberFormat("en-us").format(
                        leadAnalytics.today
                      )}
                      <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                        sessions
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="col-span-1 border-b border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-base leading-6 font-normal text-gray-900">
                    Yesterday
                  </dt>
                  <dd className="mt-1 flex justify-between items-baseline ">
                    <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                      {new Intl.NumberFormat("en-us").format(
                        leadAnalytics.yesterday
                      )}
                      <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                        sessions
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="col-span-1 border-b border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-base leading-6 font-normal text-gray-900">
                    Last 7 days
                  </dt>
                  <dd className="mt-1 flex justify-between items-baseline ">
                    <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                      {new Intl.NumberFormat("en-us").format(
                        leadAnalytics.last7Days
                      )}
                      <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                        sessions
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            {leadAnalytics.last15Days !== leadAnalytics.last7Days && (
              <div className="col-span-1 border-b border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-base leading-6 font-normal text-gray-900">
                      Last 15 days
                    </dt>
                    <dd className="mt-1 flex justify-between items-baseline ">
                      <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                        {new Intl.NumberFormat("en-us").format(
                          leadAnalytics.last15Days
                        )}
                        <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                          sessions
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            )}
            {leadAnalytics.last30Days !== leadAnalytics.last15Days && (
              <div className="col-span-1 border-b border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-base leading-6 font-normal text-gray-900">
                      Last 30 days
                    </dt>
                    <dd className="mt-1 flex justify-between items-baseline ">
                      <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                        {new Intl.NumberFormat("en-us").format(
                          leadAnalytics.last30Days
                        )}
                        <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                          sessions
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            )}
            {leadAnalytics.last180Days !== leadAnalytics.totalViews && (
              <div className="col-span-1 border-b border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-base leading-6 font-normal text-gray-900">
                      Last 6 Months
                    </dt>
                    <dd className="mt-1 flex justify-between items-baseline ">
                      <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                        {new Intl.NumberFormat("en-us").format(
                          leadAnalytics.last180Days
                        )}
                        <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
                          sessions
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <Formik
            initialValues={{
              notes: selectedLead.notes || "",
            }}
            onSubmit={async (values) => {
              await updateLead({
                variables: {
                  id: selectedLead.id,
                  uuid: propertyId,
                  leadStatus: selectedLead.leadStatus,
                  notes: values.notes,
                },
              });
              await refetch();
              setFormNotesSuccess(true);
            }}
          >
            {({ isSubmitting, errors, touched, values }) => {
              const submitButtonDisabled = isSubmitting || !values.notes;

              return (
                <Form>
                  <div className="col-span-6">
                    <label
                      htmlFor="notes"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Notes
                    </label>
                    <div className="rounded-md shadow-sm">
                      <Field
                        className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="notes"
                        name="notes"
                        placeholder="Free space to add notes specific to this lead."
                        rows="3"
                        component="textarea"
                        type="text"
                      />
                    </div>
                    <div className="py-3 text-right flex flex-row-reverse">
                      <button
                        className={`py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out ${
                          submitButtonDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        type="submit"
                        disabled={submitButtonDisabled}
                      >
                        Save
                      </button>
                      {formNotesSuccess && (
                        <p className="text-sm text-green-500 py-2 px-4">
                          Note Saved!
                        </p>
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${showDetails ? "fixed inset-0 overflow-hidden" : "hidden"}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Transition
          show={showDetails}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div
              ref={ref}
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowDetails(false)}
            ></div>
          )}
        </Transition>

        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <Transition
            show={showDetails}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            {(ref) => (
              <div ref={ref} className="relative w-screen max-w-md">
                <div className="h-full flex flex-col space-y-6 pb-6 bg-white shadow-xl overflow-y-scroll">
                  <header className="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6">
                    <div className="flex items-center justify-between space-x-3">
                      <h2 className="text-lg leading-7 font-medium text-white">
                        {selectedLead.name}
                      </h2>
                      <div className="h-7 flex items-center">
                        <button
                          aria-label="Close panel"
                          className="text-indigo-200 hover:text-white transition ease-in-out duration-150"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => setShowDetails(false)}
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
                    </div>
                    <div>
                      <p className="text-sm leading-5 text-indigo-300">
                        {selectedLead.phone} - {selectedLead.email}
                      </p>
                    </div>
                  </header>
                  <div className="relative flex-1 px-4 sm:px-6">
                    <div className="absolute inset-0 px-4 sm:px-6">
                      {mainbody}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </section>
      </div>
    </div>
  );
}
