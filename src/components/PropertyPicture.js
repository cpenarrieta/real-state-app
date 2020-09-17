import React, { useState, useEffect, memo } from "react";
import clsx from "clsx";
import { Transition } from "@tailwindui/react";
import DeleteImageModal from "./DeleteImageModal";

const PropertyPicture = memo(
  ({
    url,
    urlLowRes,
    id,
    saveProperty,
    propertyId,
    refetchGetProperty,
    refetchGetImages,
    forwardedRef,
    title,
    style,
  }) => {
    const [state, setState] = useState("idle");
    const [activeType, setActiveType] = useState(undefined);
    const [showModal, setShowModal] = useState(false);

    function activate() {
      if (state === "idle") {
        setState("active");
      }
    }

    function deactivate() {
      if (state === "active") {
        setState("idle");
        setActiveType(undefined);
      }
    }

    useEffect(() => {
      if (state === "submitted") {
        const handler = window.setTimeout(() => {
          setState("idle");
        }, 1000);
        return () => {
          window.clearTimeout(handler);
        };
      }
    }, [state]);

    return (
      <div
        ref={forwardedRef}
        id={id}
        title={title}
        className="h-24 w-32 p-1"
        style={{
          backgroundImage: `url("${urlLowRes}")`,
          backgroundSize: "cover",
          ...style,
        }}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onClick={activate}
      >
        <Transition
          show={state === "active"}
          enter="transition-opacity duration-100 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div
              ref={ref}
              role="menu"
              className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-1 h-full"
            >
              <div
                className={clsx(
                  "cursor-pointer col-span-2 font-medium bg-purple-200 bg-opacity-75 rounded-md text-purple-700 transition-colors duration-150 flex justify-center items-center",
                  { "bg-opacity-100": activeType === "COVER" }
                )}
                onMouseEnter={() => setActiveType("COVER")}
                onMouseLeave={() => setActiveType(undefined)}
                onClick={async () => {
                  await saveProperty({
                    variables: {
                      property: {
                        uuid: propertyId,
                        mainImageId: id,
                        mainPicture: url,
                        mainPictureLowRes: urlLowRes,
                      },
                    },
                  });
                  refetchGetProperty();
                }}
              >
                Set Cover
              </div>
              <div
                className={clsx(
                  "cursor-pointer col-span-1 font-medium bg-red-200 bg-opacity-75 rounded-md text-red-700 transition-colors duration-150 flex justify-center items-center",
                  { "bg-opacity-100": activeType === "DELETE" }
                )}
                onMouseEnter={() => setActiveType("DELETE")}
                onMouseLeave={() => setActiveType(undefined)}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div
                className={clsx(
                  "cursor-pointer col-span-1 font-medium bg-yellow-200 bg-opacity-75 rounded-md text-yellow-700 transition-colors duration-150 flex justify-center items-center",
                  { "bg-opacity-100": activeType === "DRAG" }
                )}
                onMouseEnter={() => setActiveType("DRAG")}
                onMouseLeave={() => setActiveType(undefined)}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </div>
            </div>
          )}
        </Transition>
        <DeleteImageModal
          showModal={showModal}
          setShowModal={setShowModal}
          imageToDelete={id}
          refetchGetImages={refetchGetImages}
          propertyId={propertyId}
        />
      </div>
    );
  }
);

export default PropertyPicture;
