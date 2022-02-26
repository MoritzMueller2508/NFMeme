import React, { Component } from "react";
//import "./picture.css"


function Picture(props:any) {
    
    return (
    
        <div className="picture-container">
            <img className="image" src={props.url} alt="logo" /> 

        </div>
    );
}
    
export default Picture;