import React, { useEffect, useState } from "react";
import MapSidebar from "../components/MapSidebar";
import MapComponent from "../components/Map"; 
import { fetchUsersWithLocation } from "@/services/fetchUsersWithLocation";  

const MapPage: React.FC = () => {
  const [userLocations, setUserLocations] = useState<string[]>([]);

  useEffect(() => {
    const loadUserLocations = async () => {
      const usersWithLocation = await fetchUsersWithLocation();
      const locations = usersWithLocation.map((user) => user.location);  
      setUserLocations(locations);
    };

    loadUserLocations();
  }, []);

  return (
    <div className="flex">
      <MapSidebar />
      <MapComponent postcode={userLocations} />
    </div>
  );
};

export default MapPage;
