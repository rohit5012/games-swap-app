import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/4 bg-black-200 p-4">
      <ul>
        <li className="mb-2">
          <a href="#" className="text-black-300">Game</a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-black-300">Location</a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-black-300">User Rating</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
