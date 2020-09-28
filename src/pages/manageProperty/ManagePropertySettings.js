import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import OrderItem from "../../components/order/OrderItem";

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

export default function ManagePropertySettings() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(PROPERTY_ORDERS_QUERY, {
    variables: { uuid: propertyId },
  });

  if (loading) {
    return <p>loading...</p>;
  }

  const orders = data?.propertyOrders;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Property Settings
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Package
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              One year
            </dd>
          </div>
          <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Valid until
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              Oct 28th 2021
            </dd>
          </div>
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
              >
                Delete Property
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
