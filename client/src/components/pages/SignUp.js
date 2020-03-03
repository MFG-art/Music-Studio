import React from "react";
import axios from "axios";

function handleSignUp() {
  var newUserInfo = {
    username: document.getElementById("username-input").value,
    password: document.getElementById("password-input").value
  };
  axios
    .get("api/users")
    .then(function(response) {
      console.log(response.data);
      var usersArray = response.data;
      var alreadyExists = false;

      for (var i = 0; i < usersArray.length; i++) {
        if (
          usersArray[i].username === newUserInfo.username &&
          usersArray[i].password === newUserInfo.password
        ) {
          alreadyExists = true;
        } else {
          alreadyExists = false;
        }
      }

      if (!alreadyExists) {
        console.log("Creating new account...");
        axios
          .post("api/users", newUserInfo)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(err) {
            throw err;
          });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
function SignUp() {
  return (
    <div>
      <div className="box">
        <h1>Create a new account:</h1>
        <input
          id="username-input"
          className="inputBox"
          placeholder="Enter username"
        />
        <input
          id="password-input"
          type="password"
          className="inputBox"
          placeholder="Enter password"
        />
        <input
          id="confirm-password-input"
          type="password"
          className="inputBox"
          placeholder="Confirm password"
        />

        <button id="sign-up-btn" className="btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <a href="/sign-in">
          <div id="sign-up-btn">Log In</div>
        </a>
      </div>
    </div>
  );
}

export default SignUp;
