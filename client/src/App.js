import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Project from "./components/pages/Project";
import PageNotFound from "./components/pages/PageNotFound";
function App() {
  const [state, setState] = useState({
    authentication: sessionStorage.getItem("user-id") ? true : false
  });
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        {state.authentication && (
          <Route exact path="/project" component={Project} />
        )}
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
