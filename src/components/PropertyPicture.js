import React, { useState, useEffect, memo } from "react";
import clsx from "clsx";
import { Transition } from "@tailwindui/react";

const PropertyPicture = memo(({ url }) => {
  const [state, setState] = useState("idle");
  const [activeType, setActiveType] = useState(undefined);

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
      className={clsx("relative", {
        group: state === "active",
      })}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={activate}
    >
      <div className="relative text-center text-sm">
        <img className="rounded-sm" src={url} alt="property image" />
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
              id={`${url}`}
              role="menu"
              aria-labelledby={`${url}-btn`}
              tabIndex={-1}
              aria-activedescendant={
                activeType ? `${url}-${activeType}` : undefined
              }
              className={clsx("absolute inset-0 z-10 p-1", {
                "pointer-events-none": state !== "active",
              })}
            >
              {/* <div className="absolute top-1/2 left-1/2 w-full -ml-4 -mt-4 bg-white bg-opacity-75" /> */}
              <div
                id={`${url}-svg`}
                tabIndex={-1}
                role="menuitem"
                className={clsx(
                  "relative cursor-pointer leading-42px xs:leading-10 font-medium bg-purple-200 bg-opacity-50 rounded-md text-purple-700 transition-colors duration-150 outline-none",
                  { "bg-opacity-75": activeType === "svg" }
                )}
                onMouseEnter={() => setActiveType("svg")}
                onMouseLeave={() => setActiveType(undefined)}
                // onClick={() => copy("svg")}
              >
                Set Cover
              </div>
              <div
                id={`${url}-jsx`}
                tabIndex={-1}
                role="menuitem"
                className={clsx(
                  "relative cursor-pointer mt-1 leading-42px xs:leading-10 font-medium bg-red-200 bg-opacity-50 rounded-md text-red-700 transition-colors duration-150 outline-none",
                  { "bg-opacity-75": activeType === "jsx" }
                )}
                onMouseEnter={() => setActiveType("jsx")}
                onMouseLeave={() => setActiveType(undefined)}
                // onClick={() => copy("jsx")}
              >
                Delete
              </div>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
});

export default PropertyPicture;
