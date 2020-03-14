import React, { useEffect, useState } from "react";
import { Notation } from "react-abc";
import axios from "axios";
import { Score } from "react-vexflow";

console.log("Inside the js file!");

function setTempo(tempo) {
  let quarterNote = 60 / tempo;
  let sixteenthNote = quarterNote / 4;
  return sixteenthNote;
}

const notes = [
  0,
  261.63, // C4 1
  277.18,
  293.66, //D4  3
  311.13,
  329.63, // e4 5
  349.23, // f4 6
  369.99,
  392.0, // g4 8
  415.3,
  440.0, // a4 10
  466.16,
  493.88, //b4 12
  523.25 // C5 13
];

function Project() {
  const [project, setProject] = useState({
    name: "",
    notes: []
  });
  useEffect(() => {
    const projectId = window.location.pathname.split("/")[2];

    axios.get("/api/project/" + projectId).then(response => {
      // setProject(response.data);
      console.log("This is the project object", response.data);
      setProject({
        name: response.data.name,
        notes: response.data.notes,
        project_id: response.data._id,
        owner: response.data.owner
      });

      // todo: create an array of the selected values
    });
  }, project);

  function handleProjectSave(event) {
    event.preventDefault();
    console.log("Inside handleProjectSave()", project);
    var updatedNotesArray = [];
    for (var i = 0; i < project.notes.length; i++) {
      updatedNotesArray.push(document.getElementById(i.toString()).value);
    }
    console.log(updatedNotesArray);
    setProject({
      name: project.name,
      notes: updatedNotesArray,
      project_id: project.project_id,
      owner: project.owner
    });
    setTimeout(() => {
      console.log("This is what project looks like now", project);
    }, 1000);

    axios
      .put("/api/project/" + project.project_id, {
        name: project.name,
        notes: project.notes,
        owner: project.owner
      })
      .then(response => console.log(response));
  }

  function handleOnClick(event) {
    console.log("clicked button");
    console.log("This is project notes", project.notes);

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    var noteLength = setTempo(80);

    var updatedNotesArray = [];
    for (var i = 0; i < project.notes.length; i++) {
      updatedNotesArray.push(document.getElementById(i.toString()).value);
    }

    var noteArray = updatedNotesArray.map(note => {
      switch (note) {
        case "rest":
          return 0;
          break;
        case "C4":
          return 1;
          break;
        case "C#4":
          return 2;
          break;
        case "D4":
          return 3;
          break;
        case "D#4":
          return 4;
          break;
        case "E4":
          return 5;
          break;
        case "F4":
          return 6;
          break;
        case "F#4":
          return 7;
          break;
        case "G4":
          return 8;
          break;
        case "G#4":
          return 9;
          break;
        case "A4":
          return 10;
          break;
        case "A#4":
          return 11;
          break;
        case "B4":
          return 12;
          break;
        case "C5":
          return 13;
          break;
        default:
          return 0;
          break;
      }
    });

    console.log(noteArray);

    var time = audioContext.currentTime;

    function playMelody() {
      var loopCount = 0;
      for (var i = 0; i < noteArray.length; i++) {
        var loop = noteArray.length - 1 === i;
        time = playNote(audioContext, notes[noteArray[i]], loop);
        console.log(noteArray.length);
        console.log(loopCount);
        loopCount++;
      }
    }

    playMelody();
    function playNote(audioContext, note, loop) {
      var oscillator = audioContext.createOscillator();
      oscillator.type = "sawtooth";
      var lowPassFilter = audioContext.createBiquadFilter();
      lowPassFilter.type = "lowpass";
      lowPassFilter.frequency.setValueAtTime(4000, time);
      oscillator.connect(lowPassFilter);
      lowPassFilter.connect(audioContext.destination);

      oscillator.frequency.value = note;

      oscillator.start(time);

      lowPassFilter.frequency.linearRampToValueAtTime(
        500,
        time + noteLength / 2
      );
      lowPassFilter.frequency.linearRampToValueAtTime(50, time + noteLength);

      time += noteLength;
      oscillator.stop(time);

      return time;
    }
  }

  function handleNameChange(event) {
    console.log(event.target.value);
    setProject({
      name: event.target.value,
      notes: project.notes,
      owner: project.owner,
      project_id: project.project_id
    });
  }

  function handleOnChange(event) {
    console.log("Inside handleOnChange");
    console.log(event.target.id, event.target.value);
    var notes = project.notes;
    console.log(notes);
    notes[event.target.id] = event.target.value;
  }

  function getNotation() {
    console.log("Inside of getNotation()");
    console.log(project.notes);
    var notationString = "";
    project.notes.forEach(note => {
      console.log(note);
      switch (note) {
        case "rest":
          notationString += "z";
          break;
        case "C4":
          notationString += "C ";
          break;
        case "C#4":
          notationString += "C^ ";
          break;
        case "D4":
          notationString += "D ";
          break;
        case "D#4":
          notationString += "D^ ";
          break;
        case "E4":
          notationString += "E ";
          break;
        case "F4":
          notationString += "F ";
          break;
        case "F#4":
          notationString += "F^ ";
          break;
        case "G4":
          notationString += "G ";
          break;
        case "G#4":
          notationString += "G^ ";
          break;
        case "A4":
          notationString += "A ";
          break;
        case "A#4":
          notationString += "A^ ";
          break;
        case "B4":
          notationString += "B ";
          break;
        case "C5":
          notationString += "c ";
          break;
        default:
          notationString += "C ";
          break;
      }
    });
    notationString += "|";
    return notationString;
  }
  return (
    <div>
      <input
        id="project-name"
        defaultValue={project.name ? project.name : null}
        onChange={event => {
          handleNameChange(event);
        }}
      ></input>
      <button id="play-button" onClick={event => handleOnClick(event)}>
        Play
      </button>
      <button id="update-button" onClick={event => handleProjectSave(event)}>
        Save
      </button>
      <div
        style={{
          margin: "auto",
          marginTop: "10px",
          marginBottom: "10px",
          border: "1px solid grey",
          padding: "5px",
          overflow: "auto",
          width: "60%"
        }}
      >
        {project
          ? project.notes.map((note, index, array) => (
              <div className="note-select">
                <div>
                  <p>note: {index + 1}</p>
                  <select
                    id={index}
                    defaultValue={note}
                    key={index}
                    onChange={event => {
                      handleOnChange(event);
                    }}
                  >
                    <option value="rest">--</option>
                    <option value="C4">C4</option>
                    <option value="C#4">C#4</option>
                    <option value="D4">D4</option>
                    <option value="D#4">D#4</option>
                    <option value="E4">E4</option>
                    <option value="F4">F4</option>
                    <option value="F#4">F#4</option>
                    <option value="G4">G4</option>
                    <option value="G#4">G#4</option>
                    <option value="A4">A4</option>
                    <option value="A#4">A#4</option>
                    <option value="B4">B4</option>
                    <option value="C5">C5</option>
                  </select>
                </div>
              </div>
            ))
          : null}
      </div>
      <hr />
      {project.notes[0] && <Notation notation={getNotation()} />}

      <a href={"/user/" + sessionStorage.getItem("username")}>
        Go back to your projects page
      </a>
    </div>
  );
}

export default Project;
