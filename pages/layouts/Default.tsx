import React from "react";

import Navbar from "../../components/sections/Navbar/navbar";


const DefaultLayout = ({ children, noNavbar }) => (
    <>
        {!noNavbar && <Navbar />}
        {children}
    </>
    )

export default DefaultLayout;