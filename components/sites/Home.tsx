import React from "react";
import About from "../sections/AboutAndWhat/about";
import Gallery from "../sections/Gallery/Gallery";
import MemeCreator from "../sections/Generator/MemeCreator/memecreator";

const Home = () => {

    return (
        <div className="NFMeme-Home-container">
            <MemeCreator />
            <Gallery />
            <About />
        </div>
    )
}
export default Home;