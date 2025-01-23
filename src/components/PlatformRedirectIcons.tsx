import React, { useEffect, useState } from "react";
import { FaXbox, FaPlaystation } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPlatforms } from "@/rawgApi";
import { Link } from "react-router";

type Platform = "PS4" | "PS5" | "Xbox One" | "Xbox Series X/S" | "Switch";

const PlatformSelector: React.FC<{
  onSelect: (platform: Platform) => void;
}> = ({ onSelect }) => {
  const platforms: {
    name: Platform;
    icon: React.ReactNode;
    hoverColor: string;
  }[] = [
    {
      name: "PS4",
      icon: <FaPlaystation className="text-4xl text-blue-500" />,
      hoverColor: "hover:bg-blue-500 hover:text-white",
      id: "187",
    },
    {
      name: "PS5",
      icon: <FaPlaystation className="text-4xl text-blue-600" />,
      hoverColor: "hover:bg-blue-600 hover:text-white",
      id: "18",
    },
    {
      name: "Xbox One",
      icon: <FaXbox className="text-4xl text-green-500" />,
      hoverColor: "hover:bg-green-500 hover:text-white",
      id: "1",
    },
    {
      name: "Xbox Series X/S",
      icon: <FaXbox className="text-4xl text-green-600" />,
      hoverColor: "hover:bg-green-600 hover:text-white",
      id: "186",
    },
    {
      name: "Switch",
      icon: <BsNintendoSwitch className="text-4xl text-red-600" />,
      hoverColor: "hover:bg-red-600 hover:text-white",
      id: "7",
    },
  ];

  const [gamePlatforms, setGamePlatforms] = useState([]);
  useEffect(() => {
    getPlatforms().then((res) => {
      setGamePlatforms(res);
    });
  }, []);
 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6">
        Browse games by platform
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <Link
            to={`/browse-games?platform=${platform.id}`} // Link with dynamic platform name
            key={platform.id}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-300 transition ${platform.hoverColor}`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-3">
              {platform.icon}
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-300 transition `}
          >
            {" "}
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-3"></div>
            <span className="text-sm font-medium">all platforms</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-48 overflow-scroll">
            <DropdownMenuLabel>All platforms</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {gamePlatforms?.map((console) => {
              return (
                <DropdownMenuLabel key={console.id}>
                  <Link to={`/browse-games?platform=${console.id}`}>
                    {console.name}
                  </Link>
                </DropdownMenuLabel>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PlatformSelector;
