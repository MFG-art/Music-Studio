import React from "react";

console.log("Inside the js file!");

function setTempo(tempo) {
  let quarterNote = 60 / tempo;
  let sixteenthNote = quarterNote / 4;
  return sixteenthNote;
}

const notes = [
  false,
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

function handleOnClick() {
  console.log("clicked button");
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var time = audioContext.currentTime;
  var noteLength = setTempo(100);

  var noteArray = [1, 3, 5, 6, 8, 8, 1, 2, 2];

  function playMelody() {
    var loopCount = 0;
    for (var i = 0; i < noteArray.length; i++) {
      var loop = noteArray.length - 1 === i;
      playNote(audioContext, notes[noteArray[i]], loop);
      console.log(noteArray.length);
      console.log(loopCount);
      loopCount++;
    }
  }

  playMelody();
  function playNote(audioContext, note, loop) {
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.connect(audioContext.destination);
    oscillator.frequency.value = note;

    oscillator.start(time);
    time += noteLength;
    oscillator.stop(time);

    return time;
  }
}

function Project() {
  return (
    <div>
      <button id="play-button" onClick={() => handleOnClick()}>
        Play
      </button>
    </div>
  );
}

export default Project;
