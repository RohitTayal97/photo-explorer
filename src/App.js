import { useEffect, useState } from "react";
import PhotoViewer from "./PhotoViewer";
import "./styles.css";
import photos from "./data/photos";

export default function App() {
  const [selectedId, setSelectedId] = useState(-1);

  const size = "thumb";
  const pixelsBeforeToLoad = "100px";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.src = element.dataset.url;
            observer.unobserve(element);
          }
        });
      },
      { rootMargin: pixelsBeforeToLoad }
    );

    const lazyImages = document.querySelectorAll("[data-url]");
    lazyImages.forEach((image) => {
      observer.observe(image);
    });
  }, []);

  useEffect(() => {
    if (selectedId >= 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedId]);

  return (
    <div className="app">
      <h2>Photos courtesy of Unsplash and it's users</h2>
      <div className="explorer">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className="image-button"
            onClick={() => setSelectedId(index)}
          >
            <img
              src=""
              className="image"
              data-url={photo.urls[size]}
              // loading="lazy"
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
