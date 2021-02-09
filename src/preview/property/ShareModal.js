import React, { useState, useEffect } from "react";
import { Transition } from "@tailwindui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

export default function ShareModal({
  showModal,
  setShowModal,
  liveWebsiteUrl,
  seoTitle,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const handler = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [copied]);

  function copy(e) {
    var copyText = document.querySelector("#property-url");
    copyText.select();
    document.execCommand("copy");
    setCopied(true);
  }

  const text = seoTitle;
  const emailTitle = seoTitle;

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
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-logoFont"
                    id="modal-headline"
                  >
                    Share this Property
                  </h3>
                  <div className="mt-2">
                    <div>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <button
                          onClick={copy}
                          className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
                        >
                          <svg
                            className="h-4 w-4 text-gray-600 hover:text-logoRed"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                        <input
                          id="property-url"
                          className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                          defaultValue={liveWebsiteUrl}
                        />
                      </div>
                      <Transition
                        show={copied}
                        enter="transition-opacity duration-300 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300 ease-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        {(ref) => (
                          <div ref={ref} className="text-green-500 text-sm">
                            Copied
                          </div>
                        )}
                      </Transition>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-4">
                    <FacebookShareButton url={liveWebsiteUrl} quote={text}>
                      <FacebookIcon size={32} />
                    </FacebookShareButton>
                    <TwitterShareButton url={liveWebsiteUrl} title={text}>
                      <TwitterIcon size={32} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={liveWebsiteUrl} title={text}>
                      <WhatsappIcon size={32} />
                    </WhatsappShareButton>
                    <FacebookMessengerShareButton
                      url={liveWebsiteUrl}
                      appId={process.env.FACEBOOK_APP_ID}
                    >
                      <FacebookMessengerIcon size={32} />
                    </FacebookMessengerShareButton>
                    <LinkedinShareButton url={liveWebsiteUrl}>
                      <LinkedinIcon size={32} />
                    </LinkedinShareButton>
                    <PinterestShareButton
                      url={liveWebsiteUrl}
                      // media={`${String(window.location)}/${exampleImage}`} TODO put image url
                    >
                      <PinterestIcon size={32} />
                    </PinterestShareButton>
                    <EmailShareButton
                      url={liveWebsiteUrl}
                      subject={emailTitle}
                      body={text}
                    >
                      <EmailIcon size={32} />
                    </EmailShareButton>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <span className="flex w-full rounded-md shadow-sm">
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="inline-flex justify-center w-1/2 rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center w-1/2 rounded-md border border-transparent px-4 py-2 bg-logoRed text-base leading-6 font-medium text-white shadow-sm hover:bg-logoRed-500 focus:outline-none focus:border-logoRed-500 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setShowModal(false)}
                  >
                    Done
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
