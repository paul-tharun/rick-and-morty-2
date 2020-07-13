import React from "react";
import "./styles.css";
import EpisodesList from "./components/episodesList";

//import EpisodesList2 from "./components/episodesList2";

export default function App() {
  return (
    <div className="App">
      <img
        className="logo d-block mx-auto"
        src="../assets/logo.png"
        alt="Rick and Morty"
      />
      <EpisodesList />

      {/* <EpisodesList2 /> */}
    </div>
  );
}
