import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Saved from "./pages/Saved";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
<div className="container-fluid">
  <Switch>

    <Route exact path={["/saved"]}>
      <Saved/>
    </Route>

    <Route exact path={"/"}>
      <Search/>
    </Route>

  </Switch>

    </div>
    </Router>
  );
}

export default App;
