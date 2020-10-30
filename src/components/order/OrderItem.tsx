import React from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

type OrderItemProps = {
  receiptUrl: string;
  createdAt: string;
  amountTotal: number;
  currency: string;
  paid: boolean;
  priceType: string;
  uuid?: string;
  title?: string;
  image?: string;
};

export default function OrderItem({
  receiptUrl,
  createdAt,
  amountTotal,
  currency,
  paid,
  priceType,
  uuid,
  title,
  image,
}: OrderItemProps) {
  const dateFormat = format(parseISO(createdAt), "MMM do yyyy");

  // TODO what to do in the rest of scenarios
  if (!paid) return;

  return (
    <div className="mt-2">
      <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
        <div className="sm:flex sm:items-start">
          <svg
            className="h-8 w-auto sm:flex-shrink-0 sm:h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>

          <div className="mt-3 sm:mt-0 sm:ml-4">
            <div className="text-sm leading-5 font-medium text-logoFont">
              ${amountTotal / 100}{" "}
              <span className="uppercase text-gray-400">{currency}</span>
            </div>
            <div className="mt-1 text-sm leading-5 text-gray-600 sm:flex sm:items-center">
              <div>Paid on {dateFormat}</div>
              <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                &middot;
              </span>
              <div className="mt-1 sm:mt-0">1 {priceType} package</div>
            </div>
          </div>
        </div>

        {uuid && (
          <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
            <span className="inline-flex rounded-md shadow-sm">
              <Link
                className="inline-flex items-center rounded-md text-logoFont focus:outline-none focus:shadow-outline-blue active:text-gray-800 transition ease-in-out duration-150"
                to={`/manage-property/${uuid}`}
              >
                {image ? (
                  <img
                    className="h-12 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:translate-y-1 hover:scale-105"
                    src={image}
                    alt="order property house"
                  />
                ) : (
                  <>{title || uuid}</>
                )}
              </Link>
            </span>
          </div>
        )}

        <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
          <span className="inline-flex rounded-md shadow-sm">
            <a
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              href={receiptUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Receipt
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
