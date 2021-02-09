import React, { useState } from "react";
import { formatPrice } from "./utils/price";
import { getPropertyBadge } from "./utils/propertyStatus";
import { getColorThemeBackground, getColorThemeText } from "./utils/colorTheme";
import { format, compareDesc, isToday } from "date-fns";
import ShareModal from "./ShareModal";

export default function HeroBackground({
  title,
  mainPicture,
  price,
  bedrooms,
  bathrooms,
  city,
  province,
  status,
  publishedStatus,
  lotSize,
  color,
  hidePrice,
  openHouse,
  uuid,
  username,
  seoTitle,
}) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);
  const [colorMain, colorHover] = getColorThemeBackground(color);
  const [colorMainText, _] = getColorThemeText(color);

  const origin = "https://realtorapp.co";
  const liveWebsiteUrl = `${origin}/${username}/${uuid}`;

  // TODO: set default background if there is no image
  let comingOpenHouse = [];
  if (openHouse && openHouse.length > 0) {
    const today = new Date();
    openHouse.forEach((o) => {
      if (isToday(o.date) || compareDesc(today, o.date) >= 0) {
        comingOpenHouse.push(o);
      }
    });
  }

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url("${mainPicture}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="h-10 sm:h-32 md:h-40 lg:h-full lg:absolute lg:left-0 lg:w-1/2"></div>
      <div className="relative max-w-screen-xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
        <div className="bg-white bg-opacity-75 rounded-md max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 p-10">
          <div>
            <span
              className={`inline-block ${badgeColor} text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
            >
              {badgeText}
            </span>
          </div>

          {price && !hidePrice && (
            <div
              className={`text-2xl h-12 w-12 ${colorMainText} font-bold inline`}
            >
              {`$ ${formatPrice(price)}`}
            </div>
          )}

          <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            {title}
          </h2>
          <p className="mt-1 text-lg leading-7 text-gray-500">
            {city}, {province}
          </p>

          <div className="mt-8 overflow-hidden">
            <dl className="-mx-8 -mt-8 flex flex-wrap">
              {bedrooms && (
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base leading-6 font-medium text-gray-500">
                    Bedrooms
                  </dt>
                  <dd
                    className={`order-1 text-2xl leading-8 font-extrabold ${colorMainText} sm:text-3xl sm:leading-9`}
                  >
                    {bedrooms}
                  </dd>
                </div>
              )}
              {bathrooms && (
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base leading-6 font-medium text-gray-500">
                    Bathrooms
                  </dt>
                  <dd
                    className={`order-1 text-2xl leading-8 font-extrabold ${colorMainText} sm:text-3xl sm:leading-9`}
                  >
                    {bathrooms}
                  </dd>
                </div>
              )}
              {lotSize && (
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base leading-6 font-medium text-gray-500">
                    SQFT
                  </dt>
                  <dd
                    className={`order-1 text-2xl leading-8 font-extrabold ${colorMainText} sm:text-3xl sm:leading-9`}
                  >
                    {formatPrice(lotSize)}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {comingOpenHouse && comingOpenHouse.length > 0 && (
            <div>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {comingOpenHouse.slice(0, 2).map((o) => {
                  return (
                    <li
                      key={o.id}
                      className="col-span-2 flex shadow-sm rounded-md"
                    >
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-24 ${colorHover} text-white text-sm leading-5 font-medium rounded-l-md`}
                      >
                        <svg
                          className="h-6 w-6 ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">Open House</span>
                      </div>
                      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                          <span className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                            {format(o.date, "EEE, MMM do")}
                          </span>
                          <p className="text-gray-500">
                            {format(o.start, "h:mm aaa")} to{" "}
                            {format(o.end, "h:mm aaa")}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="flex flex-row flex-wrap">
            <div className="rounded-lg shadow-md mt-6 flex-1">
              <button
                onClick={() => {
                  const el = window.document.getElementById(
                    "form-lead-section"
                  );
                  el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block w-full text-center rounded-lg border border-transparent ${colorMain} px-6 py-4 text-xl leading-6 font-medium text-white hover:${colorHover} focus:outline-none focus:border-${colorMain} focus:shadow-outline-${color} transition ease-in-out duration-150 h-full`}
                aria-describedby="tier-growth"
              >
                Request Info
              </button>
            </div>

            <div className="rounded-lg shadow-md mt-6 flex-1 ml-2">
              <button
                onClick={async () => {
                  if (navigator.share) {
                    const shareData = {
                      title: seoTitle,
                      text: seoTitle,
                      url: liveWebsiteUrl,
                    };

                    try {
                      await navigator.share(shareData);
                    } catch {}
                  } else {
                    setShowShareModal(true);
                  }
                }}
                className={`inline-flex justify-center items-center w-full text-center rounded-lg border border-transparent ${colorMain} px-6 py-4 text-xl leading-6 font-medium text-white hover:${colorHover} focus:outline-none focus:border-${colorMain} focus:shadow-outline-${color} transition ease-in-out duration-150 h-full`}
                aria-describedby="tier-growth"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        liveWebsiteUrl={liveWebsiteUrl}
        seoTitle={seoTitle}
      />
    </div>
  );
}
