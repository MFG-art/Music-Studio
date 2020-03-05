import React, { useState } from "react";
import axios from "axios";

function handleSignUp() {
  console.log("Submit button was clicked");
  var newUserInfo = {
    username: document.getElementById("username-input").value,
    password: document.getElementById("password-input").value
  };
  axios
    .get("api/users")
    .then(function(response) {
      console.log(response.data);
      var usersArray = response.data;
      var alreadyExists;

      for (var i = 0; i < usersArray.length; i++) {
        if (usersArray[i].username === newUserInfo.username) {
          console.log("An account with the same name already exists");
          console.log(usersArray[i].username);
          console.log(
            usersArray[i].username + " is the same as " + newUserInfo.username
          );
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
            alert("Successfully created new account");
          })
          .catch(function(err) {
            throw err;
          });
      } else {
        alert("This username has already been taken");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function SignUp() {
  const [state, setState] = useState({ disabled: true });

  function disableButton() {
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let confirmPassword = document.getElementById("confirm-password-input")
      .value;
    let allFormsFilled = username && password && confirmPassword;
    let passwordsMatch = password === confirmPassword;
    if (allFormsFilled && passwordsMatch) {
      console.log("Submit button enabled");
      setState({ disabled: false });

      console.log();
    } else {
      console.log("Submit button disabled");
      setState({ disabled: true });
    }
  }

  return (
    <div>
      <div className="box">
        <h1>Create a new account:</h1>
        <input
          id="username-input"
          className="inputBox"
          placeholder="Enter username"
          onChange={disableButton}
        />
        <input
          id="password-input"
          type="password"
          className="inputBox"
          placeholder="Enter password"
          onChange={disableButton}
        />
        <input
          id="confirm-password-input"
          type="password"
          className="inputBox"
          placeholder="Confirm password"
          onChange={disableButton}
        />

        <button
          id="sign-up-btn"
          className="btn"
          onClick={handleSignUp}
          disabled={state.disabled}
        >
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
