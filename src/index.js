/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "gestalt/dist/gestalt.css";

import App from "./Components/App";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Checkout from "./Components/Checkout";

import registerServiceWorker from "./registerServiceWorker";
import Navbar from "./Components/Navbar";

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />

      <Switch>
        <Route component={App} exact path="/" />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
      </Switch>
    </React.Fragment>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
