import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Project from "./components/pages/Project";
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/project" component={Project} />
      </div>
    </Router>
  );
}

export default App;
