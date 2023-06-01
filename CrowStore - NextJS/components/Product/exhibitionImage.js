import React from "react";
import "./exhibition-image.css"

const ExhibitionImage = ({ image }) => {
    return (
        <div className="exhibition-image" style={{ backgroundImage: `url(${image})` }}>
        </div>
    )
}

export default ExhibitionImage;
