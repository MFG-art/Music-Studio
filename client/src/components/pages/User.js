import React, { useState } from "react";
import axios from "axios";

function User() {
  return (
    <div className="box">
      <h2>
        You have <span className="emphasis">1</span> saved project(s)
      </h2>

      <ul></ul>

      <button className="clear-btn">delete</button>
    </div>
  );
}

export default User;
