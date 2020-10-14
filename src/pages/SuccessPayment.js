import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccessToken } from "../context/AccessTokenContext";
import { useLazyQuery, gql } from "@apollo/client";
import OrderItem from "../components/order/OrderItem";
import { useAlert } from "../context/AlertContext";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SuccessPayment = () => {
  const { accessToken } = useAccessToken();
  const query = useQuery();
  const sessionId = query.get("session_id");
  const propertyId = query.get("propertyId");
  const [getQuery, { loading, error, data, called }] = useLazyQuery(
    PROPERTY_ORDERS_QUERY,
    {
      variables: { uuid: propertyId },
    }
  );
  const { setShowAlert } = useAlert();

  useEffect(() => {
    async function fetchSession() {
      await getQuery();
    }
    fetchSession();
  }, [sessionId, accessToken, getQuery]);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

  if (loading || !called) {
    return <p>loading...</p>;
  }

  const orders = data?.propertyOrders;

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-base leading-6 font-semibold text-indigo-600 tracking-wide uppercase">
            payment
          </h1>
          <p className="mt-1 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            Payment succeeded
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-500 mb-5">
            Your website should be live in the next 15'.
          </p>
          <Link
            to={`/manage-property/${propertyId}`}
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          >
            Back To Property
          </Link>
          <Link
            to="/dashboard"
            type="button"
            className="ml-5 inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
          >
            Go to Dashboard
          </Link>
        </div>
        <div className="mt-5">
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
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
