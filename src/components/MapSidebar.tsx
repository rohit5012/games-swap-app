import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/4 min-h-screen bg-black-200 p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Sidebar</h2> */}
      <ul>
        <li className="mb-2">
          <a href="#" className="text-black-300">
            Game
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-black-300">
            Location
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-black-300">
            User Rating
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
