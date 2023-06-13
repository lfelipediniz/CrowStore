import React, { useState } from 'react';

const Visualizer = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const renderThumbnails = () => {
        return images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
                onClick={() => handleThumbnailClick(image)}
            />
        ));
    };

    return (
        <VisualizerContainer>
            <Thumbnails>
                {renderThumbnails()}
            </Thumbnails>
            <DisplayImage src={selectedImage} alt="Selected Image" className="selected-image" />
        </VisualizerContainer>
    );
};

export default Visualizer;
