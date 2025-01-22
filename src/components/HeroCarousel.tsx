// Install dependencies:
// npm install react-player

import React from "react";
import ReactPlayer from "react-player";
import videoUrl from "../assets/fish video.mp4";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Action Game</h1>
      <div className="relative pt-[56.25%] w-full max-w-lg">
        <ReactPlayer
          url={videoUrl}
          controls
          playing={true}
          muted={true}
          controls={false}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default App;
