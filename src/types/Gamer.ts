export interface Gamer {
  id: number;
  name: string;
  location: Location;
  area: string;
  distance?: number;
  userRating: string;
}

export interface Location {
  lat: number;
  lng: number;
}
