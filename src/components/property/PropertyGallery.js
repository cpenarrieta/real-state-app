import React from "react";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://res.cloudinary.com/real-state-app/image/upload/v1597895821/real-state-app/01.jpg",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default function PropertyGallery() {
  return (
    <ImageGallery
      items={images}
      thumbnailPosition="top"
      showIndex
      showPlayButton={false}
    />
  );
}
