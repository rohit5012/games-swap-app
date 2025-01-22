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
  } from "@/components/ui/dropdown-menu"
import { getPlatforms } from "@/rawgApi";
import { Link } from "react-router";

type Platform = "PS4" | "PS5" | "Xbox One" | "Xbox Series X/S" | "Switch";

const PlatformSelector: React.FC<{ onSelect: (platform: Platform) => void }> = ({ onSelect }) => {

  const platforms: { name: Platform; icon: React.ReactNode; hoverColor: string }[] = [
    {
      name: "PS4",
      icon: <FaPlaystation className="text-4xl text-blue-500" />,
      hoverColor: "hover:bg-blue-500 hover:text-white",
    },
    {
      name: "PS5",
      icon: <FaPlaystation className="text-4xl text-blue-600" />,
      hoverColor: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "Xbox One",
      icon: <FaXbox className="text-4xl text-green-500" />,
      hoverColor: "hover:bg-green-500 hover:text-white",
    },
    {
      name: "Xbox Series X/S",
      icon: <FaXbox className="text-4xl text-green-600" />,
      hoverColor: "hover:bg-green-600 hover:text-white",
    },
    {
      name: "Switch",
      icon: <BsNintendoSwitch className="text-4xl text-red-600" />,
      hoverColor: "hover:bg-red-600 hover:text-white",
    },
  ];

  const [gamePlatforms, setGamePlatforms] = useState([])
  useEffect(()=>{
    getPlatforms().then((res)=>{
        setGamePlatforms(res)
    })
  }, [])
  console.log(gamePlatforms)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6">Browse games by platform</h2>
      <div className="grid grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => onSelect(platform.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-300 transition ${platform.hoverColor}`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-3">
              {platform.icon}
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}


          <DropdownMenu>
  <DropdownMenuTrigger className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-300 transition `}>            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-3">
              
              </div>
              <span className="text-sm font-medium">all platforms</span></DropdownMenuTrigger>
  <DropdownMenuContent className="max-h-48 overflow-scroll">
  <DropdownMenuLabel>All platforms</DropdownMenuLabel>
  <DropdownMenuSeparator />
    {gamePlatforms?.map((console)=>{
        return <DropdownMenuLabel><Link to={`/browse-games`} key={console.name}>{console.name}</Link></DropdownMenuLabel>
    })}
    
  </DropdownMenuContent>
</DropdownMenu>
      </div>
    </div>
  );
};

export default PlatformSelector;
