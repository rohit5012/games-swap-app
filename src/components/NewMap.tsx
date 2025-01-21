import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { Gamer } from "../types/Gamer";
import { MapDistanceCalculator } from "./MapDistanceCalculator";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const NewMap: React.FC = () => {
  const [users, setUsers] = useState<Gamer[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<Gamer[]>([]);
  const navigate = useNavigate();

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

  const fetchGamers = async () => {
    console.log("Fetching users...");
    try {
      const usersCollection = collection(db, "user details");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const distance = MapDistanceCalculator(
            userLocation!.lat,
            userLocation!.lng,
            data.latitude,
            data.longitude
          );
          if (data.latitude && data.longitude) {
            return { ...data, id: doc.id, distance };
          } else {
            console.warn(`Invalid coordinates for user: ${doc.id}`, data);
            return null;
          }
        })
        .filter((doc) => doc !== null);
      console.log("Valid users data:", usersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createCustomIcon = () => {
    return L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  };

  //   if (!userLocation) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <div className="w-full lg:w-1/6 p-4 bg-gradient-to-b from-gray-800 to-gray-600 text-white  h-screen">
        <div className="p-4">
          <ul>
            <li className="mt-4">
              <a
                href="#"
                onClick={fetchGamers}
                className="block py-2 px-4 bg-gray-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Gamers Near Me
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#"
                className="block py-2 px-4 bg-gray-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Locations
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#"
                className="block py-2 px-4 bg-gray-500 hover:bg-blue-600 text-white rounded-lg"
              >
                User Rating
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 h-full ">
        <div id="map" className="rounded-lg shadow-lg">
          <MapContainer
            center={userLocation || [51.509865, -0.118092]}
            zoom={12}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
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
                <Circle center={userLocation} radius={5000} color="blue" />
              </>
            )}
            {users.map((user, index) => (
              <Marker
                key={index}
                position={[user.latitude, user.longitude]}
                icon={createCustomIcon()}
                eventHandlers={{
                  click: () => {
                    setSelectedUser(user);
                  },
                }}
              >
                {selectedUser && selectedUser.id === user.id && (
                  <Popup
                    className="p-4 bg-blue-400 text-white rounded-lg flex flex-col"
                    position={[user.latitude, user.longitude]}
                    onClose={() => setSelectedUser(null)}
                  >
                    <div>
                      <div className="flex flex-col items-center ">
                        {user.avatarUrl && (
                          <img
                            src={user.avatarUrl}
                            alt={`${user.name} avatar`}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <h1 className="text-lg font-semibold truncate">
                          {user.nickname}
                        </h1>
                      </div>
                      <p className="text-red-300 text-lg">{user.location}</p>
                      <p>{user.platforms}</p>
                      <p>Distance: {user.distance} km</p>
                      <button
                        className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600"
                        onClick={() => navigate(`/users/${user.userId}`)}
                      >
                        View Profile
                      </button>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default NewMap;
