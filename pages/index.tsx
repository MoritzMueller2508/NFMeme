import type { NextPage } from 'next';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";


const Home: any = () => {
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              }}
            />
          );
        })}
      </div>
    </Router>
}

export default Home
