export const MapDistanceCalculator = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const R = 6371;
  // MapDistance
  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
};
