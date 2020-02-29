import React from "react";

function SignUp() {
  return (
    <div>
      <div class="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label for="username">
          <b>username</b>
        </label>
        <input
          id="username-input"
          type="text"
          placeholder="username"
          name="username"
          required
        ></input>

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          id="password-input"
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        ></input>

        <label for="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          id="password-confitm-input"
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          required
        ></input>
      </div>
    </div>
  );
}

export default SignUp;
