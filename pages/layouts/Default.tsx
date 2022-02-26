import React, { FunctionComponent } from "react";

import Navbar from "../../components/sections/Navbar/navbar";

type LayoutProps = {
    noNavbar?: boolean,
    noFooter?: boolean,
    noHead?: boolean
}

const DefaultLayout: FunctionComponent<LayoutProps> = (layoutProps) => (
    <>
        {!layoutProps.noNavbar && <Navbar />}
        {layoutProps.children}
    </>
)

export default DefaultLayout;