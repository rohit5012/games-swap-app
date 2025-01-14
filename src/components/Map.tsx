import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import axios from "axios";
import { MapComponentProps } from "../mapAPI";

const MapComponent: React.FC<MapComponentProps> = ({ postcode }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${postcode}&key=${apiKey}`
        );
        const data = response.data;
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setPosition([lat, lng]);
        } else {
          console.error("No results found for the given postcode");
        }
      } catch (error) {
        console.error("Error fetching geocode data:", error);
      }
    };
    fetchGeocode();
  }, [postcode, apiKey]);

  return position ? (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{postcode}</Popup>
      </Marker>
      <Circle center={position} radius={5000} color="blue"></Circle>
    </MapContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
