import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { handleTabClick, haversineDistance } from "./MapSidebar";
import { Location, Gamer } from "../types/Gamer";

const sampleGamerData: Gamer[] = [
  {
    id: 1,
    name: "Rohit",
    area: "Central London",
    location: { lat: 51.509865, lng: -0.118092 },
    userRating: "⭐️⭐️",
  },
  {
    id: 2,
    name: "Nadim",
    area: "Soho",
    location: { lat: 51.512344, lng: -0.124981 },
    userRating: "⭐️⭐️⭐️⭐️",
  },
  {
    id: 3,
    name: "Lillia",
    area: "Greenwich",
    location: { lat: 51.5037, lng: 0.1117 },
    userRating: "⭐️⭐️⭐️",
  },
  {
    id: 4,
    name: "Javier",
    area: "Canary Wharf",
    location: { lat: 51.5176, lng: 0.1145 },
    userRating: "⭐️⭐️⭐️⭐️",
  },
  {
    id: 5,
    name: "Luke",
    area: "Westminster",
    location: { lat: 51.4975, lng: 0.1357 },
    userRating: "⭐️⭐️⭐️",
  },
  {
    id: 6,
    name: "Alex",
    area: "Kensington",
    location: { lat: 51.4991, lng: 0.1644 },
    userRating: "⭐️⭐️⭐️⭐️",
  },
];

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | undefined>(
    undefined
  );
  const [nearbyGamers, setNearbyGamers] = useState<Gamer[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  // useEffect(() => {
  //   if (userLocation) {
  //     const gamersWithDistance = sampleGamerData.map((gamer) => ({
  //       ...gamer,
  //       distance: haversineDistance(userLocation, gamer.location),
  //     }));
  //     setNearbyGamers(gamersWithDistance);
  //   }
  // }, [userLocation]);

  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gradient-to-b from-gray-800 to-gray-600 text-white h-screen shadow-lg">
        <div className="p-4">
          <ul>
            <li className="mt-4">
              <a
                href="#"
                onClick={() =>
                  handleTabClick(userLocation, sampleGamerData, setNearbyGamers)
                }
                className="block py-2 px-4 bg-gray-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Gamers Near Me
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#"
                // onClick={() =>
                //   handleTabClick(
                //     2,
                //     userLocation,
                //     sampleGamerData,
                //     setNearbyGamers,
                //     setSelectedTab
                //   )
                // }
                className="block py-2 px-4 bg-gray-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Locations
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#"
                // onClick={() =>
                //   handleTabClick(
                //     3,
                //     userLocation,
                //     sampleGamerData,
                //     setNearbyGamers,
                //     setSelectedTab
                //   )
                // }
                className="block py-2 px-4 bg-gray-500 hover:bg-blue-600 text-white rounded-lg"
              >
                User Rating
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* MAP */}
      <div className="w-full">
        <div id="map" className="rounded-lg shadow-lg">
          <MapContainer
            center={userLocation || [51.509865, -0.118092]}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userLocation && (
              <>
                <Marker position={userLocation} title="Your Location">
                  <Popup>
                    <div>
                      <h5>Your Location</h5>
                    </div>
                  </Popup>
                </Marker>
                <Circle center={userLocation} radius={1000} color="blue" />
              </>
            )}
            {nearbyGamers.map((gamer) => (
              <Marker key={gamer.id} position={gamer.location}>
                <Popup className="p-4 bg-blue-400 text-white rounded-lg">
                  <div>
                    <h2>{gamer.name}</h2>
                    <p className="text-red-300 text-lg">{gamer.area}</p>
                    <p>Distance: {gamer.distance?.toFixed(2)} km</p>
                    <p>User Rating: {gamer.userRating}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
