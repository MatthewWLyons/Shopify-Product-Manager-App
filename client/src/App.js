import React, { Component } from "react";
import { AppProvider } from "@shopify/polaris";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "@shopify/polaris/styles.css";

import AddProduct from "./components/AddProduct";
import ViewProducts from "./components/ViewProducts";

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <ViewProducts />
            </Route>
            <Route exact path="/add">
              <AddProduct />
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
