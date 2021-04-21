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
import ShirtDesigns from "./Components/ShirtDesigns";
import Footer from "./Components/Footer";
import { Box } from "gestalt";

const Root = () => (
  <Router>
    <Box display="flex" justifyContent="between" direction="column">
      <Navbar />

      <Switch>
        <Route component={App} exact path="/" />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
        <Route component={ShirtDesigns} path="/:brandId" />
      </Switch>

      <Footer />
    </Box>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
