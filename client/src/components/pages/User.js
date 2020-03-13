import React, { useState } from "react";
import axios from "axios";
var projectsList;

function getProjects() {
  axios.get("/api/projects").then(response => {
    console.log(response.data);
    projectsList = response.data.map(project => {
      if (project.owner === sessionStorage.getItem("user-id")) {
        return project;
      }
    });
    console.log("This is what projectlist looks like", projectsList);

    document.getElementById("projectsList").innerHTML = "";

    if (projectsList.length > 0) {
      projectsList.forEach(project => {
        var projectDiv = document.createElement("div");
        projectDiv.setAttribute("id", project.name);
        // name element
        var projectNameEl = document.createElement("p");
        projectNameEl.setAttribute("className", "project-name");
        projectNameEl.innerHTML = project.name;
        // Link element
        var projectLink = document.createElement("a");
        projectLink.setAttribute("href", "/project/" + project._id);
        projectLink.innerText = "Project Link";
        // Appending elements
        projectDiv.appendChild(projectNameEl);
        projectDiv.appendChild(projectLink);
        document.getElementById("projectsList").appendChild(projectDiv);
      });
    } else {
      document.getElementById("projectsList").innerHTML =
        "<p>You have no existing projects. Create a new one to begin</p>";
    }
  });
}

async function createNewProject() {
  const data = {
    name: "Untitled",
    notes: [
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest",
      "rest"
    ],
    owner: sessionStorage.getItem("user-id")
  };
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  alert("Created new project. Click on 'load projcts' to see it");

  return json;
}

const username = window.location.pathname.split("/")[2];
function User() {
  const [projects, setProjects] = useState({ array: [] });
  return (
    <div>
      <div className="main">
        <h1>Welcome, {username}</h1>
        <hr />
        <h2>Your projects:</h2>
        <button
          onClick={() => {
            createNewProject();
          }}
        >
          Create a new project
        </button>

        <button
          onClick={() => {
            getProjects();
          }}
        >
          Load Projects
        </button>
        <div id="projectsList"></div>
      </div>
    </div>
  );
}

export default User;
