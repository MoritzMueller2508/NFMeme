import React, { Fragment } from "react";
import Frame from "./Frame/frame";
import Picture from "./Picture/picture";

// TODO: Use Picture/Frame here
const Gallery = () => {

    return (
        <div className="gallery-class">
            <Frame/> {/* maybe pass NFT-imges to Frame as prop (Array) */ }
        </div>
    );
}
export default Gallery;