import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import routes from "./routes";

export default function App() {
  console.log(process.env)

  // this is temp, remove later (testing routes)
  // add following for server side rendered pages (pageX.tsx must be located in dir)
  // <NextLink href="/pageX">PageX (SSR)</NextLink>
  const temp_testing_routes = (
    <>
      <div className="temp-testing-routes">
        <h1>Click below links to test routing</h1>
        {routes.map((route, index) => {
          return (
            <Link key={index} to={route.path}>{route.key}</Link>
          );
        })}
      </div>
    </>
  )

  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={
              <route.layout>
                <route.component />
              </route.layout>
            } />
          )
        })
        }
      </Routes>

      {temp_testing_routes}
    </Router>
  )
} 
