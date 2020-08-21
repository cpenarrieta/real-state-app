import React from "react";
import DestinationCard from "./DestinationCard";

export default function PropertyHero() {
  return (
    <div id="app">
      <div className="bg-gray-100 flex">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
          <div className="xl:max-w-lg xl:ml-auto">
            <img
              className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-72 sm:w-full sm:object-cover sm:object-center lg:hidden"
              src={
                "https://res.cloudinary.com/real-state-app/image/upload/v1597896404/real-state-app/6592_190725-377_retouched.jpg"
              }
              alt="Property Hero"
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              You can work from anywhere.
              <br className="hidden lg:inline" />
              <span className="text-brand-blue">Take advantage of it.</span>
            </h1>
            <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
              Workcation helps you find work-friendly rentals in beautiful
              locations so you can enjoy some nice weather even when you're not
              on vacation.
            </p>
            <div className="mt-4 sm:mt-6">
              <button
                type="button"
                className="btn bg-brand-blue text-white shadow-lg sm:text-base px-5 py-3 rounded-lg uppercase tracking-wider font-semi-bold"
              >
                Book your escape
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 lg:relative">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={
              "https://res.cloudinary.com/real-state-app/image/upload/v1597896404/real-state-app/6592_190725-377_retouched.jpg"
            }
            alt="Property hero"
          />
        </div>
      </div>
      <div>
        <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
          <h2 className="text-xl text-gray-900">Popular destinations</h2>
          <p className="text-gray-600">
            A selection of great work-friendly cities with lots to see and
            explore.
          </p>
          <div className="flex flex-wrap -mx-4">
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
            <div className="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3">
              <DestinationCard
                imageUrl={
                  "https://res.cloudinary.com/real-state-app/image/upload/v1597896410/real-state-app/0012f625323bc466ba586bbff0600e9d7ca.jpg"
                }
                imageAlt={"alt image"}
                city={"Langley"}
                price={1236}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
