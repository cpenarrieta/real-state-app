import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import OrderItem from "../components/order/OrderItem";
import DeleteAccountModal from "../components/settings/DeleteAccountModal";
import { useQuery, gql } from "@apollo/client";
import { useUser } from "../context/UserContext";
import Loading from '../components/Loading'

const ORDERS_QUERY = gql`
  query UserOrders {
    orders {
      chargeId
      createdAt
      amountTotal
      currency
      paid
      refunded
      paymentType
      priceType
      receiptUrl
      title
      uuid
      image
    }
  }
`;

export default function Settings() {
  const [showModal, setShowModal] = useState(false);
  const { loading, data } = useQuery(ORDERS_QUERY);
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  if (loading || !user) {
    return <Loading />;
  }

  const orders = data?.orders || [];

  return (
    <div>
      <PageHeader title="Settings" />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-0">
          <dl>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Account Status
              </dt>
              <dd className="mt-1 text-sm leading-5 text-logoFont sm:mt-0 sm:col-span-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-green-100 text-green-800 mt-2 sm:mr-6`}
                >
                  Active
                </span>
              </dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Billing History
              </dt>
              <dd className="mt-1 text-sm leading-5 text-logoFont sm:mt-0 sm:col-span-2">
                {orders.map((o) => (
                  <OrderItem key={o.chargeId} {...o} />
                ))}
              </dd>
            </div>
            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Delete Account
              </dt>
              <dd className="mt-1 text-sm leading-5 text-logoFont sm:mt-0 sm:col-span-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => setShowModal(true)}
                >
                  Delete Account
                </button>
              </dd>
            </div>
          </dl>
        </div>
        <DeleteAccountModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
}
