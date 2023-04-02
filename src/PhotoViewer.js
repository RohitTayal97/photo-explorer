import { useState } from "react";
import "./styles.css";
import photos from "./data/photos";
import { ReactComponent as BackSvg } from "./utils/back.svg";
import { ReactComponent as LeftSvg } from "./utils/left.svg";
import { ReactComponent as RightSvg } from "./utils/right.svg";

export default function PhotoViewer({ index, exitViewer }) {
  const [photoIndex, setPhotoIndex] = useState(index);

  const size = "regular";
  const photosLength = photos.length;

  const changePhotoIndex = (changeBy) => {
    setPhotoIndex((prevPhotoIndex) => {
      return prevPhotoIndex + changeBy;
    });
  };

  return (
    <div className="photoViewer">
      <button className="goBack" onClick={exitViewer}>
        <BackSvg />
      </button>
      <img
        className="photoViewer-image"
        src={photos[photoIndex].urls[size]}
        alt={`Taken by ${photos[photoIndex].user.name}`}
      />
      <div className="change">
        <button
          className="left"
          disabled={photoIndex === 0}
          onClick={() => changePhotoIndex(-1)}
        >
          <LeftSvg />
        </button>
        <button
          className="right"
          disabled={photoIndex === photosLength - 1}
          onClick={() => changePhotoIndex(1)}
        >
          <RightSvg />
        </button>
      </div>
    </div>
  );
}
