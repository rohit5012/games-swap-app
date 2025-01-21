import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { fetchUsersWithLocation } from "@/services/fetchUsersWithLocation";
import { fetchGeocode } from "@/services/geocodeCoordinates";
import { UserDetailsType } from "@/types/UserDetails";

const MapComponent: React.FC = () => {
  const [users, setUsers] = useState<UserDetailsType[]>([]);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetailsType | null>(
    null
  );

  useEffect(() => {
    fetchUsersWithLocation()
      .then(async (usersData) => {
        console.log(usersData);
        for (const user of usersData) {
          if (!user.latitude || !user.longitude) {
            const coords = await fetchGeocode(user.location);
            if (coords) {
              user.latitude = coords.lat;
              user.longitude = coords.lng;
            }
          }
        }

        setUsers(usersData);
        if (usersData.length > 0) {
          setPosition([usersData[0].latitude, usersData[0].longitude]);
          setSelectedUser(usersData[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={position || [51.505, -0.09]}
      zoom={13}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {users.map((user) =>
        user.latitude && user.longitude ? (
          <Marker key={user.id} position={[user.latitude, user.longitude]}>
            <Popup>{user.nickname}</Popup>
          </Marker>
        ) : (
          <div key={user.id}>Invalid coordinates for {user.nickname}</div>
        )
      )}

      {selectedUser && selectedUser.latitude && selectedUser.longitude && (
        <Circle
          center={[selectedUser.latitude, selectedUser.longitude]}
          radius={5000}
          color="blue"
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
