import React, { useRef } from "react";
import { Transition } from "@tailwindui/react";
import QRCode from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { DownloadQrCode } from "./DownloadQrCode";
import { useParams } from "react-router-dom";

export default function QrModal({ showModal, setShowModal, liveWebsiteUrl }) {
  const componentRef = useRef();
  const { propertyId } = useParams();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className={`${
        showModal ? "fixed z-10 inset-0 overflow-y-auto" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition
          show={showModal}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div
              ref={ref}
              className="fixed inset-0 transition-opacity"
              onClick={() => setShowModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          )}
        </Transition>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <Transition
          show={showModal}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          {(ref) => (
            <div
              ref={ref}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div ref={componentRef} className="HpQrcode">
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <div>
                      <div className="mt-1 flex justify-center">
                        <QRCode value={liveWebsiteUrl} size={200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <span className="flex w-full rounded-md">
                  <DownloadQrCode
                    token={liveWebsiteUrl}
                    serviceKey={propertyId}
                  />

                  <button
                    onClick={() => {
                      handlePrint();
                      setShowModal(false);
                    }}
                    type="button"
                    className=" ml-2 inline-flex justify-center w-1/2 rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    <svg
                      className="-ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    Print
                  </button>
                </span>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
}
