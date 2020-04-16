import React from "react";
import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
import Home from "../Routes/Home";
import Read from "../Routes/Read";
import routesName from "../routesName";
import Forbidden from "../Routes/Forbidden";

const BaseRoutes = () => (
  <Switch>
    <Route exact path={routesName.home} component={Home} />
    <Route path={`${routesName.read}/:bookName`} component={Read} />
    <Route path={`${routesName.forbidden}`} component={Forbidden} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = () => {
  return (
    <Router>
      <BaseRoutes />
    </Router>
  );
};
export default AppRouter;
