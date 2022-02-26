import {FunctionComponent} from "react"

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import MemeCreator from "../components/sections/Generator/MemeCreator/memecreator";
import MintBar from "../components/sections/Generator/MintBar/mintbar";
import Profile from "../components/sections/Generator/Profile/profile";
import Home from "../components/sites/Home";

type RouteData = {
  key: string,
  path: string,
  layout: FunctionComponent,
  component: FunctionComponent
}

/**
 * You don't need to use an exact prop on <Route path="/"> anymore. 
 * This is because all paths match exactly by default. 
 * If you want to match more of the URL because you have child routes use a trailing * as in <Route path="users/*">.
 * 
 * https://stackoverflow.com/questions/69866581/property-exact-does-not-exist-on-type
 */
const routes: RouteData[] = [
  {
    key: "Home",
    path: "/",
    layout: DefaultLayout,
    component: Home,
  },
  {
    key: "Profile",
    path: "/profile",
    layout: DefaultLayout,
    component: Profile,
  }
  // TODO: try with ids, etc
];

export default routes;