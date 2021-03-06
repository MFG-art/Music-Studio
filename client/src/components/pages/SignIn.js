import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function handleSignIn() {
  console.log("I've been clicked!");
  var loginInfo = {
    username: document.getElementById("username-input").value,
    password: document.getElementById("password-input").value,
  };
  console.log(loginInfo);
  axios
    .get("api/users")
    .then(function (response) {
      console.log(response.data);
      console.log(response.data[0]._id);

      var usersArray = response.data;
      var match = false;
      var loggedInUser;
      for (var i = 0; i < usersArray.length; i++) {
        if (
          usersArray[i].username === loginInfo.username &&
          usersArray[i].password === loginInfo.password
        ) {
          match = true;
          console.log(match);
          loggedInUser = usersArray[i].username;
          sessionStorage.setItem("username", loggedInUser);
          sessionStorage.setItem("user-id", response.data[i]._id);
        }
      }
      console.log("Done with for loop. match = " + match);
      if (match) {
        console.log("Welcome,  " + loggedInUser);
        var newUrl = "/user/" + loggedInUser;
        window.location = newUrl;
      } else {
        alert("Invalid login info");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function SignIn() {
  return (
    <div>
      <Header />
      <div className="box" style={{ margin: "100px auto" }}>
        <h1>Sign in</h1>
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

        <button id="sign-in-btn" className="btn" onClick={handleSignIn}>
          Log In
        </button>

        <a href="/sign-up">
          <div id="sign-up-btn">Sign Up</div>
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
