// import React, { useState, useCallback, useEffect } from "react";
// import { Controlled as ControlledZoom } from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

// export default function ImageGrid({ images }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const handleKeyDown = useCallback(
//     (e) => {
//       if (activeIndex === null) {
//         return;
//       }

//       if (e.key === "ArrowLeft" || e.keyCode === 37) {
//         setActiveIndex(Math.max(activeIndex - 1, 0));
//       } else if (e.key === "ArrowRight" || e.keyCode === 39) {
//         setActiveIndex(Math.min(activeIndex + 1, images.length - 1));
//       }
//     },
//     [activeIndex, images.length]
//   );

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   });

//   return (
//     <div className={`bg-gray-50 z-10 relative`}>
//       <div className="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24">
//         <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:col-gap-6 sm:row-gap-12 sm:space-y-0 lg:grid-cols-3 lg:col-gap-8">
//           {images.map((img, i) => {
//             const handleZoomChange = (isZoomed) => {
//               if (isZoomed) {
//                 setActiveIndex(i);
//                 return;
//               }
//               setActiveIndex(null);
//             };

//             return (
//               <li key={`${i}-${img.url}`}>
//                 <ControlledZoom
//                   isZoomed={activeIndex === i}
//                   onZoomChange={handleZoomChange}
//                   transitionDuration={0}
//                 >
//                   <div
//                     style={{
//                       display: "inline-block",
//                       maxWidth: "100%",
//                       overflow: "hidden",
//                       position: "relative",
//                       boxSizing: "border-box",
//                       margin: 0,
//                     }}
//                   >
//                     <div
//                       style={{
//                         boxSizing: "border-box",
//                         display: "block",
//                         maxWidth: "100%",
//                       }}
//                     >
//                       <img
//                         src={img.url}
//                         // alt={`alt-${i}`}
//                         // width={1200}
//                         // height={800}
//                         style={{
//                           maxWith: "100%",
//                           display: "block",
//                         }}
//                         alt=""
//                         aria-hidden="true"
//                         role="presentation"
//                         className="absolute object-cover h-full w-full shadow-lg rounded-lg"
//                       />
//                     </div>
//                   </div>
//                 </ControlledZoom>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import ImageModal from "./ImageModal";

export default function ImageGrid({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  return (
    <>
      <div className={`bg-gray-50 z-10 relative`}>
        <div className="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:col-gap-6 sm:row-gap-12 sm:space-y-0 lg:grid-cols-3 lg:col-gap-8">
              {images.map((image, key) => {
                return (
                  <li
                    className="hidden sm:block sm:cursor-pointer"
                    key={`${key}-desk-ima`}
                    onClick={() => {
                      setImageKey(key);
                      setShowModal(true);
                    }}
                  >
                    <div className="space-y-4">
                      <div className="relative pb-2/3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <img
                          className="absolute object-cover h-full w-full shadow-lg rounded-lg"
                          src={image.url}
                          alt={`alt-${key}`}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
              {images.map((image, key) => {
                return (
                  <li
                    key={`${key}-mob-ima`}
                    className="sm:hidden"
                  >
                    <div className="space-y-4">
                      <div className="relative pb-2/3">
                        <img
                          className="absolute object-cover h-full w-full shadow-lg rounded-lg"
                          src={image.urlLowRes}
                          alt={`alt-${key}`}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <ImageModal
        showModal={showModal}
        setShowModal={setShowModal}
        imageKey={imageKey}
        setImageKey={setImageKey}
        images={images}
      />
    </>
  );
}