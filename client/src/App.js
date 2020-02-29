import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
