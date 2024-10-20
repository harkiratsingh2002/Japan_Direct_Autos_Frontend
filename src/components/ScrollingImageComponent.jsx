import React, { useState } from "react";
import links from "../assets/util/links";
import styles from "./ScrollingImageComponent.module.css";

const ScrollingImageComponent = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Main Image */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* Left Arrow */}
        <button
          onClick={handlePrevImage}
          style={{
            position: "absolute",
            left: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "10px",
            zIndex: 10,
          }}
        >
          &#8592; {/* Left arrow */}
        </button>

        <img
          style={{
            height: "auto",
            width: "100%",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          src={links.backendUrl + "/" + currentImage}
          alt="Car"
        />

        {/* Right Arrow */}
        <button
          onClick={handleNextImage}
          style={{
            position: "absolute",
            right: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "10px",
            zIndex: 10,
          }}
        >
          &#8594; {/* Right arrow */}
        </button>
      </div>

      {/* Thumbnails */}
      <div className={styles.scrollContainer}>
        <div className={styles.imageWrapper}>
          {images.map((image, i) => (
            <img
              key={i}
              onClick={() => handleImageClick(i)}
              className={`${styles.image} ${i === currentIndex ? styles.active : ''}`}
              src={links.backendUrl + "/" + image}
              alt={`Thumbnail ${i}`}
              style={{
                cursor: "pointer",
                border: i === currentIndex ? "2px solid blue" : "none", // Highlight current image
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingImageComponent;
