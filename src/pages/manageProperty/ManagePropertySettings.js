import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import OrderItem from "../../components/order/OrderItem";
import DeletePropertyModal from "../../components/settings/DeletePropertyModal";
import { useAlert } from "../../context/AlertContext";
import { getPublishedStatus } from "../../util/propertyStatus";
import { PROPERTY_QUERY } from "../../queries/getProperty";

const PROPERTY_ORDERS_QUERY = gql`
  query PropertyOrders($uuid: String!) {
    propertyOrders(uuid: $uuid) {
      chargeId
      createdAt
      amountTotal
      currency
      paid
      refunded
      paymentType
      priceType
      receiptUrl
    }
  }
`;

const SET_AS_SOLD_MUTATION = gql`
  mutation MarkAsSold($uuid: String!, $undo: Boolean) {
    markAsSold(uuid: $uuid, undo: $undo)
  }
`;

export default function ManagePropertySettings({ status, publishedStatus }) {
  const { propertyId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { setShowAlert } = useAlert();
  const { loading, error, data } = useQuery(PROPERTY_ORDERS_QUERY, {
    variables: { uuid: propertyId },
  });
  const [markAsSold, { error: errorSetAsSold }] = useMutation(
    SET_AS_SOLD_MUTATION,
    {
      refetchQueries: [
        {
          query: PROPERTY_QUERY,
          variables: { uuid: propertyId },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  useEffect(() => {
    if (error || errorSetAsSold) {
      setShowAlert(true);
    }
  }, [error, errorSetAsSold, setShowAlert]);

  if (loading) {
    return <p>loading...</p>;
  }

  const orders = data?.propertyOrders;
  let pricePackage = null;
  if (orders && orders.length >= 1) {
    pricePackage = orders[0].priceType;
  }

  const [publishedText, publishedColor] = getPublishedStatus(publishedStatus);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Property Settings
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-${publishedColor}-100 text-${publishedColor}-800 mt-2 flex items-center text-sm leading-5 sm:mr-6`}
              >
                {publishedText}
              </span>
              {status === "SOLD" && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-orange-100 text-orange-800 mt-2 flex items-center text-sm leading-5 sm:mr-6`}
                >
                  sold
                </span>
              )}
            </dd>
          </div>
          {publishedStatus === "PUBLISHED" && status !== "SOLD" && (
            <div className="mt-8 sm:mt-0  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500"></dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center  px-4 py-2  border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                    onClick={async () => {
                      await markAsSold({
                        variables: {
                          uuid: propertyId,
                          undo: false,
                        },
                      });
                    }}
                  >
                    Mark As Sold
                  </button>
                </span>
              </dd>
            </div>
          )}
          {status === "SOLD" && (
            <div className="mt-8 sm:mt-0  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500"></dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center  px-4 py-2  border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition ease-in-out duration-150"
                    onClick={async () => {
                      await markAsSold({
                        variables: {
                          uuid: propertyId,
                          undo: true,
                        },
                      });
                    }}
                  >
                    Remove Sold Status
                  </button>
                </span>
              </dd>
            </div>
          )}
          {pricePackage && (
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Package
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {pricePackage === "year" && "One year"}
                {pricePackage === "month" && "One month"}
                {pricePackage === "lifetime" && "Lifetime"}
              </dd>
            </div>
          )}
          {publishedStatus === "PUBLISHED" && (
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Valid until
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                Lifetime Access
              </dd>
            </div>
          )}
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Billing History
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              {orders.map((o) => (
                <OrderItem
                  key={o.chargeId}
                  receiptUrl={o.receiptUrl}
                  createdAt={o.createdAt}
                  amountTotal={o.amountTotal}
                  currency={o.currency}
                  paid={o.paid}
                  paymentType={o.paymentType}
                  priceType={o.priceType}
                />
              ))}
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Delete Property
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={() => setShowModal(true)}
              >
                Delete Property
              </button>
            </dd>
          </div>
        </dl>
      </div>
      <DeletePropertyModal
        showModal={showModal}
        setShowModal={setShowModal}
        propertyToDelete={propertyId}
      />
    </div>
  );
}
