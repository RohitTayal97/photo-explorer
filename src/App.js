import { useEffect, useState, useRef } from "react";
import PhotoViewer from "./components/PhotoViewer";
import "./styles.css";
import photos from "./data/photos";

export default function App() {
  const [selectedId, setSelectedId] = useState(-1);
  const lazyImagesRef = useRef([]);

  const size = "regular";
  const pixelsBeforeToLoad = "100px";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.url;
            image.addEventListener("load", () => {
              image.classList.remove("invisible");
            });
            observer.unobserve(image);
          }
        });
      },
      { rootMargin: pixelsBeforeToLoad }
    );

    if (lazyImagesRef.current) {
      lazyImagesRef.current.forEach((imageRef) => {
        observer.observe(imageRef);
      });
    }
  }, [pixelsBeforeToLoad]);

  useEffect(() => {
    if (selectedId >= 0) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [selectedId]);

  const addImageRef = (ref) => {
    lazyImagesRef.current.push(ref);
  };

  return (
    <div className="app">
      <h1 className="header">Unsplash Gallary</h1>
      <div className="explorer">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className="image-button"
            onClick={() => setSelectedId(index)}
          >
            <img
              className="image invisible"
              ref={addImageRef}
              data-url={photo.urls[size]}
              alt={`Taken by ${photo.user.name}`}
            />
          </button>
        ))}
      </div>
      {selectedId >= 0 && (
        <PhotoViewer index={selectedId} exitViewer={() => setSelectedId(-1)} />
      )}
    </div>
  );
}
