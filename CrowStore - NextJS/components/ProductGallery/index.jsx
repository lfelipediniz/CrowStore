import React from "react";
import { Gallery, Thumbnail } from "./ProductGalleryElements.jsx"

const ProductGallery = ({ images, onSelect }) => {
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);

    const handleThumbnailClick = (image, index) => {
        setSelectedThumbnail(index);
        onSelect(image);

        return (
            <Gallery>
                {images.map((image, index) => (
                    <Thumbnail
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => handleThumbnailClick(image, index)}
                        isSelected={selectedThumbnail === index}
                    />
                ))}
            </Gallery>
        );
    };
};

export default ProductGallery;
