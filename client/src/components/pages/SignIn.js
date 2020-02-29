import React from "react";

function SignIn() {
  return (
    <div>
      <div class="box">
        <h1>Dashboard</h1>
        <input id="username-input" className="password" />
        <input id="password-input" type="password" className="password" />
        <a href="index.html">
          <div id="sign-in-btn" class="btn">
            Sign In
          </div>
        </a>
        <a href="/sign-up">
          <div id="sign-up-btn">Sign Up</div>
        </a>
      </div>
    </div>
  );
}

export default SignIn;
