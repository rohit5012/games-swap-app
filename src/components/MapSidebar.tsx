import React from "react";
import { Gamer, Location } from "../types/Gamer";

export const haversineDistance = (coords1: Location, coords2: Location) => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

export const handleTabClick = (
  userLocation: Location | undefined,
  sampleGamerData: Gamer[],
  setNearbyGamers: React.Dispatch<React.SetStateAction<Gamer[]>>
) => {
  let updatedGamers: Gamer[] = [];

  updatedGamers = sampleGamerData;

  if (userLocation) {
    updatedGamers = updatedGamers.map((gamer) => ({
      ...gamer,
      distance: haversineDistance(userLocation, gamer.location),
    }));
  }

  setNearbyGamers(updatedGamers);
};
