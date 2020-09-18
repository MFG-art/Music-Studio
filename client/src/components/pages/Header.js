import React from "react";

function Header() {
  return (
    <div
      style={{
        backgroundColor: "blue",
        margin: "0",
        padding: "20px",
      }}
    >
      <p style={{ color: "white", margin: "0", fontSize: "50px" }}>NoteJam</p>
      <p style={{ color: "lightGray", margin: "0" }}>
        An online synthesizer and sequencer
      </p>
    </div>
  );
}

export default Header;
