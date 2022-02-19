import React from "react"

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import MemeCreator from "../components/sections/Generator/MemeCreator/memecreator";

const routes = [
  {
    key: "MemeCreator",
    path: "/",
    layout: DefaultLayout,
    component: MemeCreator
  }
];

export default routes;