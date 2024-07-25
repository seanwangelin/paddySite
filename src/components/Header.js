import { React, useState, useEffect } from "react";

import "../style/Header.css";

export default function HomePage() {
  return (
    <div id="headerContainer">
      <div id="headerLayout">
        <h1>Site Name</h1>
        <div id="headerButtons">
          <button>About</button>
          <button>Home</button>
          <button>Filter</button>
        </div>
      </div>
    </div>
  );
}
