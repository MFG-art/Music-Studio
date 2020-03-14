import React, { useState, useEffect } from "react";
import axios from "axios";

const username = window.location.pathname.split("/")[2];

function User() {
  const [projects, setProjects] = useState({ array: [] });

  useEffect(() => {
    axios.get("/api/projects").then(response => {
      // setProject(response.data);
      console.log("This is the projects object", response.data);
      setProjects({
        array: response.data
      });

      // todo: create an array of the selected values
    });
  }, projects);

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
    }).then(
      axios.get("/api/projects").then(response => {
        // setProject(response.data);
        console.log("This is the projects object", response.data);
        setProjects({
          array: response.data
        });

        // todo: create an array of the selected values
      })
    );
    const json = await res.json();

    return json;
  }

  return (
    <div>
      <div className="main">
        <h1>Welcome, {username}</h1>
        <hr />
        <h2>Your projects</h2>
        <button
          onClick={() => {
            createNewProject();
          }}
        >
          Create a new project
        </button>

        {projects.array.map(project => {
          return (
            <div
              style={{
                margin: "auto",
                marginTop: "10px",
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "5px",
                overflow: "auto",
                width: "20%",
                backgroundColor: "lightGrey"
              }}
            >
              <p style={{ fontSize: "20px" }}>{project.name}</p>
              <button>
                <a href={"/project/" + project._id}>Open project</a>
              </button>
            </div>
          );
        })}
        <div id="projectsList"></div>
      </div>
    </div>
  );
}

export default User;
