import React, { useState } from "react";
import { Gallery, Thumbnail } from "./ProductGalleryElements.jsx";

const ProductGallery = ({ images, onSelect }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const handleThumbnailClick = (image, index) => {
    setSelectedThumbnail(index);
    onSelect(image);
  };

  return (
    <Gallery>
      {images.map((image, index) => {
        const imagePath = `/CrowStore/imgs/${image}`;
        return (
          <Thumbnail
            key={index}
            src={imagePath}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(imagePath, index)}
            isSelected={selectedThumbnail === index}
          />
        );
      })}
    </Gallery>
  );
};

export default ProductGallery;
