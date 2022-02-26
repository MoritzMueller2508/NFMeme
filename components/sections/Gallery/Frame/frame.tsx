import React from "react";
import Picture from "../Picture/picture";

const Frame = () => {


    return (
        <div className="frame-container">
            <div className="frame-item">
            <Picture url="https://picsum.photos/200/300/?random=1"/>
            </div>
            <div className="frame-item">
            <Picture url="https://picsum.photos/200/300/?random=2"/>
            </div>
        
        
        </div>
    );
}
export default Frame;