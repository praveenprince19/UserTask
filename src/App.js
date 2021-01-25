import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddData from "./containers/AddData/AddData";
import ListData from "./containers/ListData/ListData";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListData} />
        <Route exact path="/addData" component={AddData} />
      </Switch>
    </Router>
  );
}
